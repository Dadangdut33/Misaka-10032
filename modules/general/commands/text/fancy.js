const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { fancy } = require('../../../../local_dependencies/fancyfies');

module.exports = class extends Command {
    constructor() {
      super('fancy', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '*\"𝒻𝒶𝓃𝒸𝓎\"* letter(s)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(("Please enter the text that you want to") + ` *\"𝒻𝒶𝓃𝒸𝒾𝒻𝓎𝓈\"*`);
                        
            message.channel.send(embed);
        } else {
            var fancied = fancy(args.join(" "));

            if (fancied == ""){
                fancied = "Invalid text inputted"
            }

            message.channel.send(fancied);
        }
    }
};