const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
var request = require('request');
const Moment = require('moment-timezone');
const { BitlyKey } = require("../../../../api.json")

module.exports = class extends Command {
    constructor() {
        super('shortlink', {
            aliases: ['shorten', 'bitly'],
            categories: 'tool',
            info: 'Shorten a link using [bitly API](https://dev.bitly.com/api-reference) The API has limits of 1000 calls per hour and 100 calls per minute [Read more](https://dev.bitly.com/docs/getting-started/rate-limits/)',
            usage: `${prefix}command/alias <link that you want to shorten>`,
            guildOnly: false,
        });
    }

    async run(message, args) {
        if (!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(`Please enter a valid url! Correct link should contain the protocol, Ex: :arrow_down:\`\`\`html\nhttps://youtube.com/\`\`\``)
            .setColor('EE6123')
            // .setTimestamp();

            return message.channel.send(embed);
        }

        // if (/^((http|https|ftp):\/\/)$/gi.test(args[0])){ //Check if it contains https or http
            // return message.channel.send("Please enter a valid url!");
        // } Deprecated cause it looks like this could be handle in the sending result section

        // Authorization
        var headers = {
            'Authorization': `Bearer ${BitlyKey}`, //Token from https://app.bitly.com/
            'Content-Type': 'application/json'
        };

        // Data to be shorten
        var dataString = `{ "long_url": "${args[0]}", "domain": "bit.ly"}`;

        // Call the API
        var options = { 
            url: 'https://api-ssl.bitly.com/v4/shorten',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        // Callback
        function callback(error, response, body) {
            // console.log(error);
            console.log(response.statusCode);
            
            if (response.statusCode == 200 || response.statusCode == 201) { //200 success 201 created
                var shorten = JSON.parse(body) // Parse data to json type so it can be stored easily

                // console.log(shorten); // Check
                message.delete();
                let embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
                .setColor('EE6123')
                .setTitle(`Shortlink Created!`)
                .addField(`Original Link`, `${args[0]}`, false)
                .addField(`Shorten Link`, `${shorten.link}`, false)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .addField("Created On", `${Moment(shorten.created_at).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700 (Western Indonesia Time)`)
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 429){ // Rate limit
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                // console.log(res); // Check

                let embed = new MessageEmbed()
                .setTitle(`RATE LIMIT REACHED STATUS CODE 429`)
                .setDescription(`Rate Limit Reached! Pls try again in a few hours`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 400){ // BAD_REQUEST
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`BAD_REQUEST STATUS CODE 400`)
                .setDescription(`Please enter a valid url! Correct link should contain the protocol, Ex: :arrow_down:\`\`\`html\nhttps://youtube.com/\`\`\``)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 403){ // FORBIDDEN
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`FORBIDDEN STATUS CODE 403`)
                .setDescription(`FORBIDDEN! (Token Problem) pls contact admin to check the problem`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 417){ // EXPECTATION_FAILED
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`EXPECTATION_FAILED STATUS CODE 417`)
                .setDescription(`EXPECTATION_FAILED! pls contact admin to check the problem`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 422){ // UNPROCESSABLE_ENTITY
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`UNPROCESSABLE_ENTITY STATUS CODE 422`)
                .setDescription(`UNPROCESSABLE_ENTITY! Pls contact admin to check the problem`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 500){ // INTERNAL_ERROR
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`INTERNAL_ERROR STATUS CODE 500`)
                .setDescription(`INTERNAL_ERROR! bit.ly is probably having some kind of problem, pls contact admin just in case`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if(response.statusCode == 503){ // TEMPORARILY_UNAVAILABLE
                var res = JSON.parse(body) // Parse data to json type so it can be stored easily

                console.log(res); // Check
                
                let embed = new MessageEmbed()
                .setTitle(`TEMPORARILY_UNAVAILABLE STATUS CODE 503`)
                .setDescription(`TEMPORARILY_UNAVAILABLE! bit.ly is down at the moment`)
                .setFooter(`bit.ly`, 'https://cdn.discordapp.com/attachments/799595012005822484/810405681278222336/On9ZnfVh.png')
                .setColor('EE6123')
                .setTimestamp();

                return message.channel.send(embed);
            } else
            if (error == null) { 
                let embed = new MessageEmbed()
                .setDescription(`Please enter a valid url! Correct link should contain the protocol, Ex: :arrow_down:\`\`\`html\nhttps://youtube.com/\`\`\``)
                .setColor('EE6123');
                // .setTimestamp();

                return message.channel.send(embed);
            }
        }

        request(options, callback); // Call the request

        function validURL(str) { //Check if it's a valid url or not
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

            return !!pattern.test(str);
        }
    }
};