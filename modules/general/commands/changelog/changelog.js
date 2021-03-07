const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');
const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const { build } = require("../../../../config");

module.exports = class extends Command {
    constructor() {
        super('changelog', {
            aliases: ['log'],
            categories: 'changelog',
            info: 'Get bot changelog',
            usage: `${prefix}command/alias`,
            guildOnly: false,
        });
    }

    async run(message, args) {
        const path = "./local_dependencies/changelog.txt";
        const content = fs.readFileSync(path, 'utf-8');

        const path2 = "./local_dependencies/changelog2.txt";
        const content2 = fs.readFileSync(path2, 'utf-8');

        const path3 = "./local_dependencies/changelog3.txt";
        const content3 = fs.readFileSync(path3, 'utf-8');

        let embed = new MessageEmbed()
        .setAuthor(`${message.client.user.username}'s Changelog`, `${message.client.user.displayAvatarURL()}`)
        .setTitle(`Changelog`)
        .setDescription(content)
        .addField(`Cont.`, content2, false)
        .addField(`Cont.`, content3, false)
        .setFooter(`Current Version: ${build}`)
        .setTimestamp();


        message.channel.send(embed);
    }
};