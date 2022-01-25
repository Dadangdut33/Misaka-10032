const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const stutterify = require("stutterify");

module.exports = class extends Command {
	constructor() {
		super("stutterify", {
			aliases: ["stutter"],
			categories: "text",
			info: '*"stutterifys"* a sentence using [stutterify](https://www.npmjs.com/package/stutterify)',
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription(stutterify("Please enter the text that you want to") + ` *\"stutterifys\"*`);

			message.channel.send(embed);
		} else {
			const stutttered = stutterify(args.join(" "));

			message.channel.send(stutttered);
		}
	}
};
