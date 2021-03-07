const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const malScraper = require('mal-scraper');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = class extends Command {
    constructor() {
        super('animemal', {
            categories: "anime",
            aliases: ["am"],
            info: "Get information of any anime from [myanimelist.net](https://myanimelist.net/) using [mal-scraper](https://www.npmjs.com/package/mal-scraper)",
            usage: `${prefix}command/alias <title>`,
            guildOnly: false,
        });
    }

    async run(message, args) {
        //checking args
        if (!args[0]) {
            return message.channel.send("Please input the correct anime!");

        }
        const msg = await message.channel.send(`Searching for \`${args.join(" ")}\`...`);

        //main part
        var name = args.join(" ");
        malScraper.getInfoFromName(name)
            .then((data) => {
                if (!data) {
                    return message.channel.send(`No results found for **${name}**!`);
                }

                var showType; // Showtype
                if (data.type) {
                    showType = data.type;
                } else {
                    showType = "-";
                }

                var jpName; // Japanesename
                if (data.japaneseTitle) {
                    jpName = `${data.japaneseTitle} (${data.title})`
                } else {
                    jpName = `${data.title}`
                }

                var synon; // Synonym
                if (data.synonyms[0] == ""){
                    synon = "-";
                } else {
                    synon = data.synonyms.join(", ");
                }

                var pv; // PV
                if (data.trailer) {
                    pv = `•\u2000\[Click Here!](${data.trailer})`;
                } else {
                    pv = "No PV Available";
                }

                // For Staff and Characters 
                var animeStaff = [];
                var animeChar = [];

                if(data.characters == "" && data.staff == "") { // No Staff No Char
                  animeStaff[0] = `No staff for this anime have been added to this title.`;
                  animeChar[0] = `No characters or voice actors have been added to this title.`;
                } else
                if((data.characters[0].name == data.staff[0].name) && (data.staff[0].role == "Main" || data.staff[0].role == "Supporting")){ // No Staff
                  animeStaff[0] = `No staff for this anime have been added to this title.`;
                } else
                if((data.characters[0].name == data.staff[0].name) && (data.characters[0].role == "Director" || data.characters[0].role == "Original Creator" || data.characters[0].role == "Producer" || data.characters[0].role == "Music" || data.characters[0].role == "Sound Director" || data.characters[0].role == "Series Composition")){ // No Character
                  animeChar[0] = `No characters or voice actors have been added to this title.`;
                } else 
                if(data.characters !== "" && data.staff !== ""){
                  for (var i = 0; i < data.staff.length; i++){
                    if(!data.staff[i].role){
                      data.staff[i].role = `-`;
                    } else {
                      animeStaff[i] = `- ${data.staff[i].name} - ${data.staff[i].role}`;
                    }
                  }
  
                  for (var i = 0; i < data.characters.length; i++){
                    if (!data.characters[i].seiyuu.name) {
                      data.characters[i].seiyuu.name = "-";
                    }
                    animeChar[i] = `- ${data.characters[i].name} (${data.characters[i].role}) Voiced by ${data.characters[i].seiyuu.name}`
                  }
                }

                if (animeStaff == ""){ // If no animechar, animestaff will be empty
                  for (var i = 0; i < data.staff.length; i++){
                    if(!data.staff[i].role){
                      data.staff[i].role = `-`;
                    } else {
                      animeStaff[i] = `- ${data.staff[i].name} - ${data.staff[i].role}`;
                    }
                  }
                }

                if (animeChar == ""){ // If no animestaff, animechar will be empty
                  for (var i = 0; i < data.characters.length; i++){
                    if (!data.characters[i].seiyuu.name) {
                      data.characters[i].seiyuu.name = "-";
                    }
                    animeChar[i] = `- ${data.characters[i].name} (${data.characters[i].role}) Voiced by ${data.characters[i].seiyuu.name}`
                  }
                }
                // console.log(animeStaff); console.log(animeChar);
                msg.edit(`**Anime Found!**`);

                let embed = new MessageEmbed()
                .setColor('2E51A2')
                .setAuthor(`${data.englishTitle ? data.englishTitle : data.title } | ${showType}`, data.picture, data.url)
                .setDescription(data.synopsis)
                .addField('Japanese Name', `${jpName}`, false)
                .addField('Synonyms', `${synon}`, false)
                .addField(`Genres`, `${data.genres.join(", ")}`, false)
                .addField(`Age Rating`, `${data.rating}`, true)
                .addField(`Source`, ` ${data.source}`, true)
                .addField(`Status`, `${data.status}`, true)
                .addField(`User Count/Favorite`, `${data.members}/${data.favorites}`, true)
                .addField(`Average Score`, `${data.score} (${data.scoreStats})`, true)
                .addField(`Rating Rank/Popularity Rank`, `${data.ranked}/${data.popularity}`, true)
                .addField(`Episodes/Duration`, `${data.episodes}/${data.duration}`, true)
                .addField(`Broadcast Date`, `${data.aired}`, true)
                .addField(`Studios`, `${data.studios.join(", ")}`, true)
                .addField(`Producers`, `${data.producers.join(", ")}`, true)
                .addField(`Staff`, `${animeStaff.join("\n")}`, false)
                .addField(`Characters`, `${animeChar.join("\n")}`, false)
                .addFields({
                  name: "❯\u2000\Search Online",
                  value: `•\u2000\[Gogoanime](https://gogoanime.sh//search.html?keyword=${data.title.replace(/ /g, "%20")})\n•\u2000\[4Anime](https://4anime.to/?s=${data.title.replace(/ /g, "%20")})\n•\u2000\[9Anime](https://9anime.ru/search?keyword=${data.title.replace(/ /g, "%20")})`,
                  inline: true
                }, {
                  name: "❯\u2000\PV",
                  value: `${pv}`,
                  inline: true
                }, {
                    name: "❯\u2000\MAL Link",
                    value: `•\u2000\[Click Title or Here](${data.url})\n`,
                    inline: true
                })
                .setFooter(`Data Fetched From Myanimelist.net`)
                .setTimestamp()
                .setThumbnail(data.picture, 100, 200);
                
                // getIMG(data.title).then(function(imgGet) { New things learned, if you send this one, this will be the new embed
                //   return message.channel.send(embed.setImage(imgGet.IMG));  //Only problem is that the db of kitsu and mal is different so chances are that the image sent could be wrong
                // })
                
                return message.channel.send({embed})
            })
            .catch((err) => {
                console.log(err) //cathing error no need to console log
                return message.channel.send(`No results found for **${name}**!`);
            });

        function getIMG(title){
          return kitsu.searchAnime(title)
            .then((result) => {
              if(result[0].coverImage.original){
                return {
                  IMG: result[0].coverImage.original
                };
              } else {
                return {
                  IMG: ""
                };
              }
            }).catch((err) => {
                console.log(err)
        
                return null;
            })
        }
    }
}

