const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { paginationEmbed } = require("../../../../local_dependencies/functions.js");
const MFA = require("mangadex-full-api");
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("mdread", {
			categories: "manga",
			aliases: ["rc", "mangaread", "readchapter"],
			info: "**This command is only available in a certain guild**\nRead manga from [mangadex](https://mangadex.org/) by inputting chapter to read and the manga name. \n\n**Notes:** There might be offset of data and if you want faster reading/loading you can add [RAW] to the arguments, this will make the bot sends the image without embed.\n\nCommand possible by using [mangadex-full-api](https://www.npmjs.com/package/mangadex-full-api) which created an easy way to use [Mangadex API](https://api.mangadex.org/docs.html)",
			usage: `${prefix}command/alias <chapter (number)> <mangaName> [[RAW]]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		// check guild, only allow if in 640790707082231834 or 651015913080094721
		if (message.guild.id !== "640790707082231834" && message.guild.id !== "651015913080094721") return message.channel.send("This command is only available in a certain server!");

		if (args.length < 2) return message.channel.send(`Please input a correct manga name and chapter to read`);

		// verify that the chapter is a number
		if (isNaN(args[0]) || parseInt(args[0]) < 1) return message.channel.send(notACorrectNumber());

		var chapterNum = args[0];
		var q = args.slice(1).join(" ");

		// regex for word that contains [RAW]
		const rawRegex = /\[RAW\]/gi;
		var raw = false;
		// check
		if (rawRegex.test(q)) {
			raw = true;
			q = q.replace(rawRegex, "");
		}

		const msg = await message.channel.send(`Searching for \`${q}\` please wait...`);

		MFA.login(process.env.Mangadex_Username, process.env.Mangadex_Password)
			.then(async () => {
				// Get a manga:
				let manga = await MFA.Manga.getByQuery(q);

				// if manga is not found, return
				if (!manga) {
					msg.delete();
					return message.channel.send(noMangaFound(q));
				}

				msg.edit(`Found manga titled: \`${manga.title}\`\n\nRetrieving chapter ${chapterNum} **please wait...**`);

				// manga info
				var id = manga.id,
					originLang = manga.originalLanguage,
					title = manga.title,
					cover = (await manga.mainCover.resolve()).imageSource,
					artist = (await MFA.resolveArray(manga.artists)).map((artist) => artist.name).join(", "),
					author = (await MFA.resolveArray(manga.authors)).map((author) => author.name).join(", "),
					link = `https://mangadex.org/title/${id}`;

				// Get the manga's chapters:
				let chapters = await manga.getFeed({ translatedLanguage: ["en"], order: { chapter: "asc" } }, true);

				// check is there any chapter or not
				if (chapters.length == 0) return message.channel.send(noChapterFound(q));

				// verify that search chapter is not out of bound
				if (chapterNum > chapters.length) {
					msg.delete();
					return message.channel.send(chapterOutOfBound(chapterNum, chapters.length));
				}

				// Get the chapter's pages:
				let chapter = chapters[chapterNum - 1];
				let pages = await chapter.getReadablePages();

				msg.edit(`Found manga titled: \`${manga.title}\`\n\nRetrieving ${pages.length} pages from chapter ${chapterNum} **please wait...**`);

				// Get uploader and grup names
				let uploader = await chapter.uploader.resolve();
				let groupNames = (await MFA.resolveArray(chapter.groups)).map((elem) => elem.name).join(", ");

				var embedChaptersReader = [];

				if (!raw) {
					for (var i = 0; i < pages.length; i++) {
						// console.log(pages[i]);
						embedChaptersReader[i] = new MessageEmbed()
							.setColor("#e6613e")
							.setAuthor(
								`${title} - Chapter ${chapter.chapter} | ${originLang} - en`,
								`https://media.discordapp.net/attachments/799595012005822484/936142797994590288/xbt_jW78_400x400.png`,
								`https://mangadex.org/chapter/${chapter.id}/${i + 1}`
							)
							.setImage(pages[i])
							.setThumbnail(cover)
							.setDescription(`[Click to look at the manga page on Mangadex](${link})\m**Manga Information**`)
							.addField("Artist", artist, true)
							.addField("Author", author, true)
							.addField(`Chapter`, `${chapter.chapter} ${chapter.title ? `- ${chapter.title}` : ``}`, true)
							.addField(`Uploaded At (GMT+7)`, Moment(chapter.publishAt).tz("Asia/Jakarta").format("DD-MM-YY (HH:MM:SS)"), true)
							.addField(`Raw`, `[Click here](${pages[i]})`, true)
							.addField(
								`Search on`,
								// prettier-ignore
								`[MAL](https://myanimelist.net/manga.php?q=${title.replace(/ /g, "%20")}&cat=manga) | [MangaNato](https://manganato.com/search/story/${title.replace(/ /g, "_")}) | [MangaKakalot](https://mangakakalot.com/search/story/${title.replace(/ /g, "_")})`,
								true
							)
							.setFooter(`Page ${i + 1}/${pages.length} | Uploaded by ${uploader.username} | Scanlated by ${groupNames} | Via Mangadex.org`);
					}

					// delete message
					msg.edit(`**Loading finished!**`);
					msg.delete({ timeout: 5000 });

					// check offset
					if (chapterNum !== chapter.chapter) {
						// send message telling offset
						message.channel.send(`**Offset detected!** There seems to be an offset of ${chapterNum - chapter.chapter} chapter(s), between the searched chapter and the result received from the API.`);
					}

					// send embed
					paginationEmbed(message, embedChaptersReader, false, 1500000, true); // 25 minutes
				} else {
					// delete message
					msg.edit(`**Loading finished!**`);

					// check offset
					if (chapterNum !== chapter.chapter) {
						// send message telling offset
						message.channel.send(`**Offset detected!** There seems to be an offset of ${chapterNum - chapter.chapter} chapter(s), between the searched chapter and the result received from the API.`);
					}

					let embed = new MessageEmbed()
						.setColor("#e6613e")
						.setAuthor(
							`${title} - Chapter ${chapter.chapter} | ${originLang} - en`,
							`https://media.discordapp.net/attachments/799595012005822484/936142797994590288/xbt_jW78_400x400.png`,
							`https://mangadex.org/chapter/${chapter.id}/`
						)
						.setThumbnail(cover)
						.setDescription(`[Click to look at the manga page on Mangadex](${link})\n**Manga Information**`)
						.addField("Artist", artist, true)
						.addField("Author", author, true)
						.addField(`Chapter`, `${chapter.chapter} ${chapter.title ? `- ${chapter.title}` : ``}`, true)
						.addField(`Total Pages`, pages.length, true)
						.addField(`Uploaded At (GMT+7)`, Moment(chapter.publishAt).tz("Asia/Jakarta").format("DD-MM-YY (HH:MM:SS)"), true)
						.addField(
							`Search on`,
							// prettier-ignore
							`[MAL](https://myanimelist.net/manga.php?q=${title.replace(/ /g, "%20")}&cat=manga) | [MangaNato](https://manganato.com/search/story/${title.replace(/ /g, "_")}) | [MangaKakalot](https://mangakakalot.com/search/story/${title.replace(/ /g, "_")})`,
							true
						)
						.setFooter(`RAW Mode | Uploaded by ${uploader.username} | Scanlated by ${groupNames} | Via Mangadex.org`);

					message.channel.send(embed);

					// send raw
					for (var i = 0; i < pages.length; i++) {
						message.channel.send(pages[i]);
					}

					// embed go to top
					const embedGoToTop = new MessageEmbed().setColor("#e6613e").setDescription(`[Click Here To Go To Top](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${msg.id})`);

					message.channel.send(embedGoToTop);
				}
			})
			.catch((err) => {
				// check if error contains no results
				if (err.toString().includes("no results")) return message.channel.send(noMangaFound(q));

				console.log(err);
				message.channel.send(err);
			});
	}
};

function noMangaFound(q) {
	let embed = new MessageEmbed()
		.setTitle("No Manga Found!")
		.setDescription(`There is no result found for \`${q}\``)
		.addField("Suggestion", "Check if the manga exist or not on mangadex. If it exist but still doesn't work, then there might be a problem with the bot or the API.");
	return embed;
}

function noChapterFound(q) {
	let embed = new MessageEmbed()
		.setTitle("No Chapter Found!")
		.setDescription(`There is no result found for \`${q}\``)
		.addField("Suggestion", "Check for available english chapter directly at mangadex. If it exist but still doesn't work, then there might be a problem with the bot or the API.");
	return embed;
}

function chapterOutOfBound(chapterNum, maxChapter) {
	let embed = new MessageEmbed()
		.setTitle("Chapter Out of Bound!")
		.setDescription(`The chapter number \`${chapterNum}\` is out of bound. The maximum chapter is \`${maxChapter}\``)
		.addField("Suggestion", "Check for available chapter directly at mangadex. If it exist but still doesn't work, then there might be a problem with the bot or the API.");
	return embed;
}

function notACorrectNumber() {
	let embed = new MessageEmbed().setTitle("Invalid Chapter inputted!").setDescription(`Chapter must be a positive integer number`);
	return embed;
}
