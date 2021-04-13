const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { paginationEmbed } = require('../../../../local_dependencies/functions.js');

module.exports = class extends Command {
    constructor() {
      super('tafsir', {
        aliases: ['No alias is set for this command'],
        categories: 'muslim',
        info: `Online tafsir using [Sutanlab API](https://github.com/sutanlab/quran-api).\n\n Tafsir hanya bisa untuk per ayat karena satu tafsir saja panjang sekali dan tidak cukup untuk diletakkan di embed discord.`,
        usage: `${prefix}command/alias <nomor surat> <ayat>`,
        guildOnly: true,
      });
    }
  
    async run(message, args) {
        if (!args[0] || isNaN(args[0]) || isNaN(args[1])) {
            info();
            return;
        }

        const API = await fetch(`https://api.quran.sutanlab.id/surah/${args[0]}/${args[1]}`);
        const parsedData = await API.json();

        if(parsedData.code !== 200){
            let embed = new MessageEmbed()
            .setTitle('Error')
            .addField(`Status`, parsedData.status, true)
            .addField(`Message`, parsedData.message, true)

            return message.channel.send(embed)
        }

        var pages = [];

        let infoPage = new MessageEmbed()
        .setTitle(`Q.S. ${parsedData.data.surah.name.transliteration.id}:${parsedData.data.surah.number} (${parsedData.data.number.inSurah}) ${parsedData.data.surah.name.short}`)
        .setDescription(`${parsedData.data.surah.tafsir.id}`)
        .addField(`Juz`, parsedData.data.meta.juz, true)
        .addField(`Jenis Surat`, parsedData.data.surah.revelation.id, true)
        .addField(`Arti Surat`, parsedData.data.surah.name.translation.id, true)
        .addField(`Ayat sajdah (Disarankan)`, `${parsedData.data.meta.sajda.recommended ? "Iya" : parsedData.data.meta.sajda.obligatory ? "Diwajibkan" : "Tidak"}`, true)
        .addField(`Ayat sajdah (Wajib Sujud)`, `${parsedData.data.meta.sajda.obligatory ? "Iya" : "Tidak"}`, true)
        .addField(`Audio Download`, `[Download](${parsedData.data.audio.primary})`, true);

        let theAyat = new MessageEmbed()
        .setTitle(`Q.S. ${parsedData.data.surah.name.transliteration.id}:${parsedData.data.surah.number} (${parsedData.data.number.inSurah}) ${parsedData.data.surah.name.short}`)
        .setDescription(`${parsedData.data.text.arab}\n\n**Terjemahan:**\n${parsedData.data.translation.id}`)

        pages.push(infoPage);
        pages.push(theAyat);

        if(parsedData.data.tafsir.id.long.length <= 2048) {
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long));
        } else
        if(parsedData.data.tafsir.id.long.length > 2048 && parsedData.data.tafsir.id.long.length <= 4096){
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(0, 2048)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(2048, 4096)));
        } else
        if(parsedData.data.tafsir.id.long.length > 4096 && parsedData.data.tafsir.id.long.length <= 6144){
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(0, 2048)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(2048, 4096)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(4096, 6144)));
        } else
        if(parsedData.data.tafsir.id.long.length > 6144 && parsedData.data.tafsir.id.long.length <= 8192){
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(0, 2048)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(2048, 4096)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(4096, 6144)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(6144, 8192)));
        } else
        if(parsedData.data.tafsir.id.long.length > 8192 && parsedData.data.tafsir.id.long.length <= 10240){
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(0, 2048)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(2048, 4096)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(4096, 6144)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(6144, 8192)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(8192, 10240)));
        } else
        if(parsedData.data.tafsir.id.long.length > 10240 && parsedData.data.tafsir.id.long.length <= 12288){
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(0, 2048)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(2048, 4096)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(4096, 6144)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(6144, 8192)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(8192, 10240)));
            pages.push(descEmbed(parsedData, parsedData.data.tafsir.id.long.slice(10240, 12288)));
        }

        paginationEmbed(message, pages, "", 600000);

        function info() {
            let embed = new MessageEmbed()
            .setTitle('Invalid Arguments')
            .setDescription(`**Usage should be like this:** \n\`${prefix}command/alias <nomor surat> <ayat>\``)
            .setFooter('For more info check using help commands!');

            return message.channel.send(embed);
        }

        function descEmbed(parsedData, tafsir) {
            let embed = new MessageEmbed()
            .setTitle(`Q.S. ${parsedData.data.surah.name.transliteration.id}:${parsedData.data.surah.number} (${parsedData.data.number.inSurah}) ${parsedData.data.surah.name.short}`)
            .setDescription(tafsir)

            return embed;
        }
    }
};