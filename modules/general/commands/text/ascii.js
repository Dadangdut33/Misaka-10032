const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const figlet = require("figlet");

module.exports = class extends Command {
	constructor() {
		super("ascii", {
			aliases: ["No alias is set for this command"],
			categories: "text",
			info: "Convert text to ASCII art using [Figlet](https://www.npmjs.com/package/figlet)",
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription(`Please enter the text that you want to convert bruh`);

			message.channel.send(embed);
		} else {
			let msg = args.join(" ");

			figlet.text(msg, function (err, data) {
				if (err) {
					console.log("Something went wrong");
					console.dir(err);
				}
				if (!data) {
					let embed = new MessageEmbed().setDescription(`Invalid text inputted!`);

					return message.channel.send(embed);
				}

				if (data.length > 2000) return message.channel.send("Text can't be longer than 2000 characters");

				message.channel.send("```" + data + "```");
			});
		}
	}
};
