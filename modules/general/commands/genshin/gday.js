const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const Moment = require('moment-timezone');
const { prefix } = require("../../../../config");
const { paginationEmbed, find_DB, capitalizeFirstLetter} = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];

module.exports = class extends Command {
  constructor(){ 
    super('gday', {
      categories: "genshin",
      aliases: ["day", "d"],
      info: "Gives information about material that can be obtained on a certain day in Genshin Impact, special thanks to Adam for providing the weapon name",
      usage: `${prefix}day <name> or ${prefix}alias <name> or you could just type today to see today's farm`,
      guildOnly: true,
    });
  }

  async run (message, args){
    let date = Moment.tz('Asia/Jakarta');
    var pages = [];

    if (!args[0]){
      return message.channel.send(info());
    }

    switch(args.join(" ").toLowerCase()){
      case "sunday":
      case "sun":
      case "minggu":
      case "7":
          message.channel.send(sunday())
          break;

      case "today":
        let today = date.isoWeekday();
        if(today == 7){
          return message.channel.send(sunday());
        }

        find_DB('g_Char', { farm_Index: today.toString()}, function (err, docs) {
          if(!docs[0]){
            return message.channel.send(info());
          } else {
            pages.push(dataCharsToEmbed(docs));
          }});
    

        find_DB('g_Weapon', { farm_Index: today.toString()}, function (err, docs) {
          if(docs[0]){
            pages.push(dataWeaponsToEmbed(docs));
  
            paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
          }
        });
        
        break;

      default:
        find_DB('g_Char', { farm_Index: `${capitalizeFirstLetter(args.join(" "))}`}, function (err, docs) {
          if(!docs[0]){
            return message.channel.send(info());
          } else {
            pages.push(dataCharsToEmbed(docs));
          }});
    
        find_DB('g_Weapon', { farm_Index: `${capitalizeFirstLetter(args.join(" "))}`}, function (err, docs) {
          if(docs[0]){
            pages.push(dataWeaponsToEmbed(docs));
  
            paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
          }
        });
        
        break;
    }

    function info(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Please enter a valid day!")
      .setDescription("Day provided can be day name in english, it's abbreviations, number 1-7 (Monday start on 1), and also day name in Indonesia.\n\nYou can also type \`today\` to see today's farm and all to see the farm details on every day")
      .setFooter(message.guild.me.displayName)
      .setTimestamp();
      
      return embed;
    }
    
    function dataCharsToEmbed(data) {
      var forsaken_Rift = Array.from(data)
        .filter(filtered => filtered.domain == "Forsaken Rift")
        .map(get => `\`${get.name[0]}\``);

      var farm_Type_1 = Array.from(data)
        .filter(filtered => filtered.domain == "Forsaken Rift")
        .map(get => get.book);

      var taishan_Mansion = Array.from(data)
        .filter(filtered => filtered.domain == "Taishan Mansion")
        .map(get => `\`${get.name[0]}\``);

      var farm_Type_2 = Array.from(data)
        .filter(filtered => filtered.domain == "Taishan Mansion")
        .map(get => get.book);

      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setTitle(`\`${data[0].fields.farmDay}\` Farm Guide`)
      .setDescription("Below are list of characters or weapons that can get materials on the specified days")
      .addField(`❯\u2000\Forsaken Rift (${farm_Type_1[0]}) [${forsaken_Rift.length}]:`, forsaken_Rift.join(`, `), false)
      .addField(`❯\u2000\Taishan Mansion (${farm_Type_2[0]}) [${taishan_Mansion.length}]:`, taishan_Mansion.join(`, `), false)
      .addField(`❯\u2000\Search on Wiki`, `• [${farm_Type_1[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_1[0]})\n• [${farm_Type_2[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_2[0]})`)
      .setTimestamp();
      
      return embed;
    }

    function dataWeaponsToEmbed(data) {
      var cecilia_Garden = Array.from(data)
        .filter(filtered => filtered.domain == "Cecilia Garden");

      var farm_Type_1 = Array.from(data)
        .filter(filtered => filtered.domain == "Cecilia Garden")
        .map(get => get.farm_Get);

      var hidden_Palace = Array.from(data)
        .filter(filtered => filtered.domain == "Hidden Palace of Lianshan Formula");

      var farm_Type_2 = Array.from(data)
        .filter(filtered => filtered.domain == "Hidden Palace of Lianshan Formula")
        .map(get => get.farm_Get);

      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setTitle(`\`${data[0].farm_Day}\` Farm Guide`)
      .setDescription("Below are list of characters or weapons that can get materials on the specified days")
      .addField(`❯\u2000\Cecilia Garden (${farm_Type_1[0]}) [${cecilia_Garden[0].weapons.length}]:`, cecilia_Garden[0].weapons.map(x => `\`${x}\``).join(", "), false)
      .addField(`❯\u2000\Hidden Palace of Lianshan Formula (${farm_Type_2[0]}) [${hidden_Palace[0].weapons.length}]:`, hidden_Palace[0].weapons.map(x => `\`${x}\``).join(", "), false)
      .addField(`❯\u2000\Search on Wiki`, `• [${farm_Type_1[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_1[0].replace(/\s/g, "+")})\n• [${farm_Type_2[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_2[0].replace(/\s/g, "+")})`)
      .setTimestamp();

      return embed;
    }

    function sunday(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setTitle("Sunday Farm Guide")
      .setDescription("You can farm for every material on sunday!")
      .setTimestamp();
      
      return embed;
    }
  }
}

