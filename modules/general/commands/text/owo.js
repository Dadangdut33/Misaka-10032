const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const owoify = require('owoify-js').default

module.exports = class extends Command {
    constructor() {
      super('owo', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '*\"owoifys\"* sentence(s) using [owoify-js](https://www.npmjs.com/package/owoify-js)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(owoify("Please enter the text that you want to") + ` *\"owoifys\"*`);
                        
            message.channel.send(embed);
        } else {
            const owoed = owoify(args.join(" "));

            message.channel.send(owoed);
        }
    }
};
