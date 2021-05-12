const { DiscordAPIError, MessageEmbed } = require("discord.js");
const axios = require('axios');
const mongoose = require('mongoose');

module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    find_DB: function(name, query, cb) {
        mongoose.connection.db.collection(name, function (err, collection) {
           collection.find(query).toArray(cb);
       });
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    hasNumber: function (myString) {
        return /\d/.test(myString);
    },

    reverseString: function (str) {
        return str.split("").reverse().join("");
    },

    randomPuppy: async function (random) {
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
    },

    // Paginator scrapped from https://github.com/saanuregh/discord.js-pagination. Modified by me personally
    paginationEmbed: async function(msg, pages, emojiList = ['⏪', '⏩', '❌'], timeout = 120000) {
        try { // Try
            if (!msg && !msg.channel) throw new Error('Channel is inaccessible.');
            if (!pages) throw new Error('Pages are not given.');
            if (emojiList.length !== 3 || emojiList === false) emojiList = ['⏪', '⏩', '❌'];
            let page = 0;
            const curPage = await msg.channel.send(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
            for (const emoji of emojiList) await curPage.react(emoji);
            const reactionCollector = curPage.createReactionCollector(
                (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot && user.id === msg.author.id,
                { time: timeout }
            );
            reactionCollector.on('collect', reaction => {
                reaction.users.remove(msg.author);
                switch (reaction.emoji.name) {
                    case emojiList[0]:
                        page = page > 0 ? --page : pages.length - 1;
                        break;
                    case emojiList[1]:
                        page = page + 1 < pages.length ? ++page : 0;
                        break;
                    case emojiList[2]:
                        curPage.reactions.removeAll(); // Remove Reaction

                        pages[page] // Edit Current page make all empty
                        .setAuthor(``, ``, ``) // Author, icon, links
                        .setTitle(`Embed Viewing Closed by Message Author`) // Title
                        .setDescription(`❌ ${msg.author} Closed the embed`) // Desc
                        .setURL(``) // Title URL
                        .setFooter(``, ``) // Footer, icon
                        .setImage(``) // Image
                        .setTimestamp(``) // Timestamp
                        .setThumbnail(``) // Thumbnail
                        .fields = []; // Field 
                        

                        curPage.edit(pages[page]); // Edit it

                        return // So it end there, no error
                        break;
                    default:
                        break;
                }
                curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
            });
            reactionCollector.on('end', () => {
                if (!curPage.deleted) { // If curpage is still there
                    if (pages[page].footer.text !== '') { // If it's not closed by author
                        curPage.reactions.removeAll()

                        pages[page]
                        .setFooter(`Page ${page + 1} / ${pages.length} | Pages switching removed due to timeout`);
        
                        curPage.edit(pages[page]);
                    }
                }
            });
            return curPage;
        } 
        catch (e) { // Catch error
            if(e instanceof DiscordAPIError) {
                let embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Data is too long to be returned as embed!`)
                .addField(`Details`, e)
                .setColor('00000')
                
                msg.channel.send(embed);
                throw (`${e}`);
            } else {
                let embed = new MessageEmbed()
                .setTitle('ERROR')
                .setDescription(e)
                .setColor('00000')
    
                msg.channel.send(embed);
                throw (`${e}`);
            }
        }
    }
};