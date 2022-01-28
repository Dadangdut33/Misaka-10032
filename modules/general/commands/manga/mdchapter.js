const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { paginationEmbed } = require("../../../../local_dependencies/functions.js");
const MFA = require("mangadex-full-api");
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("mdchapter", {
			categories: "manga",
			aliases: ["mdch", "chlist", "listchapter"],
			info: "**This command is only available in a certain guild**\nGet a manga chapter list from [mangadex](https://mangadex.org/) by inputting the manga name. \n\n**Notes:** Use this if there is an offset in the manga so that you can input the correct chapter to read.\n\nCommand possible by using [mangadex-full-api](https://www.npmjs.com/package/mangadex-full-api) which created an easy way to use [Mangadex API](https://api.mangadex.org/docs.html)",
			usage: `${prefix}command/alias <mangaName>`,
			guildOnly: true,
		});
	}
	async run(message, args) {
		// check guild, only allow if in 640790707082231834 or 651015913080094721
		if (message.guild.id !== "640790707082231834" && message.guild.id !== "651015913080094721") return message.channel.send("This command is only available in a certain server!");

		if (!args) return message.channel.send(invalidArgs());

		var q = args.join(" ");

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

				msg.edit(`Found manga titled: \`${manga.title}\`\n\nRetrieving chapter lists **please wait...**`);

				// manga info
				var id = manga.id,
					originLang = manga.originalLanguage,
					title = manga.title,
					cover = (await manga.mainCover.resolve()).imageSource,
					artist = (await MFA.resolveArray(manga.artists)).map((artist) => artist.name).join(", "),
					author = (await MFA.resolveArray(manga.authors)).map((author) => author.name).join(", "),
					volume = manga.lastVolume,
					chapterTotal = manga.lastChapter,
					lastUpdate = Moment(manga.lastUpdate).tz("Asia/Jakarta").format("DD-MM-YY (HH:MM:SS)"),
					link = `https://mangadex.org/title/${id}`;

				// Get the manga's chapters:
				let chapters = await manga.getFeed({ translatedLanguage: ["en"], order: { chapter: "asc" } }, true);

				// check is there any chapter or not
				if (chapters.length == 0) return message.channel.send(noChapterFound(q));

				// get how many loop, limit chapters shown to 30 per embed
				let loop = Math.ceil(chapters.length / 30);

				var embedChapterLists = [];

				chapterTotal = chapterTotal ? chapterTotal : chapters[chapters.length - 1].chapter;
				volume = volume ? volume : chapters[chapters.length - 1].volume;

				for (var i = 0; i < loop; i++) {
					embedChapterLists[i] = new MessageEmbed()
						.setColor("#e6613e")
						.setAuthor(
							`${title} - ${chapterTotal} Chapter ${volume ? `(${volume} Volume)` : ``} | ${originLang} - en`,
							`https://media.discordapp.net/attachments/799595012005822484/936142797994590288/xbt_jW78_400x400.png`,
							link
						)
						.setThumbnail(cover)
						.setDescription(
							chapters
								.map((chapter, index) => `**${index + 1}**. Ch ${chapter.chapter} ${chapter.title ? `- ${chapter.title}` : ``}`)
								.slice(i * 30, (i + 1) * 30)
								.join("\n")
						)
						.addField("Artist", artist, true)
						.addField("Author", author, true)
						.addField(`Last update`, lastUpdate, true)
						.addField(
							`Link`,
							// prettier-ignore
							`[Mangadex](${link}) | [MAL](https://myanimelist.net/manga.php?q=${title.replace(/ /g, "%20")}&cat=manga) | [MangaNato](https://manganato.com/search/story/${title.replace(/ /g, "_")}) | [MangaKakalot](https://mangakakalot.com/search/story/${title.replace(/ /g, "_")})`,
							true
						)
						.setFooter(`Page ${i + 1}/${loop} | Via Mangadex.org | Use the bold number for input to read the chapter`);
				}

				// delete message
				msg.edit(`**Loading finished!**`);
				msg.delete({ timeout: 5000 });

				// send embed
				paginationEmbed(message, embedChapterLists, false, 1500000, true); // 25 minutes
			})
			.catch((err) => {
				// check if error contains no results
				if (err.toString().includes("no results")) return message.channel.send(noMangaFound(q));

				console.log(err);
				message.channel.send(err);
			});

		function invalidArgs() {
			let embed = new MessageEmbed().setTitle(`Error! Please input a correct manga name!`).setDescription(`\`**Command usage:**\n${this.usage}\``);
			return embed;
		}

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
	}
};
