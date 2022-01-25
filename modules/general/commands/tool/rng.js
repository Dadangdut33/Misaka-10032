const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("rng", {
			aliases: ["No alias is set for this command"],
			categories: "tool",
			info: "Generate random number",
			usage: `${prefix}command/alias <min range> <max range>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0] || !args[1] || isNaN(args[0]) || isNaN(args[1])) {
			let embed = new MessageEmbed().setDescription(`Invalid format. For more info please check using the help command. Example should be like this :arrow_down:\`\`\`css\n${prefix}rng 0 10\`\`\``);

			message.channel.send(embed);
		} else {
			message.channel.send(getRandomIntInclusive(args[0], args[1]));
		}

		function getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
		}
	}
};
