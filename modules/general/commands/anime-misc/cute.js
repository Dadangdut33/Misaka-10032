const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { randomPuppy } = require('../../../../local_dependencies/functions');

module.exports = class extends Command {
    constructor(){ 
        super('cute', {
        categories: "anime-misc",
        aliases: ["No alias is set for this command"],
        info: "Sends cute anime girls from reddit",
        usage: `${prefix}cute`,
        guildOnly: false,
        });
    }
    async run (message, args) {
        const msg = await message.channel.send(`Loading...`);

        const subReddits = ["kemonomimi", "Joshi_Kosei", "gao", "Lolification", "animeponytails", "cutelittlefangs", "animewallpaper", "fantasymoe", "streetmoe"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        // console.log(random);

        const img = await randomPuppy(random).catch(e => {
            msg.edit(`Can't reached the subreddit, please try again`)
            return;
        });
        
        if(!img){
            msg.edit(`Can't reached the subreddit, please try again`)
            return;
        }

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