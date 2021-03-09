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
            return message.channel.send("Please enter a valid reddit url!");
        }
        
        let link = `https://redditsave.com/info?url=${args[0]}`;

        //Fetching the HTML using axios
        var { data } = await axios.get(link);

        //Using cheerio to load the HTML fetched
        var $ = await cheerio.load(data);

        //Fetching the title of the site
        var errorMsg = await $('div[class = "alert alert-danger"]').text();
        
        if(errorMsg) {
            return message.channel.send("Please enter a valid reddit url!");
        }

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Direct link to Redditsave`)
            .addField(`Click below`, `[RedditSave](https://redditsave.com/info?url=${args[0]})`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            
        message.channel.send(embed);
    }
};