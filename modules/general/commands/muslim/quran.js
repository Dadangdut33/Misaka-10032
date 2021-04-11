const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { paginationEmbed } = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];
const { htmlToText } = require('html-to-text');

module.exports = class extends Command {
    constructor() {
      super('quran', {
        aliases: ['alquran', 'ayat'],
        categories: 'muslim',
        info: `Online quran using [Fathimah API](https://fathimah.docs.apiary.io/).\n\n Ayat maksimal untuk ditunjukan adalah 10, limit dari API nya. **Untuk pencarian dengan ayat mulai dan ayat berhenti perhatikan (-) nya**\n\n**Contoh**\`\`\`${prefix}quran cari 13-23\`\`\``,
        usage: `${prefix}command/alias <list>\`\`\`\`\`\`${prefix}command/alias <random>\`\`\`\`\`\`${prefix}command/alias <cari/ayat> <nomor surat> <ayat mulai-ayat berhenti>\`\`\`\`\`\`${prefix}command/alias <cari/ayat> <nomor surat> <ayat yang ingin dicari>`,
        guildOnly: true,
      });
    }
  
    async run(message, args) {
        if (!args[0]) {
            info();
            return;
        }

        if (args[0].toLowerCase() == "list"){
            const list = await fetch("https://api.banghasan.com/quran/format/json/surat"); // API for surat lists
            const quranToList = await list.json();
    
            if(quranToList.status == "error") {
                let embed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription(dataParsed.pesan)

                return message.channel.send(embed);
            }

            var quranListed = [];
            for (var i = 0; i < quranToList.hasil.length; i++){
                quranListed.push(`[${quranToList.hasil[i].nomor}] ${quranToList.hasil[i].nama} ${quranToList.hasil[i].asma} (Ayat: ${quranToList.hasil[i].ayat})`);
            }
    
            let page1List = new MessageEmbed()
            .setTitle(`Quran List`)
            .setDescription(quranListed.slice(0,50).join("\n"))
    
            let page2List = new MessageEmbed()
            .setTitle(`Quran List`)
            .setDescription(quranListed.slice(50, 100).join("\n"))
    
            let page3List = new MessageEmbed()
            .setTitle(`Quran List`)
            .setDescription(quranListed.slice(100, quranListed.length).join("\n"))
    
            // Array of pages
            const pages = [
                page1List,
                page2List,
                page3List
            ];
    
            paginationEmbed(message, pages, emojiList, 300000); // 5 Menit
        } else
        if (args[0].toLowerCase() == "cari" || args[0].toLowerCase() == "search" || args[0].toLowerCase() == "ayat" ) {
            args.shift(); // Remove first element
            // Now surat is on args[0], ayat is on args[1]

            const data = await fetch(`https://api.banghasan.com/quran/format/json/surat/${args[0]}/ayat/${args[1]}`);
            const dataParsed = await data.json();

            if(dataParsed.status == "error") {
                let embed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription(dataParsed.pesan)

                return message.channel.send(embed);
            } else {
                var ayatNLatin = [];
                var terjemahan = [];

                if(dataParsed.ayat.error) { // Dia ga ada error messagenya jd buat sendiri
                    let embed = new MessageEmbed()
                    .setTitle("Error!")
                    .setDescription('Ayat Invalid!')
    
                    return message.channel.send(embed);
                }

                for (var i = 0; i < dataParsed.ayat.data.ar.length; i++) {
                    ayatNLatin.push(`${dataParsed.ayat.data.ar[i].ayat}\n${dataParsed.ayat.data.ar[i].teks}\n\n${htmlToText(dataParsed.ayat.data.idt[i].teks)}\n`)
                    terjemahan.push(`${dataParsed.ayat.data.ar[i].ayat}. ${dataParsed.ayat.data.id[i].teks}`)
                }

                let ayatLatinPage1 = new MessageEmbed() // 1-3
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Ayat ke-')
                .setDescription(ayatNLatin.slice(0, 3).join("\n"));

                let ayatLatinPage2 = new MessageEmbed() // 4-5
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Ayat ke-')
                .setDescription(ayatNLatin.slice(3, 5).join("\n"));

                let ayatLatinPage3 = new MessageEmbed() // 6-8
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Ayat ke-')
                .setDescription(ayatNLatin.slice(5, 8).join("\n"));

                let ayatLatinPage4 = new MessageEmbed() // 9-10
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Ayat ke-')
                .setDescription(ayatNLatin.slice(8, 10).join("\n"));
                
                let terjemahanPage1 = new MessageEmbed() // 1-2
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Arti ayat ke-')
                .setDescription(terjemahan.slice(0, 2).join("\n"));

                let terjemahanPage2 = new MessageEmbed() // 2-4
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Arti ayat ke-')
                .setDescription(terjemahan.slice(2, 4).join("\n"));

                let terjemahanPage3 = new MessageEmbed() // 5-6
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Arti ayat ke-')
                .setDescription(terjemahan.slice(4, 6).join("\n"));

                let terjemahanPage4 = new MessageEmbed() // 7-8
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Arti ayat ke-')
                .setDescription(terjemahan.slice(6, 8).join("\n"));

                let terjemahanPage5 = new MessageEmbed() // 9-10
                .setAuthor(`Q.S. ${dataParsed.surat.nama}:${dataParsed.surat.nomor} (${dataParsed.query.ayat})`)
                .setTitle('Arti ayat ke-')
                .setDescription(terjemahan.slice(8, 10).join("\n"));

                var pages = []; // HAHA look at this horrendous code, not gonna bother with it cause it works tho 
                if (terjemahan.length > 8) { // 9-10
                    pages = [
                        ayatLatinPage1,
                        ayatLatinPage2,
                        ayatLatinPage3,
                        ayatLatinPage4,
                        terjemahanPage1,
                        terjemahanPage2,
                        terjemahanPage3,
                        terjemahanPage4,
                        terjemahanPage5
                    ]
                } else 
                if (terjemahan.length > 6 && terjemahan.length < 9){ // 7-8
                    pages = [
                        ayatLatinPage1,
                        ayatLatinPage2,
                        ayatLatinPage3,
                        terjemahanPage1,
                        terjemahanPage2,
                        terjemahanPage3,
                        terjemahanPage4
                    ]
                } else 
                if (terjemahan.length > 4 && terjemahan.length < 7){ // 5-6
                    pages = [
                        ayatLatinPage1,
                        ayatLatinPage2,
                        terjemahanPage1,
                        terjemahanPage2,
                        terjemahanPage3
                    ]
                } else 
                if (terjemahan.length > 3 && terjemahan.length < 6){ // 4 - 5
                    pages = [
                        ayatLatinPage1,
                        ayatLatinPage2,
                        terjemahanPage1,
                        terjemahanPage2
                    ]
                } else
                if (terjemahan.length > 2 && terjemahan.length < 4){  // 3
                    pages = [
                        ayatLatinPage1,
                        terjemahanPage1,
                        terjemahanPage2
                    ]
                } else { // 2
                    pages = [
                        ayatLatinPage1,
                        terjemahanPage1,
                    ]
                }

                paginationEmbed(message, pages, emojiList, 600000); // 10 Menit
            }
        } else
        if (args[0].toLowerCase() == "random" || args[0].toLowerCase() == "acak") { 
            const data = await fetch(`https://api.banghasan.com/quran/format/json/acak`);
            const dataParsed = await data.json();

            if(dataParsed.status == "error") {
                let embed = new MessageEmbed()
                .setTitle("Error!")
                .setDescription(dataParsed.pesan)

                return message.channel.send(embed);
            }

            let embed = new MessageEmbed()
            .setAuthor(`Q.S. ${dataParsed.surat.nama}: ${dataParsed.surat.nomor} ${dataParsed.surat.asma} (${dataParsed.acak.id.ayat})`)
            .setDescription(`${dataParsed.acak.ar.teks}\n\n**Terjemahan**: \n${dataParsed.acak.id.teks}`)
            
            return message.channel.send(embed);
        } else {
            info();
            return;
        }

        function info() {
            let embed = new MessageEmbed()
            .setTitle('Invalid Arguments')
            .setDescription(`**Usage should be like this:** \n\`${prefix}command/alias <list>\` or\n\`${prefix}command/alias <random>\` or\n\`${prefix}command/alias <cari/ayat> <nomor surat> <ayat mulai-ayat berhenti>\` or\n\`${prefix}command/alias <cari/ayat> <nomor surat> <ayat yang ingin dicari>\`\n\n**Example:**\n\`${prefix}quran cari 13-23\``)
            .setFooter('For more info check using help commands!');

            return message.channel.send(embed);
        }
    }
};