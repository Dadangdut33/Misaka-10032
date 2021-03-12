const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const commaNumber = require("comma-number");

module.exports = class extends Command {
    constructor() {
      super('math', {
        aliases: ['No alias is set for this command'],
        categories: 'tool',
        info: `Perform a basic math equation (+/-/x/:) based on the string provided\n\n**Notes**\n1. You can use both symbols for multiplication (* or x) and division (: or /)\n2. It\'s also ok not to use space\n\n**Example**\`\`\`${prefix}math 3 * 3/2\`\`\``,
        usage: `${prefix}command/alias <...>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if (args.length < 0) {
            return message.channel.send("Please enter a valid argument!");
        }

        const chars = {'x' : '*', ':' : '/', ',' : '.'}; // Map the syntax
        const display = {'x' : '*', ':' : '/',  ',' : '.', '_' : ''}; // For display purpose, no difference actually, could just move the _ to chars but ye

        try {
            var mathRes = eval(args.join(" ").replace(/[x:,]/g, m => chars[m]));

            var problem = [];
            for (var i = 0; i < args.length; i++) {
                problem[i] = commaNumber(args[i].replace(/[x:_]/g, m => display[m]), '.', ',');
            }

            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .addField(`Problem`, `${problem.join(" ")}`, false)
            .addField(`Solution`, `${commaNumber(mathRes, '.', ',')}`, false)
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