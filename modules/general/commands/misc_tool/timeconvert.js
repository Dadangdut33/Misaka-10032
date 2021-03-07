const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const Moment = require('moment-timezone');

module.exports = class extends Command {
    constructor() {
      super('timeconvert', {
        aliases: ["tz", "timec"],
        categories: 'tool',
        info: 'Convert timezone GMT (+/-)',
        usage: `${prefix}command/alias <+/-> <from tz> <+/-> <to tz>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if (args[1] > 13 || args[1] < -12 || args[3] > 13 || args[3] < -12){
            let embed = new MessageEmbed()
            .setTitle(`Invalid timezone provided`)
            .setDescription(`The valid timezone are range from -12 to +13, that is the rule of physics`)
            .setTimestamp();

            message.channel.send(embed);
        } else
        if ((args[0] !== "+" && args[0] !== "-") || (args[2]  !== "+" && args[2]  !== "-")){
            let embed = new MessageEmbed()
            .setTitle(`Please enter the correct arguments`)
            .setDescription(`For more info you can check on the help commands. Arguments used should be like this ex :arrow_down:\`\`\`css\n${prefix}tz + 7 - 7\`\`\``)
            .setTimestamp();

            message.channel.send(embed);
        } else {
            if(isNaN(args[1]) || isNaN(args[3])){
                let embed = new MessageEmbed()
                .setDescription(`Invalid number Provided!`)

                return message.channel.send(embed)
            }

            let timezoneFrom, timezoneTo;
            let tz1, tz2;
            //From
            if (args[0] == "+"){
                timezoneFrom = `-${args[1]}`;
                tz1 = `+${args[1]}`;
            } else
            if (args[0] == "-"){
                timezoneFrom = `+${args[1]}`;
                tz1 = `-${args[1]}`;
            }

            //To
            if (args[2] == "+"){
                timezoneTo = `-${args[3]}`;
                tz2 = `+${args[3]}`;
            } else
            if (args[2] == "-"){
                timezoneTo = `+${args[3]}`;
                tz2 = `-${args[3]}`;
            }
            var dateFrom = Moment.tz(`Etc/GMT${timezoneFrom}`).format('dddd DD MMMM YYYY HH:mm:ss')
            var dateTo = Moment.tz(`Etc/GMT${timezoneTo}`).format('dddd DD MMMM YYYY HH:mm:ss')
            var diff = timezoneFrom - timezoneTo;

            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setTitle(`Conversion of GMT${tz1} to GMT${tz2}`)
            .setDescription(`The difference between the two is \`${diff} Hours\``)
            .addField(`GMT${tz1}`, dateFrom)
            .addField(`GMT${tz2}`, dateTo)
            .setFooter(`Current Local Time ->`)
            .setTimestamp();
        
            message.channel.send(embed);
        }
    }
};