const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const factRand = require("../../../../local_dependencies/factspool");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("facts", {
			categories: "fun",
			aliases: ["fact"],
			info: "Gives you random fact. There are over 3000+ facts that are scrapped from [random-fact](https://www.npmjs.com/package/random-fact)",
			usage: `${prefix}command`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		var x = Math.floor(Math.random() * factRand().factsLen);
		let embed = new MessageEmbed().setColor("RANDOM").setDescription(factRand(x).fact);

		return message.channel.send(embed);
	}
};
