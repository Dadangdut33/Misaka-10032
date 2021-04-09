const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { randomPuppy } = require('../../../../local_dependencies/functions');

module.exports = class extends Command {
    constructor(){ 
        super('animeme', {
        categories: "fun",
        aliases: ["No alias is set for this command"],
        info: "Sends a funny anime meme from reddit",
        usage: `${prefix}animeme`,
        guildOnly: false,
        });
    }
    async run (message, args) {
        const msg = await message.channel.send(`Loading...`);

        const subReddits = ["goodanimemes", "HistoryAnimemes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random).catch(e => {
            console.log(e)
            msg.edit(`Can't reached the subreddit, please try again`)
            return;
        });
        
        if(!img){
            msg.edit(`Can't reached the subreddit, please try again`)
            return;
        };

        msg.delete();
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(`Requested by ${message.author.username}`);

        return message.channel.send(embed);
    }
}