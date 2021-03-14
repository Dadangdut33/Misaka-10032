const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { paginationEmbed } = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];

module.exports = class extends Command {
  constructor(){ 
    super('gbook', {
      categories: "genshin",
      aliases: ["b", "book"],
      info: "Gives information about talent book in genshin impact",
      usage: `${prefix}gbook [name] or ${prefix}alias [name]`,
      guildOnly: true,
    });
  }
  async run (message, args){
    var pages;
    if (!args[0]){
      return message.channel.send(info());
    }

    switch(args.join(" ").toLowerCase()){
      case "all":
        pages = [
          gold(),
          ballad(),
          freedom(),
          diligence(),
          prosperity(),
          resistance()
        ]
  
        paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
        break;

      case "gold":
        message.channel.send(gold());
        break;

      case "ballad":
        message.channel.send(ballad());
        break;

      case "freedom":
        message.channel.send(freedom());
        break;

      case "diligence":
        message.channel.send(diligence());
        break;

      case "prosperity":
        message.channel.send(prosperity());
        break;

      case "resistance":
        message.channel.send(resistance());
        break;

      case "tatang sutarma":
      case "hidden":
      case "rahasia negara":
      case "rahasia":
      case "misteri":
      case "harta karun":
      case "tatang":
        message.channel.send(tatangSutarma());
        break;

      default:
        message.channel.send(info());
        break;
    }



    function tatangSutarma(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on the legendary "Tatang Sutarma"`)
      .setDescription(`Requested by the chosen one ${message.author}, Konon katanya buku ini hanya ada satu di dunia dan hanya dipegang oleh satu-satunya sang sakti yaitu Sule sendiri\n
      Tapi, tahukah anda kalau buku tatang sutarma benar benar ada? dan buku itu ada sejak tahun 1788. Dalam buku ini terdapat terjemahan dari kitab-kitab Sunda Kuno karya pujangga besar yang meliputi 14 kitab. Keempat belas kitab kuno itu menjadi pedoman hidup sehari-hari masyarakat Jawa yang diwariskan secara turun-temurun dari generasi ke generasi. Pada saat-saat tertentu malah dijadikan bahan renungan yang menambah kekayaan rohani. Kita pantas bersyukur dengan kreatifitas dan produktifitas nenek moyang itu. Harkat dan martabat kita semakin mantab, karena mempunyai jati diri yang berupa kearifan lokal. Berbagai permasalahan yang terjadi sekarang sebenarnya bisa diatasi dengan butir-butir budaya luhur masa silam.`)
      .addField('❯\u2000\Found On:', "Indonesia - Unspecified Location",true)
      .addField('❯\u2000\Day To Farm:', "Confidential Information",true)
      .addField('❯\u2000\Chapter That Are Released To Public Can Be Found On:', "https://buku-tatang-sutarman.blogspot.com/")
      .setImage('https://cdn.discordapp.com/attachments/651015913080094724/794514667992776724/Tatang_Sutarma.gif')
      .setFooter("Above are images of Tatang Sutarma Sighting In Public")
      .setTimestamp();

      return embed;
    }

    function gold(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Gold" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Taishan manshion - Jueyun Karst, Liyue",true)
      .addField('❯\u2000\Day to Farm:', "Wednesday/Saturday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Beidou, Xingqiu, Xinyan, Zhongli")
      .setFooter("Gold Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function ballad(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Ballad" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Forsaken Rift - Springvale, Mondstadt",true)
      .addField('❯\u2000\Day To Farm:', "Wednesday/Saturday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Albedo, Fischl, Kaeya, Lisa, Venti")
      .setFooter("Ballad Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function freedom(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Freedom" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Forsaken Rift - Springvale, Mondstadt",true)
      .addField('❯\u2000\Day To Farm:', "Monday/Thursday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Amber, Barbara, Diona, Klee, Sucrose, Childe")
      .setFooter("Freedom Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function diligence(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Diligence" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Taishan manshion - Jueyun Karst, Liyue",true)
      .addField('❯\u2000\Day To Farm:', "Tuesday/Friday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Chongyun, Xiangling, Ganyu, Hu Tao")
      .setFooter("Diligence Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function prosperity(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Prosperity" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Taishan manshion - Jueyun Karst, Liyue",true)
      .addField('❯\u2000\Day To Farm:', "Monday/Thursday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Keqing, Ningguang, Qiqi, Xiao")
      .setFooter("Prosperity Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function resistance(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Information on "Resistance" Book`)
      .setDescription(`Requested by ${message.author}`)
      .addField('❯\u2000\Found On:', "Forsaken Rift - Springvale, Mondstadt",true)
      .addField('❯\u2000\Day To Farm:', "Tuesday/Friday/Sunday",true)
      .addField('❯\u2000\Character That Needs It:', "Bennet, Diluc, Jean, Mona, Noelle, Razor")
      .setFooter("Resistance Talent Book Farming Info")
      .setTimestamp();

      return embed;
    }

    function info(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Please enter the correct name of the book that you want to check!")
      .setDescription("There are currently 6 books for talent upgrade in genshin impact. You can use this command to check each of their farming information")
      .addField('❯\u2000\Book Lists:', "- Gold\n- Ballad\n- Freedom\n- Prosperity\n- Resistance")
      .setFooter(message.guild.me.displayName)
      .setTimestamp();
    
      return embed;
    }
  }
}