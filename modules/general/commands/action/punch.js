const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("punch", {
			categories: "action",
			aliases: ["punches"],
			info: "Punches others. Images are fetched from [Neko love API](https://nekos.life/)",
			usage: `${prefix}command [tag] [message]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let data = await random.getAnimeImgURL("punch");
		let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${message.author.username} punches ${args.join(" ")}`)
			.setImage(data);

		message.channel.send(embed);
	}
};
