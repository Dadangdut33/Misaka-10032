const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix, Genshin_Ver } = require("../../../../config");
const { paginationEmbed, find_DB } = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];

module.exports = class extends Command {
    constructor() {
        super('gweapon', {
            categories: "genshin",
            aliases: ["weapon"],
            info: "Gives some information of inputted genshin impact weapon\n\n**Input is case sensitive**",
            usage: `${prefix}gweapon [weapon name]`,
            guildOnly: true,
        });
    }

    async run(message, args) {
        var pages = [];

        if (!args[0]) {
            return message.channel.send(info());
        }

        switch (args.join(" ").toLowerCase()) {
            case "all":
            case "list":
            case "semua":
                getAll();
                break;

            default:
                find_DB('g_Weapon', {
                    weapons: `${args.join(" ")}`
                }, function (err, docs) {
                    if (!docs[0]) {
                        return message.channel.send(info());
                    } else {
                        return message.channel.send(dataToEmbed(docs[0]));
                    }
                });

                break;
        }

        function info() {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Please enter a valid weapon name!")
                .setDescription(`The input is case sensitive, you can check for the weapon list by using\n\`${prefix}gweapon list\``)
                .setFooter(message.guild.me.displayName)
                .setTimestamp();

            return embed;
        }

        function dataToEmbed(data) {
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`Some Info On ${args.join(" ")}`)
                .addField(`Domain to Farm`, data.domain, true)
                .addField(`Ascension Material`, data.farm_Get, true)
                .addField(`Day to Farm`, data.farm_Day, true)
                .addField(`❯\u2000\External Links`, `• [Wiki (Direct Link)](https://genshin-impact.fandom.com/wiki/${args.join("_")})\n• [Wiki (Search)](https://genshin-impact.fandom.com/wiki/Special:Search?query=${args.join("+")})`)

            return embed;
        }

        function getAll() {
            find_DB('g_Weapon', "", function (err, docs) {
                var cecilia_Garden = Array.from(docs)
                    .filter(filtered => filtered.domain == "Cecilia Garden");

                var farm_Type_1 = Array.from(docs)
                    .filter(filtered => filtered.domain == "Cecilia Garden")
                    .map(get => get.farm_Get);

                var hidden_Palace = Array.from(docs)
                    .filter(filtered => filtered.domain == "Hidden Palace of Lianshan Formula");

                var farm_Type_2 = Array.from(docs)
                    .filter(filtered => filtered.domain == "Hidden Palace of Lianshan Formula")
                    .map(get => get.farm_Get);

                var pages = [];

                pages[0] = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`Below are lists of weapons currently in genshin impact Version ${Genshin_Ver}\n\nDomain: \`Cecilia Garden\``)
                    .addField(`❯\u2000${farm_Type_1[0]} [${cecilia_Garden[0].weapons.length}]:`, cecilia_Garden[0].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000${farm_Type_1[1]} [${cecilia_Garden[1].weapons.length}]:`, cecilia_Garden[1].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000${farm_Type_1[2]} [${cecilia_Garden[2].weapons.length}]:`, cecilia_Garden[2].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000\Search on Wiki`, `• [${farm_Type_1[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_1[0].replace(/\s/g, "+")})\n• [${farm_Type_1[1]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_1[1].replace(/\s/g, "+")})\n• [${farm_Type_1[2]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_1[2].replace(/\s/g, "+")})`)
                    .setTimestamp();

                pages[1] = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
                    .setDescription(`Below are lists of weapons currently in genshin impact ${Genshin_Ver}\n\nDomain: \`Hidden Palace of Lianshan Formula\``)
                    .addField(`❯\u2000${farm_Type_2[0]} [${hidden_Palace[0].weapons.length}]:`, hidden_Palace[0].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000${farm_Type_2[1]} [${hidden_Palace[1].weapons.length}]:`, hidden_Palace[1].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000${farm_Type_2[2]} [${hidden_Palace[2].weapons.length}]:`, hidden_Palace[2].weapons.map(x => `\`${x}\``).join(", "), false)
                    .addField(`❯\u2000\Search on Wiki`, `• [${farm_Type_2[0]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_2[0].replace(/\s/g, "+")})\n• [${farm_Type_2[1]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_2[1].replace(/\s/g, "+")})\n• [${farm_Type_2[2]}](https://genshin-impact.fandom.com/wiki/Special:Search?query=${farm_Type_2[2].replace(/\s/g, "+")})`)
                    .setTimestamp();           


                paginationEmbed(message, pages, emojiList, 300000);
            });
        }
    }
}