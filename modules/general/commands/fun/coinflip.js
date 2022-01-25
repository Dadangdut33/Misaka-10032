const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("coinflip", {
			categories: "fun",
			aliases: ["flip"],
			info: "Flips coins",
			usage: `${prefix}command/alias`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		var x = Math.floor(Math.random() * responses.length);

		message.channel.send(`${flip(x)}`);
	}
};

const responses = ["Heads", "Tails"];

function flip(x) {
	return responses[x];
}
