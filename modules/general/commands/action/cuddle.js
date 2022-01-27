const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("cuddle", {
			categories: "action",
			aliases: ["cuddles"],
			info: "**Cuddles**. Images are fetched from [Nekos.life API](https://nekos.life/)",
			usage: `${prefix}command [tag] [message]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let data = await random.getAnimeImgURLV2("cuddle");
		let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${message.author.username} cuddles ${args.join(" ")}`)
			.setImage(data);

		message.channel.send(embed);
	}
};
