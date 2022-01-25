const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");

module.exports = class extends Command {
	constructor() {
		super("slowmode", {
			aliases: ["slow"],
			categories: "moderation",
			info: "Activate slowmode to current channel",
			usage: `${prefix}command/alias <off/seconds> <reason>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the required permissions to use this command.").then((msg) => msg.delete({ timeout: 5000 }));

		if (args.length < 2) {
			message.channel.send(`Please provide a reason!`);
			return;
		}

		let duration = args.shift().toLowerCase();

		if (duration == "off" || duration == 0) {
			duration = 0;
			type = `Diactivated`;
		}

		if (isNaN(duration)) {
			message.channel.send(`Please provide a correct time / number (in seconds) or type 0 or off if you want to turn slowmode off`);
		}

		if (duration == 0) {
			message.channel.setRateLimitPerUser(duration, args.join(` `));

			let embed = new MessageEmbed()
				.setTitle(`Slowmode Has Been Diactivated`)
				.setColor("#000000")
				.setDescription(`\`\`\`css\nReason: ${args.join(` `)}\`\`\``)
				.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
				.setTimestamp();

			message.channel.send(embed);
		} else if (!isNaN(duration)) {
			message.channel.setRateLimitPerUser(duration, args.join(` `));
			let embed = new MessageEmbed()
				.setTitle(`Slowmode Has Been Activated`)
				.setColor("#000000")
				.setDescription(`Duration \`${duration}\` seconds\`\`\`css\nReason: ${args.join(` `)}\`\`\``)
				.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
				.setTimestamp();

			message.channel.send(embed);
		}
	}
};
