const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
    constructor(){ 
    super('meme', {
      categories: "fun",
      aliases: ["No alias is set for this command"],
      info: "Sends an epic meme from reddit",
      usage: `${prefix}meme"`,
      guildOnly: false,
    });
}
    async run (message, args) {
        const msg = await message.channel.send(`Loading...`);
        const subReddits = ["dankmeme", "dankmemes", "memes", "meme", "me_irl", "HistoryMemes"];
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

const axios = require('axios')

const randomPuppy = async (random) => {
    //Perform a GET request
    const { data } = await axios.get(`https://www.reddit.com/r/${random}.json?limit=150`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const { children } = data.data

    //Filter posts from those with no images
    const results = await Promise.allSettled(children.map(element => {
        const { url_overridden_by_dest } = element.data

        //Some posts doesn't include any image links
        if (url_overridden_by_dest != null || url_overridden_by_dest != undefined) {
            //Filter out empty links and those linked to a gallery
            if (url_overridden_by_dest.length > 0 && !url_overridden_by_dest.includes('gallery') && url_overridden_by_dest.includes('redd') && url_overridden_by_dest.includes('png')) {
                return url_overridden_by_dest
            }
        }
    }))

    //You can read more on Promises, we need an array from the results promise
    const images = []
    const failed = []

    for (const result of results) {
        if (result.status === 'rejected') {
            failed.push(result.reason)
            continue
        }
        if (result.value) {
            images.push(result.value)
        }
    }

    //Random image from the images links array
    const image = images[Math.floor(Math.random() * images.length)]

    return image
}