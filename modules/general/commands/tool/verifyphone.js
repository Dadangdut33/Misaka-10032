const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const axios = require('axios');

module.exports = class extends Command {
    constructor() {
      super('verifyphone', {
        aliases: ['validatephone', 'phonecheck'],
        categories: 'tool',
        info: 'Validate/verify a phone number. Command possible by using [Abstract API](https://www.abstractapi.com/)',
        usage: `${prefix}command <phone number with countrycode as the 0>`,
        guildOnly: true,
      });
    }
  
    async run(message, args) {
        if(args[0]){
            axios.get(`https://phonevalidation.abstractapi.com/v1?api_key=${process.env.validatePhone}&phone=${args[0]}`)
            .then(response => {
                let data = response.data;
                let embed = new MessageEmbed()
                .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'jpg', size: 2048}))
                .setDescription(`**Number:** \`${data.phone}\`\n**Valid:** \`${data.valid}\`\nType: ${data.type}`)
                .addField(`Number Format`, `International: \`${data.format.international}\`\nLocal: \`${data.format.local}\``)
                .addField(`Country`, `Code: ${data.country.code}\nName: ${data.country.name}`, true)
                .addField(`Carrier`, `${data.carrier}`, true)
                .addField(`Check again`, `If the phone number is invalid it's because you put an invalid country code as the prefix of the number`);

                return message.channel.send(embed);
            })
            .catch(error => {
                console.log(error);
                const embed = new MessageEmbed()
                .setTitle(`An Error Occured!`)
                .setDescription(`${error}`);
    
                return message.channel.send(embed);
            });
        } else {
            const embed = new MessageEmbed()
            .setTitle('Invalid Arguments Provided')
            .setDescription(`Please enter a correct arguments. If unsure, check using \`help\` commands`)

            return message.channel.send(embed);
        }
    }
};