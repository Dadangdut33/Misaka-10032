const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { reverseString } = require("../../../../local_dependencies/functions");

module.exports = class extends Command {
	constructor() {
		super("reverse", {
			aliases: ["No alias is set for this command"],
			categories: "text",
			info: '*"esrever"* a sentence',
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription("esrever ot tnaw uoy taht txet eht retne esaelP");

			message.channel.send(embed);
		} else {
			var toBeReversed = args.join(" ");

			var reversed = reverseString(toBeReversed);

			message.channel.send(reversed);
		}
	}
};
