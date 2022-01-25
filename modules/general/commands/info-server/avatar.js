const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("avatar", {
			aliases: ["pp", "profilepicture"],
			categories: "info-server",
			info: "Show avatar/profile picture of tagged user",
			usage: `${prefix}command/alias [tagged user]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let Embed = new MessageEmbed();
		if (!message.mentions.users.first()) {
			//Embed
			Embed.setTitle(`Your Profile Picture! (${message.author.tag})`);
			Embed.setColor(`RANDOM`);
			Embed.setImage(message.author.displayAvatarURL({ format: "jpg", size: 2048 }));
			Embed.addField(
				`Avatar URL`,
				`[JPG](${message.author.displayAvatarURL({ format: "jpg", size: 2048 })}) | [PNG](${message.author.displayAvatarURL({ format: "png", size: 2048 })}) | [WEBP](${message.author.displayAvatarURL({
					format: "webp",
					size: 2048,
				})})`
			);
			Embed.setFooter(`${message.author.username}'s Profile`);

			return message.channel.send(Embed);
		} else {
			let User = message.mentions.members.first();

			//Embed
			Embed.setTitle(`${message.client.users.cache.get(User.id).tag}'s Profile Picture!`);
			Embed.setColor(`RANDOM`);
			Embed.setImage(message.client.users.cache.get(User.id).displayAvatarURL({ format: "jpg", size: 2048 }));
			Embed.addField(
				`Avatar URL`,
				`[JPG](${message.client.users.cache.get(User.id).displayAvatarURL({ format: "jpg", size: 2048 })}) | [PNG](${message.client.users.cache
					.get(User.id)
					.displayAvatarURL({ format: "png", size: 2048 })}) | [WEBP](${message.client.users.cache.get(User.id).displayAvatarURL({ format: "webp", size: 2048 })})`
			);
			Embed.setFooter(`Requested by ${message.author.username}`);

			return message.channel.send(Embed);
		}
	}
};
