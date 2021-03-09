const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = class extends Command {
    constructor() {
      super('redditsave', {
        aliases: ['No alias is set for this command'],
        categories: 'tool',
        info: 'Get media download links of a reddit post',
        usage: `${prefix}command/alias <post link>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if (!args[0]) {
            return message.channel.send("Error! Please provide a valid reddit post url.");
        }
        
        let link = `https://redditsave.com/info?url=${args[0]}`;

        //Fetching the HTML using axios
        var { data } = await axios.get(link);

        //Using cheerio to load the HTML fetched
        var $ = await cheerio.load(data);

        //Fetching the title of the site
        var errorMsg = await $('div[class = "alert alert-danger"]').text();
        
        if(errorMsg) {
            return message.channel.send("Error! Please provide a valid reddit post url.");
        }
        // Get the downloadinfo
        var downloadLink = await $('div[class = "download-info"]').html()
        
        // Match the link from href=
        var takenlink = downloadLink.match(/href=(["'])(?:(?=(\\?))\2.)*?\1/);
        
        // Match the original link now
        var linkOnly = takenlink.join("").match(/(["'])(?:(?=(\\?))\2.)*?\1/)

        var directLink;
        // Is there no media?
        if(args[0] == linkOnly.join("").replace(/("|amp;)/g, "")){
            directLink = `No media to download`
        } else {
            directLink = `[Click Here](${linkOnly.join("").replace(/("|amp;)/g, "")})`
        }

        // Delete user sent message
        message.delete();
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTitle(`Original Reddit Link`)
            .setDescription(args[0])
            .addField(`Direct Download Link`, directLink, true) // Replace the thing in the way
            .addField(`More Options`, `[RedditSave](https://redditsave.com/info?url=${args[0]})`, true)
            .setFooter(`Via redditsave.com`)
            .setColor('FF4500')
            .setTimestamp();
            
        return message.channel.send(embed);
    }
};