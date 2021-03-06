const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { fancy } = require('../../../../local_dependencies/fancyfies');

module.exports = class extends Command {
    constructor() {
      super('fancybold', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '*\"π»πΆππΈπ\"* letter(s) but in **π·πππΉ**',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(("Please enter the text that you want to") + ` *\"π»πΆππΈπΎπ»πΎππ\"*`);
                        
            message.channel.send(embed);
        } else {
            var fancied = fancy(args.join(" "));

            if (fancied == ""){
                fancied = "Invalid text inputted"
            }

            message.channel.send(`**${fancied}**`);
        }
    }
};