const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const cheerio = require('cheerio');
const axios = require('axios');

module.exports = class extends Command {
  constructor() {
    super('kbbi', {
      aliases: ["No alias is set for this command"],
      categories: 'info-misc',
      info: 'Mencari definisi kata dari [KBBI](https://kbbi.web.id/)',
      usage: `${prefix}command/alias <...>`,
      guildOnly: false,
    });
  }
  async run(message, args) {
    if (args.length < 0 || args.join(" ") == "") {
      info();
      return;
    } else {
        // Ambil data
        const query = args.join(` `);
        const url = 'https://kbbi.web.id/'
        const link = url + query;

        // Data
        var { data } = await axios.get(link);

        // Parse
        var $ = await cheerio.load(data);

        // Get each respective data
        var title = await $('title').text();
        var definitionGet = await $('div[id = "d1"]').text();
        var footer = await $('div[id = "footer"]').text();


        if(definitionGet.length < 11) { // Jika tidak ada definisi
            let embed = new MessageEmbed()
            .setTitle(`Definisi tidak ditemukan!`)
            .setDescription(`Tidak ditemukan definisi dari \`${args.join(" ")}\` Harap masukkan kata yang benar!`)

            return message.channel.send(embed);
        }

        const newNumber = {
            '0' : '**0**',
            '1' : '**1**',
            '2' : '**2**',
            '3' : '**3**',
            '4' : '**4**',
            '5' : '**5**',
            '6' : '**6**',
            '7' : '**7**',
            '8' : '**8**',
            '9' : '**9**',
        }; // ga jd


        // Embed
        const embed = new MessageEmbed()
        .setAuthor(title.replace(/<[^>]*>?/gm, ''), 'https://media.discordapp.net/attachments/799595012005822484/821354290237014056/favicon.png', link)
        // .setDescription(definitionGet.slice(0, 1800).replace(/[0-9]/g, m => newNumber[m]).replace(/;+[a-z]/gi, "\n\n"))
        .setDescription(`${definitionGet.slice(0, 1900)}...`)
        .addField(`Detil Lebih Lanjut`, `[Klik Disini](${link})`, false)
        .setFooter(footer);

        return message.channel.send(embed);
    }

    function info(){
        let embed = new MessageEmbed()
        .setTitle('Argument Invalid')
        .setDescription('Jika tidak yakin bagaimana cara menggunakan, harap cek dengan `help` command')

        return message.channel.send(embed);
    }
  }
}


