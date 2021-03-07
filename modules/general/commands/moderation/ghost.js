const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');

module.exports = class extends Command {
    constructor() {
        super('ghost', {
            aliases: ["bc", "broadcast"],
            categories: 'moderation',
            info: 'For ghost pinging, only usable by admin and mods',
            usage: `${prefix}ghost <content>`,
            guildOnly: true,
        });
    }

    async run(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("You don't have the required permissions to use this command.").then(msg => msg.delete({
                timeout: 3000
            }));
        }

        if (args.length < 1) {
            message.delete();
            return message.channel.send("Please input who you want to ghost :ghost:").then(msg => msg.delete({
                timeout: 2000
            }));
        } else
        if (args[0]) {
            message.delete();
        }
    }
}