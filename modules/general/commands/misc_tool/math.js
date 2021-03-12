const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
    constructor() {
      super('math', {
        aliases: ['No alias is set for this command'],
        categories: 'tool',
        info: `Perform a basic math equation (+/-/x/:) based on the string provided\n**Notes**\n1. You can use both symbols for multiplication (* or x) and division (: or /)\n2. It\'s also ok not to use space\n**Example**\`\`\`${prefix}math 3 * 3/2\`\`\``,
        usage: `${prefix}command/alias <...>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if (!args[0]) {
            return message.channel.send("Please enter a valid argument!");
        }

        const chars = {'x' : '*', ':' : '/'}; // Map the syntax

        try {
            var mathRes = eval(args.join(" ").replace(/[x:]/g, m => chars[m]));

            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .addField(`Problem`, `${args.join(" ").replace(/[x:]/g, m => chars[m])}`, false)
            .addField(`Solution`, `${mathRes}`, false)
            .setTimestamp();
    
            return message.channel.send(embed);
        } catch (e) {
            if(e) { // Put it in if so it stops in the return
                let embed = new MessageEmbed()
                .setTitle(`Error`)
                .setDescription(`Invalid arguments provided, for more info please check using the help commands!`)
    
                return message.channel.send(embed);
            } 
        } 
    }
};