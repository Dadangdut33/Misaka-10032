const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
var fraktur = require("fraktur");

module.exports = class extends Command {
	constructor() {
		super("fraktur", {
			aliases: ["No alias is set for this command"],
			categories: "text",
			info: '*"𝔣𝔯𝔞𝔨𝔱𝔲𝔯"* letter(s) using [fraktur](https://www.npmjs.com/package/fraktur/v/1.1.0)',
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription("Please enter the text that you want to" + ` *\"𝔣𝔯𝔞𝔨𝔱𝔲𝔯𝔦𝔣𝔦𝔢𝔰\"*`);

			message.channel.send(embed);
		} else {
			const fraktured = fraktur.encode(args.join(" "));

			message.channel.send(fraktured);
		}
	}
};
