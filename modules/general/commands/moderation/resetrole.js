const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");

module.exports = class extends Command {
	constructor() {
		super("resetrole", {
			aliases: ["No alias is set for this command"],
			categories: "moderation",
			info: "Reset roles, only usable by admin and mods",
			usage: `${prefix}command/alias <tagged roles>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("You don't have the required permissions to use this command.").then((msg) =>
				msg.delete({
					timeout: 5000,
				})
			);
		}

		if (args.length < 1) {
			return message.channel.send("Nothing to say?").then((msg) =>
				msg.delete({
					timeout: 5000,
				})
			);
		}

		// get all tagged roles
		const taggedRoles = message.mentions.roles.array();

		if (taggedRoles.length < 1) {
			return message.channel.send("You need to tag at least one role!").then((msg) =>
				msg.delete({
					timeout: 5000,
				})
			);
		}

		// get the guild
		const guild = message.guild;

		// loop member of the guild and remove their roles
		guild.members.cache.forEach((member) => {
			// loop through the tagged roles
			taggedRoles.forEach((role) => {
				// remove the role from the member
				member.roles.remove(role);
			});
		});
	}
};
