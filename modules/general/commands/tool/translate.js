const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const axios = require('axios');

module.exports = class extends Command {
    constructor() {
      super('translate', {
        aliases: ['tl'],
        categories: 'tool',
        info: 'Translate inputted text to english. The translation is bad, you shouldn\'t use it unless you have to. Why is it bad? you may ask... Well it\'s because money is needed to get a good translation API, but as you can guess I have neither the desire nor money to spend on things like this cause it\'s just a hobby.\nThis command uses [This](https://english.api.rakuten.net/systran/api/systran-io-translation-and-nlp/details) if you are interested',
        usage: `${prefix}command/alias <text to translate>\`\`\`**Notes**\`\`\`Not all language works, Japan works tho, but the translation kinda sucks`,
        guildOnly: true,
      });
    }
  
    async run(message, args) {
        if (!args[0]){
            let embed = new MessageEmbed()
            .setTitle(`Input Error`)
            .setDescription(`Please enter a correct text!`)

            return message.channel.send(embed);
        }
        const msg = await message.channel.send(`Loading...`);

        const options = {
            method: 'GET',
            url: 'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate',
            params: {source: 'auto', target: 'en', input: `${args.join(" ")}`},
            headers: {
              'x-rapidapi-key': process.env.RapidKey,
              'x-rapidapi-host': 'systran-systran-platform-for-language-processing-v1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            var percent = response.data.outputs[0].detectedLanguageConfidence * 100;
            msg.delete(); 
            
            let embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setTitle(`${response.data.outputs[0].detectedLanguage} to English`)
            .setDescription(response.data.outputs[0].output)
            .setFooter(`Auto Detection Confidence: ${percent.toFixed(2)}%`);
            
            return message.channel.send(embed);
          }).catch(function (error) {
            console.log(error);

            msg.edit(`**Loading Failed!**`);
            if(error.response.status == 500){
                let embed = new MessageEmbed()
                .setTitle(`Internal Server Error (${error.response.status})`)
                .setDescription(`Language that you want to translate is not supported or the API just does not get it cause it's bad. That's probably the reason for this error`)

                return message.channel.send(embed);
            }


            let embed = new MessageEmbed()
            .setTitle(`Error (${error.response.status})`)
            .setDescription(`Please try again later`);

            return message.channel.send(embed);
          });
    }
};