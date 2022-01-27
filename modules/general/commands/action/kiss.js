const { Random } = require("../../../../local_dependencies/api_call/random.js");
const random = new Random();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor() {
		super("kiss", {
			categories: "action",
			aliases: ["kisses"],
			info: "Kisses people, I dunno man but this one seems kinda geh. Images are fetched from [Neko love API](https://nekos.life/)",
			usage: `${prefix}command [tag] [message]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let data = await random.getAnimeImgURL("kiss");
		let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`${message.author.username} kisses ${args.join(" ")}`)
			.setImage(data);

		message.channel.send(embed);
	}
};
