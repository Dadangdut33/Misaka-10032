const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("reportbug", {
			aliases: ["bugreport", "contact"],
			categories: "info-bot",
			info: "Report bugs to the bot. It will then be reviewed manually",
			usage: `${prefix}command <bugs detail>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!args[0]) return message.reply("What do you want to report?").then((msg) => msg.delete({ timeout: 5000 }));

		message.author.send(`Thanks for reporting the bug. It will be reviewed as soon as possible`);
		message.delete();

		var attachmentName = message.attachments.map((attachment) => attachment.name);

		var attachmentURL = message.attachments.map((attachment) => attachment.proxyURL);

		if (attachmentName == "") {
			attachmentName = "No Attachment";
		} else {
			attachmentName = `${attachmentName}`;
		}

		if (attachmentURL == "") {
			attachmentURL = "";
		} else {
			attachmentURL = `[Click Here for The Attachment](${attachmentURL})`;
		}

		let embed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
			.setTitle(`Reported A Bug`)
			.setDescription(args.join(" "))
			.addField(`Reported at`, Moment(message.createdAt).tz("Asia/Jakarta").format("dddd DD MMMM YYYY HH:mm:ss"), false)
			.addField(`Message Details`, `**From**\nServer: ${message.guild}\nChannel Name: ${message.channel.name}\nChannel ID: ${message.channel.id}`, true)
			.addField(`Attachments`, `${attachmentName}\n${attachmentURL}`, false)
			.addField(`User Details`, `Username: ${message.author.username}\nDiscriminator: ${message.author.discriminator}`)
			.setFooter("Time in GMT + 7")
			.setTimestamp();

		message.client.channels.cache.get("817652855166074900").send(embed); // This get sends to bug reported channel in ppw
	}
};
