const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("joke", {
			categories: "fun",
			aliases: ["No alias is set for this command"],
			info: "Gives you random joke using [duncte123 API](https://docs.duncte123.com/)",
			usage: `${prefix}joke`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		const msg = await message.channel.send(`Loading...`);

		let data = await random.getJoke().catch((e) => {
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
