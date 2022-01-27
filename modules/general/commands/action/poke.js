const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("poke", {
			categories: "action",
			aliases: ["pokes"],
			info: "Pokes others. Images are fetched from [Nekos.live API](https://nekos.life/)",
			usage: `${prefix}command [tag] [message]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let data = await random.getAnimeImgURL("poke");
		let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${message.author.username} pokes ${args.join(" ")}`)
			.setImage(data);

		message.channel.send(embed);
	}
};
