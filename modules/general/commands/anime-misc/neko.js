const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("neko", {
			categories: "anime-misc",
			aliases: ["No alias is set for this command"],
			info: "Post random neko girl image using [Neko-love API](https://neko-love.xyz/)",
			usage: `${prefix}command`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		var a = Math.floor(Math.random() * 2);
		const msg = await message.channel.send(`Loading...`);

		switch (a) {
			case 0:
				let data = await random.getNeko().catch((e) => {
					console.log(e);
					msg.edit(`Can't reached API, try again later!`);
					return;
				});

				if (!data) {
					msg.edit(`Can't reached API, try again later!`);
					return;
				}

				msg.delete();
				message.channel.send(data);
				break;
			case 1:
				let data2 = await random.getNekoGif().catch((e) => {
					console.log(e);
					msg.edit(`Can't reached API, try again later!`);
					return;
				});

				if (!data2) {
					msg.edit(`Can't reached API, try again later!`);
					return;
				}

				msg.delete();
				message.channel.send(data2);
				break;
			case 2:
				let data3 = await random.getNekoV2().catch((e) => {
					console.log(e);
					msg.edit(`Can't reached API, try again later!`);
					return;
				});

				if (!data3) {
					msg.edit(`Can't reached API, try again later!`);
					return;
				}

				msg.delete();
				message.channel.send(data3);
				break;
		}
	}
};
