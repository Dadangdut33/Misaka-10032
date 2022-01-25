const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("ship", {
			categories: "fun",
			aliases: ["No alias is set for this command"],
			info: "Ship people or characters using [Duncte123 API](https://docs.duncte123.com/)",
			usage: `${prefix}command <charname> x <charname> *Notice the (x)`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (args.includes("x") == false) {
			let embed = new MessageEmbed()
				.setTitle(`Invalid format`)
				.setDescription(`Please enter the name that you want to ship. Usage should be like this example :arrow_down:\`\`\`css\n${prefix}ship Togashi Yuta x Takanashi Rikka\`\`\``)
				.setTimestamp();

			message.channel.send(embed);
		} else {
			const msg = await message.channel.send(`:cruise_ship: Shipping...`);

			let data = await random.getShip(args).catch((e) => {
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
	}
};
