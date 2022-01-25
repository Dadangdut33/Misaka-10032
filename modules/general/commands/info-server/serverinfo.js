const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const Moment = require("moment-timezone");
const prettyMS = require("pretty-ms");

module.exports = class extends Command {
	constructor() {
		super("serverinfo", {
			aliases: ["si", "server"],
			categories: "info-server",
			info: "Get current server info",
			usage: `${prefix}command/alias`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			var emoji = [];
			emoji = getEmoji(); // Map the emojis

			var nonAnimated = [];
			var Animated = [];
			if (emoji == "") {
				nonAnimated.push("No custom emoji in server");
				Animated.push("-");
			} else {
				for (var i = 0; i < emoji.length; i++) {
					if (emoji[i].animated) {
						Animated.push(`<a:${emoji[i].name}:${emoji[i].id}>`);
					} else if (!emoji[i].animated) {
						nonAnimated.push(`<:${emoji[i].name}:${emoji[i].id}>`);
					}
				}
			}

			// Non Animated
			var emoji1NonAnimated = [];
			var emoji2NonAnimated = [];
			for (var i = 0; i < 25; i++) {
				// 1-25
				emoji1NonAnimated.push(nonAnimated[i]);
			}
			for (var i = 25; i < 50; i++) {
				// 26-50
				emoji2NonAnimated.push(nonAnimated[i]);
			}
			if (!emoji1NonAnimated[0]) {
				emoji1NonAnimated.push("-");
			}
			if (!emoji2NonAnimated[0]) {
				// If not more than 25
				emoji2NonAnimated.push("-");
			}

			// Animated
			var emoji1Animated = [];
			var emoji2Animated = [];
			for (var i = 0; i < 25; i++) {
				// 1-25
				emoji1Animated.push(Animated[i]);
			}
			for (var i = 25; i < 50; i++) {
				// 26-50
				emoji2Animated.push(Animated[i]);
			}

			if (!emoji1Animated[0]) {
				// If no animated emoji
				emoji1Animated.push("-");
			}
			if (!emoji2Animated[0]) {
				// If not more than 25
				emoji2Animated.push("-");
			}

			// Age
			var today = Moment().tz("Asia/Jakarta");
			var age = today - message.guild.createdAt;

			let embed = new MessageEmbed()
				.setThumbnail(message.guild.iconURL({ format: "jpg", size: 2048 }))
				.setAuthor(message.guild.name, message.guild.iconURL({ format: "jpg", size: 2048 }), `https://discord.com/channels/${message.guild.id}`)
				.setTitle(`Server Information`)
				.setDescription(`[Get Server Icon](${message.guild.iconURL({ format: "jpg", size: 2048 })})`)
				.addField("Server ID", message.guild.id, true)
				.addField("Permanent Invite Link", process.env.Server_invite, true)
				.addField("Owner", "<@" + message.guild.ownerID + ">", false)
				.addField("Server Name", message.guild.name, true)
				.addField("Region", message.guild.region, true)
				.addField("Members/Online", `${message.guild.memberCount}/${OnlineUsers()}`, true)
				.addField("Default Notification", message.guild.defaultMessageNotifications, true)
				.addField("AFK Timeout", message.guild.afkTimeout, true)
				.addField("Nitro Lvl/Supporter", `${message.guild.premiumTier}/${message.guild.premiumSubscriptionCount}`, true)
				.addField("Emojis (Max shown 50)", emoji1NonAnimated.join(" "), false)
				.addField("Cont.", emoji2NonAnimated.join(" "), false)
				.addField("Animated Emojis", emoji1Animated.join(" "), false)
				.addField("Cont.", emoji2Animated.join(" "), false)
				.addField("Server Age", `${prettyMS(age)}`, false)
				.addField("Created On", `${Moment(message.guild.createdAt).tz("Asia/Jakarta").format("dddd DD MMMM YYYY HH:mm:ss")} GMT+0700 (Western Indonesia Time)`, false)
				.addField("You Joined At", `${Moment(message.member.joinedAt).tz("Asia/Jakarta").format("dddd DD MMMM YYYY HH:mm:ss")} GMT+0700 (Western Indonesia Time)`, false)
				.setColor("RANDOM")
				.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
				.setTimestamp();

			message.channel.send(embed);
		}

		function OnlineUsers(users) {
			var users = message.guild.members.cache.filter((m) => m.user.presence.status === "online").size;
			users += message.guild.members.cache.filter((m) => m.user.presence.status === "idle").size;
			users += message.guild.members.cache.filter((m) => m.user.presence.status === "dnd").size;
			return users;
		}

		function getEmoji() {
			return message.guild.emojis.cache.map((emojis) => {
				return emojis;
			});
		}
	}
};

// .addField(`Total Channel`, message.client.channels.cache.size, true)
// .setImage(message.guild.iconURL(({ format: 'jpg', size: 2048 })))
