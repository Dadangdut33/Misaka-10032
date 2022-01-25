const { MessageEmbed, DiscordAPIError } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("tagspoiler", {
			aliases: ["ts"],
			categories: "moderation",
			info: "Tag spoiler a message by using the bot, only usable by admin and mods",
			usage: `${prefix}command/alias <message id> <reason>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		message.delete();

		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the required permissions to use this command.").then((msg) => msg.delete({ timeout: 5000 }));

		if (args.length < 1) return message.channel.send(invalidArgs()).then((msg) => msg.delete({ timeout: 5000 }));

		if (isNaN(args[0])) return message.channel.send(errorID()).then((msg) => msg.delete({ timeout: 5000 }));

		if (!args[1]) return message.channel.send(noReason()).then((msg) => msg.delete({ timeout: 5000 }));

		var reason = args.join(" ").replace(args[0], "");
		var author = message.author;
		// var authorPP = message.author.displayAvatarURL({ format: 'jpg', size: 2048 })

		message.channel.messages
			.fetch(args[0])
			.then((message) => {
				message.delete();

				var newMsg = `${message.author} **__Your Message Has Been Marked as Spoiler__**`;

				var attachmentName = message.attachments.map((attachment) => attachment.name);

				var attachmentURL = message.attachments.map((attachment) => attachment.proxyURL);

				var height = message.attachments.map((attachment) => attachment.height);
				var width = message.attachments.map((attachment) => attachment.width);
				var size = message.attachments.map((attachment) => attachment.size);

				// console.log(attachmentName);
				if (attachmentName == "") {
					attachmentName = "";
				} else {
					attachmentName = `(${attachmentName})`;
				}

				if (attachmentURL == "") {
					attachmentURL = "No Attachment";
				} else {
					attachmentURL = `[Click Here for The Attachment](${attachmentURL})`;
				}

				if (size == "") {
					size = "-";
				}

				let embed = new MessageEmbed()
					.setTitle(`Reason: ${reason.trim()}`)
					.setDescription(`**Message Content Below:**\n${message.content ? `||${message.content.replace(/\||```/g, "")}||` : "-"}`)
					.addField(`Attachment ${attachmentName}`, `${attachmentURL}\nAttachment Details: **${width} x ${height}** (${size} Bytes)`, false)
					.addField(`Go To`, `[Message Position](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, false)
					.addField(`Reminder`, `Please use the tag spoiler if your message contains spoiler so this won't happen again in the future. Example of how to use it -> \`||spoiler here||\``, false)
					.addField(`Message Sent At`, Moment(message.createdTimestamp).tz("Asia/Jakarta").format("dddd, D-M-YY (HH:mm:ss)"), true)
					.addField(`Message Author`, message.author, true)
					.addField(`Marked by`, author, true)
					.setFooter(`Format Date: D-M-Y, GMT + 7`)
					.setTimestamp();

				message.channel.send(newMsg);
				return message.channel.send(embed);
			})
			.catch((error) => {
				console.log(error);
				if (error instanceof DiscordAPIError) {
					let embed = new MessageEmbed().setColor("#000000").setDescription(`Invalid Message ID provided. Please provide a correct one!`);

					return message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }));
				} else {
					let embed = new MessageEmbed().setColor("#000000").setDescription(`Caught Error: ${error}`);

					return message.channel.send(embed).then((msg) => msg.delete({ timeout: 5000 }));
				}
			});
		function invalidArgs() {
			let embed = new MessageEmbed().setColor("#000000").setDescription(`Wrong Arguments Provided!`);

			return embed;
		}

		function errorID() {
			let embed = new MessageEmbed().setColor("#000000").setDescription(`Invalid Message ID provided. Please provide a correct one!`);

			return embed;
		}

		function noReason() {
			let embed = new MessageEmbed().setColor("#000000").setDescription(`Please provide a reason!`);

			return embed;
		}
	}
};
