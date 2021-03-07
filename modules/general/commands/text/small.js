const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const tinytext = require('tiny-text');

module.exports = class extends Command {
    constructor() {
      super('small', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '\`ˢᵐᵃᶫᶫᶦᶠʸˢ\` ᵃ ˢᵉᶰᵗᵉᶰᶜᵉ ᵘˢᶦᶰᵍ [tiny-text](https://www.npmjs.com/package/tiny-text)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription("Please enter the text that you want to" + ` *\"ˢᵐᵃᶫᶫᶦᶠʸˢ\"*`);
                        
            message.channel.send(embed);
        } else {
            const tinied = tinytext(args.join(" "));

            if(tinied == ""){
                tinied = "Invalid text inputted"
            }

            message.channel.send(tinied);
        }
    }
};