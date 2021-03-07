const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const vaporize = require("vaporwave");

module.exports = class extends Command {
    constructor() {
      super('wide', {
        aliases: ['vaporize', 'widen'],
        categories: 'text',
        info: '*\"ｗｉｄｅｎ\"* a sentence using [vaporwave](https://www.npmjs.com/package/vaporwave)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(vaporize("Please enter the text that you want to") + ` *\"ｗｉｄｅｎ\"*`);
                        
            message.channel.send(embed);
        } else {
            const vaporized = vaporize(args.join(" "));

            if(vaporized == ""){
                let embed = new MessageEmbed()
                .setDescription('Please enter a correct text!')

                return message.channel.send(embed)
            }

            message.channel.send(vaporized);
        }
    }
};