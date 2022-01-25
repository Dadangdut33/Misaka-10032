const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("advice", {
			categories: "fun",
			aliases: ["adv"],
			info: "Gives you random advice using [Adviceslip API](https://api.adviceslip.com/)",
			usage: `${prefix}advice or ${prefix}adv`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		const msg = await message.channel.send(`Loading...`);
		let data = await random.getAdvice().catch((e) => {
			console.log(e);
			msg.edit(`Can't reached API, try again later!`);
			return;
		});

		if (!data) {
			msg.edit(`Can't reached API, try again later!`);
			return;
		}

		msg.delete();
		return message.channel.send(data);
	}
};
