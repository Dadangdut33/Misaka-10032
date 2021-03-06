const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
var fraktur = require('fraktur');

module.exports = class extends Command {
    constructor() {
      super('frakturbold', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '*\"π£π―ππ¨π±π²π―\"* letter(s) but in **ππ¬π©π‘** using [fraktur](https://www.npmjs.com/package/fraktur/v/1.1.0)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(("Please enter the text that you want to") + ` *\"π£π―ππ¨π±π²π―π¦π£πΆπ°\"*`);
                        
            message.channel.send(embed);
        } else {
            const fraktured = fraktur.encode(args.join(" "));

            message.channel.send(`**${fraktured}**`);
        }
    }
};