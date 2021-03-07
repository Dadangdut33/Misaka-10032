const { MessageEmbed } = require("discord.js");
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
const fetch = require("node-fetch")
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { promptMessage } = require('../../../../local_dependencies/functions.js');
const chooseArr = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

module.exports = class extends Command {
  constructor() {
    super('mangakitsu', {
      categories: "anime",
      aliases: ["mk"],
      info: "Get information of any manga from [kitsu.io](https://kitsu.io/explore/manga)",
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
    var search = message.content.split(/\s+/g).slice(1).join(" ");
    kitsu.searchManga(search).then(async result => {
      if (result.length === 0) {
        return message.channel.send(`No results found for **${search}**!`);
      }
      msg.edit(`**Manga Found!**`);

      var options = [];
      var limit = result.length;
      if(result.length >= 5){
        limit = 5
      }

      for (var i = 0; i < limit; i++){
        options[i] = `${i + 1}. ${result[i].titles ? `${result[i].titles.english ? result[i].titles.english : result[i].slug}` : result[i].slug}` 
      }

      const embed = new MessageEmbed()
      .setColor("F75136")
      .setAuthor('Kitsu.io', 'https://media.discordapp.net/attachments/799595012005822484/813793894163546162/kitsu.png', 'https://kitsu.io/')
      .setTitle(`Please Choose The Manga That You Are Searching For Below`)
      .setDescription(options.join("\n"))

      const optionsToChoose = await message.channel.send(embed); // Await the embed
      const reacted = await promptMessage(optionsToChoose, message.author, 5, chooseArr); // Await reaction
      const reaction = await getResult(reacted); // Get Result from reaction
      await optionsToChoose.reactions.removeAll();

      if(reaction == undefined){ // If no reaction after timeout
        msg.delete();
        optionsToChoose.delete();
        return message.channel.send(`Search for **${search}** Aborted because of no reaction from ${message.author}!`);
      }

      if(reaction + 1 > limit){ // +1 because the original is from 0 to access the array
        msg.delete();
        optionsToChoose.delete();
        return message.channel.send(`Invalid options chosen! Please choose the correct available options!`);
      }

      var manga = result[reaction]
      

      var synon = [];
      if(manga.titles.abbreviated == "") {
        synon[0] = "-"
      } else {
        synon = manga.titles.abbreviated;
        for (var i = 0; i < synon.length; i++){
          synon[i] = synon[i].replace(/[\r\n]/g, "");
        }
      }

      // Edit the embed
      embed
        .setTitle('')
        .setColor('F75136')
        .setAuthor(`${manga.titles.english ? manga.titles.english : capitalizeTheFirstLetterOfEachWord(search)} | ${manga.mangaType}`, manga.posterImage.original, `https://kitsu.io/manga/${manga.id}`)
        .setDescription(manga.synopsis)
        .addField(`Japanese Name`, `${manga.titles.romaji ? `${manga.titles.romaji} (${manga.titles.japanese})` : "-"}`, false)
        .addField(`Synonyms`, `${synon.join(", ")}`, false)
        .addField(`Type/Rating`, `${manga.subType}/${manga.ageRating ? manga.ageRating : 'N/A'}`, true)
        .addField(`Serialization`, `${manga.serialization ? manga.serialization : "-"}`, true)
        .addField(`User Count/Favorite`, `${manga.userCount}/${manga.favoritesCount}`, true)
        .addField(`Average Rating`, `${manga.averageRating ? manga.averageRating : "N/A"}`, true)
        .addField(`Rating Rank`, `${manga.ratingRank ? manga.ratingRank : "N/A"}`, true)
        .addField(`Popularity Rank`, `${manga.popularityRank ? manga.popularityRank : "N/A"}`, true)
        .addField(`Volume/Chapter`, `${manga.volumeCount ? manga.volumeCount : 'N/A'}/${manga.chapterCount ? manga.chapterCount : 'N/A'}`, true)
        .addField(`Start Date`, `${manga.startDate ? manga.startDate : "N/A"}`, true)
        .addField(`End Date`, `${manga.endDate ? manga.endDate : "Still ongoing"}`, true)
        .addFields({
          name: "❯\u2000\Search Online",
          value: `•\u2000\[Mangadex](https://mangadex.org/search?title=${args.join('+')})\n\•\u2000\[Manganelo](https://m.manganelo.com/search/${args.join('_')})`,
          inline: true
        }, {
          name: "❯\u2000\Find on MAL",
          value: `•\u2000\[MyAnimeList](https://myanimelist.net/manga.php?q=${args.join('+')})`,
          inline: true
        })
        .addField(`❯\u2000\Kitsu Link`, `[Click Title or Here](https://kitsu.io/manga/${manga.id})`, true)
        .setFooter(`Data Fetched From Kitsu.io`)
        .setTimestamp()
        .setImage(manga.coverImage ? manga.coverImage.original : "")
        .setThumbnail(manga.posterImage.original, 100, 200);

      msg.delete();
      optionsToChoose.edit(embed);
    }).catch(err => {
      console.log(err) //cathing error
      return message.channel.send(`No results found for **${search}**!`);
    });

    function capitalizeTheFirstLetterOfEachWord(words) {
      var separateWord = words.toLowerCase().split(' ');
      for (var i = 0; i < separateWord.length; i++) {
         separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
         separateWord[i].substring(1);
      }
      return separateWord.join(' ');
    }

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