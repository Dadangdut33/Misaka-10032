const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const malScraper = require('mal-scraper')
const { promptMessage } = require('../../../../local_dependencies/functions.js');
const chooseArr = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

module.exports = class extends Command {
  constructor() {
    super('mangamal', {
      categories: "manga",
      aliases: ["mm"],
      info: "Get information of any manga from [myanimelist.net](https://myanimelist.net/) using [mal-scraper](https://www.npmjs.com/package/mal-scraper)",
      usage: `${prefix}command/alias <title>`,
      guildOnly: false,
    });
  }
  async run(message, args) {
    //checking args`
    if (!args[0]) {
      return message.channel.send("Please input the correct manga!");

    }
    const msg = await message.channel.send(`Searching for \`${args.join(" ")}\`...`);

    //main part
    const search = malScraper.search
 
    const type = 'manga'

    var mangaToSearch = message.content.split(/\s+/g).slice(1).join(" ");
    
    search.search(type, {
        maxResults: 5, 
        term: mangaToSearch // search term
      })
      .then(async data => {
        msg.edit(`**Manga Found!**`);
        // console.log(data);

        var options = [];
        var limit = data.length;
        if(data.length >= 5){
          limit = 5
        }
  
        for (var i = 0; i < limit; i++){
          options[i] = `${i + 1}. ${data[i].title}` 
        }
  
        const embed = new MessageEmbed()
        .setColor("2E51A2")
        .setAuthor('Myanimelist.net', 'https://cdn.discordapp.com/attachments/799595012005822484/813811066110083072/MyAnimeList_Logo.png', 'https://myanimelist.net/')
        .setTitle(`Please Choose The Manga That You Are Searching For Below`)
        .setDescription(options.join("\n"))
  
        const optionsToChoose = await message.channel.send(embed); // Await the embed
        const reacted = await promptMessage(optionsToChoose, message.author, 50, chooseArr); // Await reaction
        const reaction = await getResult(reacted); // Get Result from reaction
        await optionsToChoose.reactions.removeAll();
        
        if(reaction == undefined){ // If no reaction after timeout
          msg.delete();
          embed
          .setAuthor('Search aborted!')
          .setTitle('')
          .setDescription(`Search for **${search}** aborted because of no reaction from ${message.author}!`);
  
          optionsToChoose.edit(embed);
          return;
        }
  
        if(reaction + 1 > limit){ // +1 because the original is from 0 to access the array
          msg.delete();
          embed
          .setAuthor('Invalid options chosen!')
          .setTitle('')
          .setDescription('Please choose the correct available options!');
  
          optionsToChoose.edit(embed);
          return;
        }

        var manga = data[reaction];

        var vid;
        if(manga.video == null){
          vid = `No PV available`;
        } else {
            vid = `[Click Here](${manga.video})`;
        }

        embed
          .setTitle('')
          .setColor('2E51A2')
          .setAuthor(`${manga.title} | ${manga.type}`, manga.thumbnail, manga.url)
          .setDescription(manga.shortDescription)
          .addField(`Type`, `${manga.type}`, true)
          .addField(`Volumes`, `${manga.vols}`, true)
          .addField(`Chapters`, `${manga.nbChapters}`, true)
          .addField(`Scores`, `${manga.score}`, true)
          .addField(`Start Date`, `${manga.startDate}`, true)
          .addField(`End Date`, `${manga.endDate}`, true)
          .addField(`Members`, `${manga.members}`, false)
          .addFields({
          name: "❯\u2000\Search Online",
          value: `•\u2000\[Mangadex](https://mangadex.org/search?title=${args.join("+")})\n\•\u2000\[Manganelo](https://m.manganelo.com/search/${args.join("_")})`,
          inline: true
          }, {
          name: "❯\u2000\MAL Link",
          value: `•\u2000\[Click Title or Here](${manga.url})`,
          inline: true
          }, {
              name: "❯\u2000\PV",
              value: `${vid}`,
              inline: true
          })
          .setFooter(`Data Fetched From Myanimelist.net`)
          .setTimestamp()
          .setThumbnail(manga.thumbnail);

          msg.delete();
          optionsToChoose.edit(embed);
      })
      .catch((error) => {
          console.log(error);
          return message.channel.send(`No results found for **${mangaToSearch}**!`);
    })
    // Below is the function to get the results of the reaction
    function getResult(me) { // Pass var as me
      switch (me) {
        case "1️⃣":
          return 0;
        case "2️⃣":
          return 1;
        case "3️⃣":
          return 2;
        case "4️⃣":
          return 3;
        case "5️⃣":
          return 4;
      }
    }
  }
}