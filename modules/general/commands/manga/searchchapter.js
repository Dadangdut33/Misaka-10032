const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { promptMessage, paginationEmbed } = require("../../../../local_dependencies/functions.js");
const chooseArr = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("searchchapter", {
			categories: "manga",
			aliases: ["searchid", "search", "mangaid"],
			info: "Search a manga and get the manga chapters id to read using `readchapter` commands.\n\nCommand possible by using [Mangadex API](https://mangadex.org/thread/351011) & [Mangadex API NPM](https://www.npmjs.com/package/mangadex-api)",
			usage: `${prefix}command/alias <title>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		return message.channel.send("Disabled for the time being");

		if (!args[0]) {
			return message.channel.send(info());
		} else {
			const msg = await message.channel.send(`Searching for \`${args.join(" ")}\` please wait...`);
			await client.agent.login(process.env.Mangadex_Username, process.env.Mangadex_Password, false); // Authentication
			const result = await client.search(args.join(" ")); // Search

			// If no results
			if (result.titles.length == 0) {
				msg.delete();
				return message.channel.send(noMangaFound());
			}

			// If result exists
			msg.edit(`**Manga Found!**`);

			// Limit the options
			var limit;
			var search_Length = result.titles.length;
			limit = search_Length;
			if (search_Length > 9) {
				limit = 9;
			}

			// Put the options to display
			var options = [];
			for (var i = 0; i < limit; i++) {
				options.push(`${chooseArr[i]} [${result.titles[i].title}](https://mangadex.org/title/${result.titles[i].id})`);
			}

			// The options embed
			let embedToChoose = new MessageEmbed()
				.setAuthor("Mangadex", "https://media.discordapp.net/attachments/799595012005822484/822657390075445248/default_brand.png", "https://mangadex.org/")
				.setColor("F7931E")
				.setDescription(options.join("\n"));

			const optionsToChoose = await message.channel.send(embedToChoose); // Await the embed
			const reacted = await promptMessage(optionsToChoose, message.author, 50, chooseArr); // Await reaction
			const reaction = await getResult(reacted); // Get Result from reaction
			await optionsToChoose.reactions.removeAll();

			if (reaction == undefined) {
				// If no reaction after timeout
				msg.delete();
				embedToChoose
					.setAuthor("Search aborted!")
					.setTitle("")
					.setDescription(`Search for **${args.join(" ")}** aborted because of no reaction from ${message.author}!`);

				optionsToChoose.edit(embedToChoose);
				return;
			}

			if (reaction + 1 > limit) {
				// +1 because the original is from 0 to access the array
				msg.delete();
				embedToChoose.setAuthor("Invalid options chosen!").setDescription("Please choose the correct available options!");

				optionsToChoose.edit(embedToChoose);
				return message.channel.send(`Invalid options chosen! Please choose the correct available options!`);
			}
			// Get the manga chapters
			const theMangaChapter = client.manga.getMangaChapters(result.titles[reaction].id);
			// Get the length
			var chap_Length = (await theMangaChapter).chapters.length;
			// latest chapter * 1000 to convert from unix to ms
			var latestChapterUploadedOn = Moment((await theMangaChapter).chapters[0].timestamp * 1000).format("dddd, DD MMMM YYYY");

			// Push the info to chapterArray
			var chaptersArray = [];
			for (var i = 0; i < chap_Length - 1; i++) {
				if ((await theMangaChapter).chapters[i].language == "gb") {
					// language en -> gb
					msg.edit(`Getting chapter \`${(await theMangaChapter).chapters[i].chapter}\` please wait...`);
					chaptersArray.push(`Ch. ${(await theMangaChapter).chapters[i].chapter} id : ${(await theMangaChapter).chapters[i].id} (${(await theMangaChapter).chapters[i].title})`); // Get all id
				}
			}

			var pages = [];
			if (chaptersArray.length < 100) {
				let page1 = new MessageEmbed()
					.setAuthor(
						`Showing a total of ${chap_Length} ${result.titles[reaction].title} chapter`,
						`https://media.discordapp.net/attachments/799595012005822484/822657390075445248/default_brand.png`,
						`https://mangadex.org/title/${result.titles[reaction].id}`
					)
					.setThumbnail(`${result.titles[reaction].image_url}`)
					.setColor("F7931E")
					.setDescription(chaptersArray.slice(0, 100).join("\n"))
					.addField(`Total Views${result.titles[reaction].views}`)
					.addField("Last chapter on", `${latestChapterUploadedOn} GMT+7`);

				pages.push(page1);
			}

			if (chaptersArray.length > 100 && chaptersArray.length < 200) {
				let page2 = new MessageEmbed()
					.setAuthor(
						`Showing a total of ${chap_Length} ${result.titles[reaction].title} chapter`,
						`https://media.discordapp.net/attachments/799595012005822484/822657390075445248/default_brand.png`,
						`https://mangadex.org/title/${result.titles[reaction].id}`
					)
					.setThumbnail(`${result.titles[reaction].image_url}`)
					.setColor("F7931E")
					.setDescription(chaptersArray.slice(100, 200).join("\n"))
					.addField(`Total Views${result.titles[reaction].views}`)
					.addField("Last chapter on", `${latestChapterUploadedOn} GMT+7`);

				pages.push(page2);
			}

			if (chaptersArray.length > 200 && chaptersArray.length < 300) {
				let page3 = new MessageEmbed()
					.setAuthor(
						`Showing a total of ${chap_Length} ${result.titles[reaction].title} chapter`,
						`https://media.discordapp.net/attachments/799595012005822484/822657390075445248/default_brand.png`,
						`https://mangadex.org/title/${result.titles[reaction].id}`
					)
					.setThumbnail(`${result.titles[reaction].image_url}`)
					.setColor("F7931E")
					.setDescription(chaptersArray.slice(200, 300).join("\n"))
					.addField(`Total Views${result.titles[reaction].views}`)
					.addField("Last chapter on", `${latestChapterUploadedOn} GMT+7`);

				pages.push(page3);
			}

			msg.edit(`**__Loading Finished__**`);
			msg.delete({
				timeout: 5000,
			});

			paginationEmbed(message, pages, false, 600000); // 10 minutes
		}

		function info() {
			let embed = new MessageEmbed().setTitle("Invalid Parameter Inputted").setDescription("Please enter correct arguments, for more info check using help command");

			return embed;
		}

		function noMangaFound() {
			let embed = new MessageEmbed().setTitle("No Manga Found!").setDescription(`There is no result for ${args.join(" ")}\nPlease check first wether it exist on [Mangadex](https://mangadex.org/) or not!`);

			return embed;
		}

		// Below is the function to get the results of the reaction
		function getResult(me) {
			// Pass var as me
			switch (me) {
				case "1️⃣":
					return 0;
				case "2️⃣":
					return 1;
				case "3️⃣":
					return 2;
				case "4️⃣":
					return 3;
				case "5️⃣":
					return 4;
				case "6️⃣":
					return 5;
				case "7️⃣":
					return 6;
				case "8️⃣":
					return 7;
				case "9️⃣":
					return 8;
			}
		}
	}
};
