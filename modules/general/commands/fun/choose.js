const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { MessageEmbed } = require('discord.js');
const { forEach } = require('all-the-cities');

module.exports = class extends Command {
    constructor() {
        super('choose', {
            categories: "fun",
            aliases: ["No alias is set for this command"],
            info: "Help the bot choose for you.",
            usage: `${prefix}choose [[option 1]] [[option 2]] ... [[option x]]\`\`\`**Or**\`\`\`css\n${prefix}choose [arguments] [[option 1]] [[option 2]] ... [[option x]]\`\`\`\`\`\`-> Notice the []`,
            guildOnly: false,
        });
    }

    async run(message, args) {
        // var regex = /(["])(?:(?=(\\?))\2.)*?\1/g; 

        var regex = /\[(.*?)\]/g;

        var options = args.toString().match(regex);

        if (!options){
            let embed = new MessageEmbed()
            .setDescription(`Please enter the correct argument example should be like this :arrow_down:\`\`\`css\n${prefix}choose [eat] [sleep] [study]\`\`\`For more info use the help commands.`)
            
            return message.channel.send(embed);
        }

        for (var i = 0; i < options.length; i++){
            options[i] = options[i].replace(/,/g, " ");
        }
        
        var withArgs = args.join(" ").replace(options.join(" "), "");

        // console.log(options.length);
        var x = Math.floor(Math.random() * options.length);
        var y = Math.floor(Math.random() * responses.length);

        if (!withArgs[0]){
            return message.channel.send(`${randomResponses(y)} ${options[x].replace(/[\[\]]/g, "\"")} **${message.author.username}**`);
        } else {
            return message.channel.send(`${withArgs}${options[x].replace(/[\[\]]/g, "")}`);
        }        
    }
}

const responses = [
    'If my intuition is correct, you should choose',
    'You should choose',
    'I would say',
    'You should choose',
    'Based on the RNG that i got, you should choose',
    'The RNGOD say that you should choose',
    'It\'s that, go for',
    'The answer would be --->',
    'Go for'
  ]
  
function randomResponses(x){
    return (responses[x]);
}