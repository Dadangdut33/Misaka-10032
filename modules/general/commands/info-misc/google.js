const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const sec = require("search-scraper");

module.exports = class extends Command {
	constructor() {
		super("google", {
			aliases: ["No alias is set for this command"],
			categories: "info-misc",
			info: "Search for stuff on google and return the results as link",
			usage: `${prefix}command/alias <...>`,
			guildOnly: false,
		});
	}
	async run(message, args) {
		if (args.length < 1) {
			return message.channel.send(`Please input correctly!`);
		} else {
			const msg = await message.channel.send(`**Searching...**`);
			var timeMsStart = Date.now();

			const options = {
				agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
			};

			sec.google(args.join(" "), options).then(function (result) {
				if (result.error) {
					msg.edit(`Error: ${result.error}`);
					return;
				}

				if (result.links.length > 0) {
					msg.edit("**Finishes search!** Found " + result.links.length + " results! Time taken " + (Date.now() - timeMsStart) + "ms");
					// prettier-ignore
					var embed = new MessageEmbed()
						.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
						.setTitle(`Google Search`)
						.setDescription(`Query: ${args.join(" ")}\n\n**Found ${result.links.length} results!**`)
						.setColor("#4ec3fe")
						.setFooter(`Via Google`);

					var limit = result.links.length > 25 ? 25 : result.links.length;

					for (var i = 0; i < limit; i++) {
						// get title after the 2 //
						var titleSplit = result.links[i].split("/");
						var title = titleSplit.slice(2, titleSplit.length).join("/");

						var toShow = `[${title}](${result.links[i]})`;
						if (title === "") {
							toShow = `${result.links[i]}`;
						}

						embed.addField(i + 1, toShow, true);
					}

					return message.channel.send(embed);
				} else {
					msg.edit(`**No result found!**`);
				}
			});
		}
	}
};
