const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { paginationEmbed } = require("../../../../local_dependencies/functions.js");
const { Mangadex } = require("mangadex-api");
const client = new Mangadex();
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("readchapter", {
			categories: "manga",
			aliases: ["readid", "read", "mangaread"],
			info: "Read manga from mangadex by inputting chapter id. You can get the chapter ID by searching the manga name using `searchchapter` command.\n\nCommand possible by using [Mangadex API](https://mangadex.org/thread/351011) & [Mangadex API NPM](https://www.npmjs.com/package/mangadex-api)",
			usage: `${prefix}command/alias <chapterID>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			return message.channel.send(info());
		} else if (isNaN(args.join(" "))) {
			return message.channel.send(notANumber());
		} else {
			const msg = await message.channel.send(`Searching for chapter id \`${args.join(" ")}\` please wait...`);
			await client.agent.login(process.env.Mangadex_Username, process.env.Mangadex_Password, false); // Authentication

			// Search the chapter
			const toRead = client.chapter.getChapter(args.join(" "));
			console.log(toRead);
			// if not found then noMangaFound();
			// Will continue when mangadex is back up

			// Get the length
			var amountOfPages = (await toRead).pages.length;
			msg.edit(`Manga Found!`);

			// Push the info to chapterArray
			var embedChaptersReader = [];
			for (var i = 0; i < amountOfPages; i++) {
				msg.edit(`Getting pages \`${i + 1}\` please wait...`);

				embedChaptersReader[i] = new MessageEmbed()
					.setAuthor(
						`${(await toRead).mangaTitle} Ch. ${(await toRead).chapter}`,
						"https://media.discordapp.net/attachments/799595012005822484/822657390075445248/default_brand.png",
						`https://mangadex.org/chapter/${(await toRead).id}/${i}`
					)
					.setImage((await toRead).pages[i])
					.setDescription(
						`Uploaded on: ${Moment((await toRead).timestamp * 1000)
							.tz("Asia/Jakarta")
							.format("DD-MM-YY")}`
					);
			}

			msg.edit(`**__Loading Finished__**`);
			msg.delete({
				timeout: 5000,
			});

			var pages = [];
			for (var i = 0; i < embedChaptersReader.length; i++) {
				pages.push(embedChaptersReader[i]);
			}

			paginationEmbed(message, pages, false, 900000); // 15 minutes
		}

		function info() {
			let embed = new MessageEmbed().setTitle("Invalid Parameter Inputted").setDescription("Please enter correct arguments, for more info check using help command");

			return embed;
		}

		function noMangaFound() {
			let embed = new MessageEmbed()
				.setTitle("No Manga Chapters Found!")
				.setDescription(`There is no result for ${args.join(" ")}\nPlease input a correct manga chapter ID. You can search for the id by using \`search\` command`);

			return embed;
		}

		function notANumber() {
			let embed = new MessageEmbed().setTitle("Invalid ID inputted!").setDescription(`Arguments inputted shoul be manga chapters id that you get from using the \`search\` command`);

			return embed;
		}
	}
};
