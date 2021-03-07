const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const Moment = require('moment-timezone');
const { prefix } = require("../../../../config");

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
    // let today = new Date();
    let date = Moment.tz('Asia/Jakarta');
    args[0] = lowerCase();
    var imgMonThurs = 'https://cdn.discordapp.com/attachments/799595012005822484/808234443579064330/mon.gif';
    var imgTuesFri = 'https://cdn.discordapp.com/attachments/799595012005822484/808234445702037514/tues.gif';
    var imgWedSat = 'https://cdn.discordapp.com/attachments/653206818759376916/792010648439619614/wed.gif';

    if (!args[0]){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Please enter the day that you want to check!")
      .setDescription("Day provided can be day name in english or number 1-7 (Monday start on 1). You can also type today to see today's farm")
      .setFooter(message.guild.me.displayName)
      .setTimestamp();
      
      message.channel.send(embed);
    } else if(args[0] == "today"){
      let today = date.isoWeekday()
      switch(today){
        case 1: 
          monday()
          break;
        case 2:
          tuesday()
          break;
        case 3:
          wednesday()
          break;
        case 4:
          thursday()
          break;
        case 5:
          friday()
          break;
        case 6:
          saturday()
          break;
        case 7:
          sunday()
          break;
      }
    } else
    if (args[0] == "monday" || args[0] == "1"){
      monday();

    } else
    if (args[0] == "tuesday" || args[0] == "2"){
      tuesday();      

    } else
    if (args[0] == "wednesday" || args[0] == "3"){
      wednesday();

    } else
    if (args[0] == "thursday" || args[0] == "4"){
      thursday();

    } else
    if (args[0] == "friday" || args[0] == "5"){
      friday();
      
    } else
    if (args[0] == "saturday" || args[0] == "6"){
      saturday();

    } else
    if (args[0] == "sunday" || args[0] == "7"){
      sunday();
  
    } 

    function lowerCase(){
      if (!args[0]){
        return false;
      } else {
        return  args[0].toLowerCase();
      }
    }

    function monday(){
      let embed = new MessageEmbed()
      .setColor('B22222')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Monday")
      .setDescription("Below are list of things that can be farmed on Monday\n**Note:** Materials on Monday and Thursday are the same")
      .addField('❯\u2000\Talent Leveling Material:', "Freedom & Prosperity",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Decarabian & Stone From Guyun",true)
      .addField('❯\u2000\Character That Needs It:', "Barbara, Amber, Qiqi, Keqing, Klee, Childe, Diona, Sucrose, Ningguang, Xiao")
      .addField('❯\u2000\Weapon That Needs It:', "Blackcliff sword, royal sword, favonius sword, lionroar, aquila favonia, summit sharper, whiteblind, the bell, rust, stringless, blackcliff bow, viridescent, cresent pike, primodial jade, favonius, royal grimore, solar pearl, blackcliff amulet")
      .setFooter("Monday Farming guide")
      .setImage(imgMonThurs)
      .setTimestamp();
      
      message.channel.send(embed);
    }

    function tuesday(){
      let embed = new MessageEmbed()
      .setColor('7CFC00')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Tuesday")
      .setDescription("Below are list of things that can be farmed on Tuesday\n**Note:** Materials on Tuesday and Friday are the same")
      .addField('❯\u2000\Talent Leveling Material:', "Resistance & Diligence",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Mist veiled elixir & Boreal Wolf Tooth",true)
      .addField('❯\u2000\Character That Needs It:', "Noelle, Xiangling, Jean, Diluc, Mona, Razor, Bennet, Chongyun, Ganyu")
      .addField('❯\u2000\Weapon That Needs It:', "Prototype rancour, dragons bane, sword of descension, the flute, black sword, skyward blade, sacrificial greatsword, the rainslasher, blackcliff slasher, skyward pride, the unforged, prototype cresent, royal bow, sacrificial bow, skyward harp, blackcliff pole, deathmach, royal spear, the widsith, protype malice, eye of perception, skyward atlas, primodial jade cutter")
      .setFooter("Tuesday Farming guide")
      .setImage(imgTuesFri)
      .setTimestamp();
      
      message.channel.send(embed);
    }

    function wednesday(){
      let embed = new MessageEmbed()
      .setColor('00BFFF')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Wednesday")
      .setDescription("Below are list of things that can be farmed on Wednesday\n**Note:** Materials on Wednesday and Saturday are the same")
      .addField('❯\u2000\Talent Leveling Material:', "Ballad & Gold",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Dandelion Gladiator & Aerosiderite",true)
      .addField('❯\u2000\Character That Needs It:', "Lisa, Kaeya, Venti, Zhongli, Albedo, Fischl, Xingqiu, Xinyan, Beidou")
      .addField('❯\u2000\Weapon That Needs It:', "Sacrificial sword, iron sting, prototype archaic, royal great sword, favonius greatsword, serpent spine, Wolf’s Gravestone, favonius warbow, compound bow, amos bow, prototype grudge, favonius lance, skyward spine, vortex vanquisher, sacrificial fragment, mappa marre, lost prayer to the sacred winds, memory of dust")
      .setFooter("Wednesday Farming guide")
      .setImage(imgWedSat)
      .setTimestamp();
      
      message.channel.send(embed);
    }

    function thursday(){
      let embed = new MessageEmbed()
      .setColor('B22222')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Thursday")
      .setDescription("Below are list of things that can be farmed on Thursday\n**Note:** Materials on Monday and Thursday are the same")
      .addField('❯\u2000\Talent Ascension Material:', "Freedom & Prosperity",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Decarabian & Stone From Guyun",true)
      .addField('❯\u2000\Character That Needs It:', "Barbara, Amber, Qiqi, Keqing, Klee, Childe, Diona, Sucrose, Ningguang, Xiao")
      .addField('❯\u2000\Weapon That Needs It:', "Blackcliff sword, royal sword, favonius sword, lionroar, aquila favonia, summit sharper, whiteblind, the bell, rust, stringless, blackcliff bow, viridescent, cresent pike, primodial jade, favonius, royal grimore, solar pearl, blackcliff amulet")
      .setFooter("Thursday Farming guide")
      .setImage(imgMonThurs)
      .setTimestamp();
        
      message.channel.send(embed);
    }
    
    function friday(){
      let embed = new MessageEmbed()
      .setColor('7CFC00')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Friday")
      .setDescription("Below are list of things that can be farmed on Friday\n**Note:** Materials on Tuesday and Friday are the same")
      .addField('❯\u2000\Talent Leveling Material:', "Resistance & Diligence",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Mist veiled elixir & Boreal Wolf Tooth",true)
      .addField('❯\u2000\Character That Needs It:', "Noelle, Xiangling, Jean, Diluc, Mona, Razor, Bennet, Chongyun, Ganyu")
      .addField('❯\u2000\Weapon That Needs It:', "Prototype rancour, dragons bane, sword of descension, the flute, black sword, skyward blade, sacrificial greatsword, the rainslasher, blackcliff slasher, skyward pride, the unforged, prototype cresent, royal bow, sacrificial bow, skyward harp, blackcliff pole, deathmach, royal spear, the widsith, protype malice, eye of perception, skyward atlas, primodial jade cutter")
      .setImage(imgTuesFri)
      .setFooter("Friday Farming guide")
      .setTimestamp();
      
      message.channel.send(embed);  
    }

    function saturday(){
      let embed = new MessageEmbed()
      .setColor('00BFFF')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on Saturday")
      .setDescription("Below are list of things that can be farmed on Saturday\n**Note:** Materials on Wednesday and Saturday are the same")
      .addField('❯\u2000\Talent Leveling Material:', "Ballad & Gold",true)
      .addField('❯\u2000\Weapon Ascension Material:', "Dandelion Gladiator & Aerosiderite",true)
      .addField('❯\u2000\Character That Needs It:', "Lisa, Kaeya, Venti, Zhongli, Albedo, Fischl, Xingqiu, Xinyan, Beidou")
      .addField('❯\u2000\Weapon That Needs It:', "Sacrificial sword, iron sting, prototype archaic, royal great sword, favonius greatsword, serpent spine, Wolf’s Gravestone, favonius warbow, compound bow, amos bow, prototype grudge, favonius lance, skyward spine, vortex vanquisher, sacrificial fragment, mappa marre, lost prayer to the sacred winds, memory of dust")
      .setFooter("Saturday Farming guide")
      .setImage(imgWedSat)
      .setTimestamp();
      
      message.channel.send(embed);
    }

    function sunday(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle("Things to farm on sunday")
      .setDescription("You can farm for every material on sunday!")
      .setFooter("Sunday Farming guide")
      .setTimestamp();
      
      message.channel.send(embed);
    }    

  }

}

