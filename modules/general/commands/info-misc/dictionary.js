const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const request = require("request-promise");
const cheerio = require("cheerio");
const { paginationEmbed } = require("../../../../local_dependencies/functions.js");

module.exports = class extends Command {
	constructor() {
		super("dictionary", {
			aliases: ["dic", "dict"],
			categories: "info-misc",
			info: "Find the definition of a word from Oxford Dictionary using [Lexico](https://www.lexico.com/)",
			usage: `${prefix}command/alias <...>`,
			guildOnly: false,
		});
	}
	async run(message, args) {
		if (!args[0]) {
			return message.channel.send(`Please enter a correct word to search!`);
		} else {
			// const query = encodeURIComponent(wordToDefine.join(this.usageDelim));
			const query = args.join(`_`);

			var pages = [];
			const author = "Lexico (Powered By Oxford)";
			const thumbnail = "https://i.imgur.com/4wHZP6c.png";
			const url = "https://www.lexico.com/en/definition/";
			const link = url + query;

			await request(link)
				.then((definition) => {
					const $ = cheerio.load(definition);
					const title = toTitleCase($(".entryWrapper").find(".hw").data("headword-id"));

					let display = [];
					$(".entryWrapper")
						.children(".gramb")
						.each((i, el) => {
							const examples = `**Examples:**\n${$(el).find(".ex").first().text()}`;
							const meaning = $(el).find(".ind").text();
							const type = toTitleCase($(el).find(".pos").children(".pos").text());

							const description = [`\n\n**${type}:**`, `${meaning.replace(/\./g, `.\n\n`)}`, `${examples}`].join("\n");
							//`${meaning.replace(/\./g, `.\n`)}`,

							// prettier-ignore
							display[i] = new MessageEmbed()
								.setAuthor(author)
								.setColor("RANDOM")
								.setTitle(title)
								.setDescription(description)
								.setThumbnail(thumbnail)
								.setURL(link);
						});

					for (var i = 0; i < display.length; i++) {
						pages.push(display[i]);
					}

					paginationEmbed(message, pages, false, 300000);
				})
				.catch((error) => {
					// console.log(error);
					return message.channel.send("No definition found, please enter a correct word!");
				});
		}
	}
};

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
