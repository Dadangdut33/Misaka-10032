const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');
const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const { build, Repo_Link } = require("../../../../config");
const { paginationEmbed } = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];

module.exports = class extends Command {
    constructor() {
        super('changelog', {
            aliases: ['log'],
            categories: 'changelog',
            info: 'Get bot changelog',
            usage: `${prefix}command/alias`,
            guildOnly: true,
        });
    }

    async run(message, args) {
        const path = "./local_dependencies/changelog.txt";
        const content = fs.readFileSync(path, 'utf-8');

        const path2 = "./local_dependencies/changelog2.txt";
        const content2 = fs.readFileSync(path2, 'utf-8');

        const path3 = "./local_dependencies/changelog3.txt";
        const content3 = fs.readFileSync(path3, 'utf-8');

        let page1 = new MessageEmbed()
        .setAuthor(`${message.client.user.username} Ver. ${build}`, `${message.client.user.displayAvatarURL()}`, Repo_Link)
        .setTitle(`Changelog`)
        .setDescription(content)
        .setTimestamp();

        let page2 = new MessageEmbed()
        .setAuthor(`${message.client.user.username} Ver. ${build}`, `${message.client.user.displayAvatarURL()}`, Repo_Link)
        .setTitle(`Changelog`)
        .setDescription(content2)

        let page3 = new MessageEmbed()
        .setAuthor(`${message.client.user.username} Ver. ${build}`, `${message.client.user.displayAvatarURL()}`, Repo_Link)
        .setTitle(`Changelog`)
        .setDescription(content3)
        
        var pages = [
            page1,
            page2,
            page3
          ]
    
        paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
    }
};