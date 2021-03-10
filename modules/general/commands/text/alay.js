const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
var Chance = require('chance');
var chance = new Chance();

module.exports = class extends Command {
    constructor() {
      super('alay', {
        aliases: ['imdisabled', 'imretarded'],
        categories: 'text',
        info: '**Normal Ver**\nConvert a perfectly normal, safe, non authistic words into cursed "alay" words\n\n**Alay Ver**\nconvErt A pERfeCtLY nORMAL, SaFE, Non authiSTic wordS iNtO cUrSED "alay" WOrDS',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(`PLEaSe ENTeR tHe Text ThAT yOU WAnt tO alayifYs`);
                        
            message.channel.send(embed);
        } else {
            let msg = alayifys(args.join(" "));

            if(!msg){
                let embed = new MessageEmbed()
                .setDescription(`Invalid text inputted!`);
                
                return message.channel.send(embed);   
            }

            return message.channel.send(msg);
        }

        function alayifys(string) {
            var text = string.split('').map((v) =>
                chance.bool() ? v.toUpperCase() : v.toLowerCase()
            ).join('')

            return text;
        }
    }
};