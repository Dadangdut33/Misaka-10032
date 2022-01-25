const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("cuddle", {
			categories: "action",
			aliases: ["No alias is set for this command"],
			info: "**Cuddles**. Images are fetched from [Nekos.life API](https://nekos.life/)",
			usage: `${prefix}command [tag] [message]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let User = message.mentions.members.first();

		if (!args[0]) {
			let data = await random.getAnimeImgURLV2("cuddle");
			let embed = new MessageEmbed().setColor("RANDOM").setDescription(`${message.author.username} cuddles`).setImage(data);

			message.channel.send(embed);
		} else {
			let data = await random.getAnimeImgURLV2("cuddle");
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`${message.author.username} cuddles ${args.join(" ")}`)
				.setImage(data);

			message.channel.send(embed);
		}
	}
};
