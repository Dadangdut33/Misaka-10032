const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");

module.exports = class extends Command {
	constructor() {
		super("say", {
			aliases: ["bc", "broadcast"],
			categories: "moderation",
			info: "Says your input via the bot, only usable by admin and mods",
			usage: `${prefix}say [embed] <content> or ${prefix}alias [embed] <content>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		message.delete();

		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the required permissions to use this command.").then((msg) => msg.delete({ timeout: 5000 }));

		if (args.length < 1) return message.reply("Nothing to say?").then((msg) => msg.delete({ timeout: 5000 }));

		const roleColor = message.guild.roles.highest.name;

		if (args[0].toLowerCase() === "embed") {
			const embed = new MessageEmbed().setDescription(args.slice(1).join(" ")).setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

			message.channel.send(embed);
		} else {
			message.channel.send(args.join(" "));
		}
	}
};
