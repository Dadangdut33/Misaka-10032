const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix, build, Repo_Link } = require("../../../../config");
const prettyMS = require("pretty-ms");

module.exports = class extends Command {
	constructor() {
		super("about", {
			categories: "info-bot",
			aliases: ["No alias is set for this command"],
			info: "Shows what the bot is about. This include the bot's status & description",
			usage: `${prefix}about`,
			guildOnly: true,
		});
	}
	async run(message, args) {
		const embed = new MessageEmbed()
			.setTitle("Hello there!")
			.setColor("YELLOW")
			.setThumbnail(message.client.user.displayAvatarURL())
			.setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
			.setDescription(
				`My name is **${message.guild.me.displayName}** *says Misaka, trying to explain herself* jk...\n\nThis bot was made by Dadangdut33. At first he created me just for fun, but now there are lots of commands that are quite useful. The bot's name has changed for several time, the first one is *Da-Dang*, then *D-Bot* and now the bot's name is as it is. I won't change it again... For sure... I guess.\n\n**This bot is for private use only**`
			)
			.addField("TOTAL SERVERS/\nCHANNELS", `${message.client.guilds.cache.size}/${message.client.channels.cache.size}`, true)
			.addField("TOTAL MEMBERS", message.client.users.cache.size, true)
			.addField("PRESENCE", message.client.user.presence.activities[0].name, true)
			.addField("ID", message.client.user.id, true)
			.addField("UPTIME", prettyMS(message.client.uptime), true)
			.addField("STATUS", message.client.user.presence.status, true)
			.addField("CREATOR", "Dadangdut33#5264", true)
			.addFields(
				{
					name: "Dadang's MAL Account",
					value: `[MyAnimeList](https://myanimelist.net/profile/Dadangdut33)`,
					inline: true,
				},
				{
					name: "Dadang's YT Account",
					value: `[Youtube](https://www.youtube.com/c/Dadangdut33/)`,
					inline: true,
				},
				{
					name: "Dadang's Github Account",
					value: `[Github](https://github.com/Dadangdut33)`,
					inline: true,
				}
			)
			.addField("Bot's Public Repository", `[Click Here](${Repo_Link})`, false)
			.setFooter(`${message.guild.me.displayName} Version ${build}`, message.client.user.displayAvatarURL())
			.setTimestamp();

		message.channel.send(embed);
	}
};