/*
{
  title: 'Wonder Egg Priority',
  synopsis: 'Following the suicide of her best and only friend, Koito Nagase, Ai Ooto is left grappling with her new reality. With nothing left to live for, she follows the instructions of a mysterious entity and gets roped into purchasing an egg, or specifically, a Wonder Egg.\n' +
    '\n' +
    "Upon breaking the egg in a world that materializes during her sleep, Ai is tasked with saving people from the adversities that come their way. In doing so, she believes that she has moved one step closer to saving her best friend. With this dangerous yet tempting opportunity in the palms of her hands, Ai enters a place where she must recognize the relationship between 
other people's demons and her own.\n" +
    '\n' +
    'As past trauma, unforgettable regrets, and innate fears hatch in the bizarre world of Wonder Egg Priority, a young girl discovers the different inner struggles tormenting humankind and rescues them from their worst fears.\n' +
    '\n' +
    '[Written by MAL Rewrite]',
  picture: 'https://cdn.myanimelist.net/images/anime/1079/110751.jpg',
  characters: [
    {
      link: 'https://myanimelist.net/character/190157/Ai_Ooto',
      picture: 'https://cdn.myanimelist.net/images/characters/10/431621.jpg',
      name: 'Ooto, Ai',
      role: 'Main',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/189258/Neiru_Aonuma',
      picture: 'https://cdn.myanimelist.net/images/characters/6/428411.jpg',
      name: 'Aonuma, Neiru',
      role: 'Main',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/190701/Rika_Kawai',
      picture: 'https://cdn.myanimelist.net/images/characters/13/428412.jpg',
      name: 'Kawai, Rika',
      role: 'Main',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/190742/Momoe_Sawaki',
      picture: 'https://cdn.myanimelist.net/images/characters/3/428413.jpg',
      name: 'Sawaki, Momoe',
      role: 'Main',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/191618/Koito_Nagase',
      picture: 'https://cdn.myanimelist.net/images/characters/12/430337.jpg',
      name: 'Nagase, Koito',
      role: 'Supporting',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/192165/Ura-Acca',
      picture: 'https://cdn.myanimelist.net/images/questionmark_23.jpg',
      name: 'Ura-Acca',
      role: 'Supporting',
      seiyuu: [Object]
    },
    {
      link: 'https://myanimelist.net/character/192131/Acca',
      picture: 'https://cdn.myanimelist.net/images/characters/12/431556.jpg',
      name: 'Acca',
      role: 'Supporting',
      seiyuu: [Object]
    }
  ],
  staff: [
    {
      link: 'https://myanimelist.net/people/48699/Shin_Wakabayashi',
      picture: 'https://cdn.myanimelist.net/images/questionmark_23.jpg',
      name: 'Wakabayashi, Shin',
      role: 'Director'
    },
    {
      link: 'https://myanimelist.net/people/35673/Akiko_Fujita',
      picture: 'https://cdn.myanimelist.net/images/questionmark_23.jpg',
      name: 'Fujita, Akiko',
      role: 'Sound Director'
    },
    {
      link: 'https://myanimelist.net/people/24433/Shinji_Nojima',
      picture: 'https://cdn.myanimelist.net/images/questionmark_23.jpg',
      name: 'Nojima, Shinji',
      role: 'Script, Original Creator'
    },
    {
      link: 'https://myanimelist.net/people/39550/Shuka_Saitou',
      picture: 'https://cdn.myanimelist.net/images/voiceactors/1/44533.jpg',
      name: 'Saitou, Shuka',
      role: 'Theme Song Performance'
    }
  ],
  englishTitle: '',
  japaneseTitle: 'ワンダーエッグ・プライオリティ',
  synonyms: [ '' ],
  episodes: '12',
  aired: 'Jan 13, 2021 to ?',
  broadcast: 'Wednesdays at 01:29 (JST)',
  producers: [ 'Aniplex', 'D.N. Dream Partners' ],
  source: 'Original',
  duration: '23 min. per ep.',
  status: 'Currently Airing',
  genres: [ 'Psychological', 'Drama', 'Fantasy' ],
  scoreStats: 'scored by 21,809 users',
  ranked: '#245',
  popularity: '#1071',
  members: '138,963',
  favorites: '1,434',
  id: 43299,
  url: 'https://myanimelist.net/anime/43299/Wonder_Egg_Priority'
}
*/