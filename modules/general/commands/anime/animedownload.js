const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
    constructor(){ 
        super('animedownload', {
        categories: "anime",
        aliases: ["anidl", "anigrab"],
        info: "Get Anime downloads link from [gogoanime](http://gogoanime.sh/)/[4anime](https://4anime.to/)/[animekisa](https://animekisa.tv/)/\n[animeout](https://www.animeout.xyz/).\n\n**Animeout is a download only sites so the list could be wrong if you search for all episodes**, if this happen you can just check for the download from the site by pressing Search on site or then download it directly from the site.\n\nAlso please note that this commands took quite lots of time depending on the connection.\n\nIf there is any error it could be because the download links does not exist or cannot be grabbed by the commands (It's not the bot's fault), but if you are sure that it could be considered a bug then please report it to Admin.\n\nCommands are possible by using [anigrab](https://www.npmjs.com/package/anigrab)",
        usage: `${prefix}anidl [<gogo/4anime/animekisa/animeout>] [<anime name>] [<all/specified episode>]\`\`\`**Notes**\`\`\`css\nNotice the []`,
        guildOnly: false,
        });
    }
    async run (message, args) {
        var regex = /\[(.*?)\]/g;

        var options = args.join(" ").match(regex);
        /* 
        currently available sites gogo/4anime/animekisa/animeout/animefreak
        The function are also located in order   
            options[0] = site
            options[1] = anime name
            options[2] = episode
        */

        // If no []
        if (!options){        
            return message.channel.send(catchWrongArgs());
        }

        if (options[2] < 1){        
            return message.channel.send(`Invalid anime episodes`)
        }

        // Remove [] if there is option
        for (var i = 0; i < options.length; i++){
            options[i] = options[i].replace(/[\[\]]/g, "");
        }

        // Check options
        if (options[0].toLowerCase() == "gogo"){ // If gogo
            const { search, getAnime, getQualities } = require('anigrab').sites.siteLoader(
                'gogoanime'
            );
            // console.log(options);
            const msg = await message.channel.send('Searching for the anime...');

            const searchResults = await search(options[1]); // Initiates a search, this is a promise so can be awaited
                // console.log(searchResults);

            if (searchResults[0] == undefined) {
                msg.edit(`**Anime Not Found!**`);

                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}**! Maybe you type it wrong? The search is very sensitive for this one`)
                .setFooter(`If the problem keeps happening even though the anime exist on the site, please contact admin. Also please note that some anime doesn't have download links for some reason`);

                return message.channel.send(embed);
            }

            msg.edit(`**Anime Found!** Retrieving Download Links...`);

            const { url } = searchResults[0]; // Use destructuring to get url of search result at index 0
            const anime = await getAnime(url); // Retrieves the title of the anime and it's episodes, again this is awaitable

            // If all
            if(options[2].toLowerCase() == "all"){
                var ep = []; // To stored episode info
                var threeSixty = []; // To stored quality
                var fourEighty = [];
                var sevenTwenty = [];
                var tenEighty = [];

                var quality360 = [];
                var quality480 = [];
                var quality720 = [];
                var quality1080 = [];

                var results = []; // Results to show
                var episodeURL = [];
                var qualities = [];

                // To limit the lists
                var limit = anime.episodes.length;
                
                if(anime.episodes.length > 25) {
                    limit = 30
                }

                // Count the ep
                var count = 1;
                for (var i = 0; i < limit; i++){
                    msg.edit(`Retrieving Ep ${count}`);
                    episodeURL[i] = anime.episodes[i].url;
                    qualities[i] = await getQualities(episodeURL[i]);

                    ep[i] = qualities[i].qualities;

                    threeSixty[i] = ep[i].get('360p');
                    fourEighty[i] = ep[i].get('480p');
                    sevenTwenty[i] = ep[i].get('720p');
                    tenEighty[i] = ep[i].get('1080p');

                    quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url : '') : '';
                    quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url : '') : '';
                    quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url : '') : '';
                    quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url : '') : '';


                    results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
                    count++;
                }
                
                var desc = results[0];
                // console.log(desc);

                msg.edit(`**Link Grabbed! Results are shown below**`);

                let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ALL`)
                .setAuthor(`Gogoanime`, 'https://gogoanime.sh/img/icon/logo.png', 'https://gogoanime.sh/')
                .setDescription(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes. [Site Link (Ep 1)](${anime.episodes[0].url})\n**====**\n${desc ? desc : "-"}`)
                .setTimestamp();

                message.channel.send(embed);
                // console.log(results.length)
                for(var x = 1; x < results.length; x++){
                    var embedMuch = new MessageEmbed()
                    embedMuch.addField(`====`, results[x], false)

                    message.channel.send(embedMuch)
                }
                return;
            }
            
            // IF NOT ALL EPISODES
            // Minus 1 the episodes cause array start from 0
            var episodeSearch = options[2] - 1;
            // console.log(episodeSearch)

            // Check if episode valid or not
            if(episodeSearch > anime.episodes.length || episodeSearch < 0 || isNaN(episodeSearch)) {
                msg.edit(`**Invalid Episode Inputted!**`);

                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}** Ep ${options[2]} in Gogoanime`)
                .setFooter(`If you are sure that you inputed a correct episode, you should go check the website database and see if they have the episodes or not`);
                
                return message.channel.send(embed);
            } 

            // Retrieving the data
            var episodeURL = anime.episodes[parseInt(episodeSearch)].url;
            var qualities = await getQualities(episodeURL);
            
            // console.log(qualities);

            var ep = qualities.qualities; //Store episodes url to make it easier 
            
            // To get the qualities
            var threeSixty = ep.get('360p');
            var fourEighty = ep.get('480p');
            var sevenTwenty = ep.get('720p');
            var tenEighty = ep.get('1080p');

            let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ${options[2]}`)
                .setAuthor(`Gogoanime`, 'https://gogoanime.sh/img/icon/logo.png', 'https://gogoanime.sh/')
                .setDescription(`**Quality Options**`)
                .addField(`360p`, `[Click Here](${threeSixty ? (threeSixty.url ? threeSixty.url : "-") : "-"})`, true)
                .addField(`480p`, `[Click Here](${fourEighty ? (fourEighty.url ? fourEighty.url : "-") : "-"})`, true)
                .addField(`720p`, `[Click Here](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url : "-") : "-"})`, true)
                .addField(`1080p`, `[Click Here](${tenEighty ? (tenEighty.url ? tenEighty.url : "-") : "-"})`, true)
                .addField(`Site Link (Ep 1)`, `[Click Here](${anime.episodes[0].url})`, true)
                .addField(`Tips`, `Click the blue one to download`, true)
                .addField(`Notes`, `Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available`, false)
                .setTimestamp();

            msg.edit(`**Link Grabbed! Results are shown below**`);
            return message.channel.send(embed);
        } else 
        if (options[0].toLowerCase() == "4anime" ) { // If 4anime
            const { search, getAnime, getQualities } = require('anigrab').sites.siteLoader(
                '4anime'
            );
            // console.log(options);
            const msg = await message.channel.send('Searching for the anime...');

            const searchResults = await search(options[1]); // Initiates a search, this is a promise so can be awaited
                // console.log(searchResults);

            if (searchResults[0] == undefined) {
                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}**! Maybe you type it wrong? The search is very sensitive for this one`)
                .setFooter(`If the problem keeps happening even though the anime exist on the site, please contact admin. Also please note that some anime doesn't have download links for some reason`);

                msg.edit(`**Anime Not Found!**`);
                return message.channel.send(embed);
            }

            msg.edit(`**Anime Found!** Retrieving Download Links...`);

            const { url } = searchResults[0]; // Use destructuring to get url of search result at index 0
            const anime = await getAnime(url); // Retrieves the title of the anime and it's episodes, again this is awaitable

            // If all
            if(options[2].toLowerCase() == "all"){
                var ep = []; // To stored episode info
                var threeSixty = []; // To stored quality
                var fourEighty = [];
                var sevenTwenty = [];
                var tenEighty = [];

                var quality360 = [];
                var quality480 = [];
                var quality720 = [];
                var quality1080 = [];

                var results = []; // Results to show
                var episodeURL = [];
                var qualities = [];

                // To limit the lists
                var limit = anime.episodes.length;
                
                if(anime.episodes.length > 25) {
                    limit = 30
                }

                // Count the ep
                var count = 1;
                for (var i = 0; i < limit; i++){
                    msg.edit(`Retrieving Ep ${count}`);
                    episodeURL[i] = anime.episodes[i].url;
                    qualities[i] = await getQualities(episodeURL[i]);

                    ep[i] = qualities[i].qualities;

                    threeSixty[i] = ep[i].get('360p');
                    fourEighty[i] = ep[i].get('480p');
                    sevenTwenty[i] = ep[i].get('720p');
                    tenEighty[i] = ep[i].get('1080p');

                    quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url : '') : '';
                    quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url : '') : '';
                    quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url : '') : '';
                    quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url : '') : '';


                    results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
                    count++;
                }
                
                var desc = results[0];
                // console.log(desc);

                msg.edit(`**Link Grabbed! Results are shown below**`);

                let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ALL`)
                .setAuthor(`4Anime`, 'https://4anime.co/static/logo.png', 'https://4anime.to/')
                .setDescription(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes. [Site Link (Ep 1)](${anime.episodes[0].url})\n**====**\n${desc ? desc : "-"}`)
                .setTimestamp();

                message.channel.send(embed);
                // console.log(results.length)
                for(var x = 1; x < results.length; x++){
                    var embedMuch = new MessageEmbed()
                    embedMuch.addField(`====`, results[x], false)

                    message.channel.send(embedMuch)
                }
                return;
            }
            
            // IF NOT ALL EPISODES
            // Minus 1 the episodes cause array start from 0
            var episodeSearch = options[2] - 1;
            // console.log(episodeSearch)

            // Check if episode valid or not
            if(episodeSearch > anime.episodes.length || episodeSearch < 0 || isNaN(episodeSearch)) {
                msg.edit(`**Invalid Episode Inputted!**`);

                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}** Ep ${options[2]} in 4Anime`)
                .setFooter(`If you are sure that you inputed a correct episode, you should go check the website database and see if they have the episodes or not`);
                
                return message.channel.send(embed);
            } 

            // Retrieving the data
            var episodeURL = anime.episodes[parseInt(episodeSearch)].url;
            var qualities = await getQualities(episodeURL);
            
            // console.log(qualities);

            var ep = qualities.qualities; //Store episodes url to make it easier 
            
            // To get the qualities
            var threeSixty = ep.get('360p');
            var fourEighty = ep.get('480p');
            var sevenTwenty = ep.get('720p');
            var tenEighty = ep.get('1080p');

            let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ${options[2]}`)
                .setAuthor(`4Anime`, 'https://4anime.co/static/logo.png', 'https://4anime.to/')
                .setDescription(`**Quality Options**`)
                .addField(`360p`, `[Click Here](${threeSixty ? (threeSixty.url ? threeSixty.url : "-") : "-"})`, true)
                .addField(`480p`, `[Click Here](${fourEighty ? (fourEighty.url ? fourEighty.url : "-") : "-"})`, true)
                .addField(`720p`, `[Click Here](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url : "-") : "-"})`, true)
                .addField(`1080p`, `[Click Here](${tenEighty ? (tenEighty.url ? tenEighty.url : "-") : "-"})`, true)
                .addField(`Site Link (Ep 1)`, `[Click Here](${anime.episodes[0].url})`, true)
                .addField(`Tips`, `Click the blue one to download`, true)
                .addField(`Notes`, `Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available`, false)
                .setTimestamp();

                msg.edit(`**Link Grabbed! Results are shown below**`);
            return message.channel.send(embed); 
        } else 
        if (options[0].toLowerCase() == "animekisa" ) { // If animekisa
            const { search, getAnime, getQualities } = require('anigrab').sites.siteLoader(
                'animekisa'
            );
            // console.log(options);
            const msg = await message.channel.send('Searching for the anime...');

            const searchResults = await search(options[1]); // Initiates a search, this is a promise so can be awaited
                // console.log(searchResults);

            if (searchResults[0] == undefined) {
                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}**! Maybe you type it wrong? The search is very sensitive for this one`)
                .setFooter(`If the problem keeps happening even though the anime exist on the site, please contact admin. Also please note that some anime doesn't have download links for some reason`);

                msg.edit(`**Anime Not Found!**`);
                return message.channel.send(embed);
            }

            msg.edit(`**Anime Found!** Retrieving Download Links...`);

            const { url } = searchResults[0]; // Use destructuring to get url of search result at index 0
            const anime = await getAnime(url); // Retrieves the title of the anime and it's episodes, again this is awaitable

            // If all
            if(options[2].toLowerCase() == "all"){
                var ep = []; // To stored episode info
                var threeSixty = []; // To stored quality
                var fourEighty = [];
                var sevenTwenty = [];
                var tenEighty = [];

                var quality360 = [];
                var quality480 = [];
                var quality720 = [];
                var quality1080 = [];

                var results = []; // Results to show
                var episodeURL = [];
                var qualities = [];

                // To limit the lists
                var limit = anime.episodes.length;
                
                if(anime.episodes.length > 25) {
                    limit = 30
                }

                // Count the ep
                var count = 1;
                for (var i = 0; i < limit; i++){
                    msg.edit(`Retrieving Ep ${count}`);
                    episodeURL[i] = anime.episodes[i].url;
                    qualities[i] = await getQualities(episodeURL[i]);

                    ep[i] = qualities[i].qualities;

                    threeSixty[i] = ep[i].get('360p');
                    fourEighty[i] = ep[i].get('480p');
                    sevenTwenty[i] = ep[i].get('720p');
                    tenEighty[i] = ep[i].get('1080p');

                    quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url : '') : '';
                    quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url : '') : '';
                    quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url : '') : '';
                    quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url : '') : '';


                    results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
                    count++;
                }
                
                var desc = results[0];
                // console.log(desc);

                msg.edit(`**Link Grabbed! Results are shown below**`);

                let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ALL`)
                .setAuthor(`Animekisa`, 'https://cdn.discordapp.com/attachments/799595012005822484/810890847133892649/wxlKJ7e8Z0TMGQUleoDAXdq6rNh-8pSKOSIIpbeCT0g.png', 'https://animekisa.tv/')
                .setDescription(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes. [Site Link (Ep 1)](${anime.episodes[0].url})\n**====**\n${desc ? desc : "-"}`)
                .setTimestamp();

                message.channel.send(embed);
                // console.log(results.length)
                for(var x = 1; x < results.length; x++){
                    var embedMuch = new MessageEmbed()
                    embedMuch.addField(`====`, results[x], false)

                    message.channel.send(embedMuch)
                }
                return;
            }
            
            // IF NOT ALL EPISODES
            // Minus 1 the episodes cause array start from 0
            var episodeSearch = options[2] - 1;
            // console.log(episodeSearch)

            // Check if episode valid or not
            if(episodeSearch > anime.episodes.length || episodeSearch < 0 || isNaN(episodeSearch)) {
                msg.edit(`**Invalid Episode Inputted!**`);

                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}** Ep ${options[2]} in Animekisa`)
                .setFooter(`If you are sure that you inputed a correct episode, you should go check the website database and see if they have the episodes or not`);
                
                return message.channel.send(embed);
            } 

            // Retrieving the data
            var episodeURL = anime.episodes[parseInt(episodeSearch)].url;
            var qualities = await getQualities(episodeURL);
            
            // console.log(qualities);

            var ep = qualities.qualities; //Store episodes url to make it easier 
            
            // To get the qualities
            var threeSixty = ep.get('360p');
            var fourEighty = ep.get('480p');
            var sevenTwenty = ep.get('720p');
            var tenEighty = ep.get('1080p');

            let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ${options[2]}`)
                .setAuthor(`Animekisa`, 'https://cdn.discordapp.com/attachments/799595012005822484/810890847133892649/wxlKJ7e8Z0TMGQUleoDAXdq6rNh-8pSKOSIIpbeCT0g.png', 'https://animekisa.tv/')
                .setDescription(`**Quality Options**`)
                .addField(`360p`, `[Click Here](${threeSixty ? (threeSixty.url ? threeSixty.url : "-") : "-"})`, true)
                .addField(`480p`, `[Click Here](${fourEighty ? (fourEighty.url ? fourEighty.url : "-") : "-"})`, true)
                .addField(`720p`, `[Click Here](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url : "-") : "-"})`, true)
                .addField(`1080p`, `[Click Here](${tenEighty ? (tenEighty.url ? tenEighty.url : "-") : "-"})`, true)
                .addField(`Site Link (Ep 1)`, `[Click Here](${anime.episodes[0].url})`, true)
                .addField(`Tips`, `Click the blue one to download`, true)
                .addField(`Notes`, `Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available`, false)
                .setTimestamp();

            msg.edit(`**Link Grabbed! Results are shown below**`);
            return message.channel.send(embed);
        } else 
        if (options[0].toLowerCase() == "animeout" ) { // If animeout
            const { search, getAnime, getQualities } = require('anigrab').sites.siteLoader(
                'animeout'
            );
            // console.log(options);
            const msg = await message.channel.send('Searching for the anime...');

            const searchResults = await search(options[1]); // Initiates a search, this is a promise so can be awaited
                // console.log(searchResults);

            if (searchResults[0] == undefined) {
                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}**! Maybe you type it wrong? The search is very sensitive for this one`)
                .setFooter(`If the problem keeps happening even though the anime exist on the site, please contact admin. Also please note that some anime doesn't have download links for some reason`);

                msg.edit(`**Anime Not Found!**`);
                return message.channel.send(embed);
            }

            msg.edit(`**Anime Found!** Retrieving Download Links...`);

            const { url } = searchResults[0]; // Use destructuring to get url of search result at index 0
            const anime = await getAnime(url); // Retrieves the title of the anime and it's episodes, again this is awaitable

            // If all
            if(options[2].toLowerCase() == "all"){
                var ep = []; // To stored episode info
                var threeSixty = []; // To stored quality
                var fourEighty = [];
                var sevenTwenty = [];
                var tenEighty = [];

                var quality360 = [];
                var quality480 = [];
                var quality720 = [];
                var quality1080 = [];

                var results = []; // Results to show
                var episodeURL = [];
                var qualities = [];

                // To limit the lists
                var limit = anime.episodes.length;
                
                if(anime.episodes.length > 25) {
                    limit = 30
                }

                // Count the ep
                var count = 1;
                for (var i = 0; i < limit; i++){
                    msg.edit(`Retrieving Ep ${count}`);
                    episodeURL[i] = anime.episodes[i].url;
                    qualities[i] = await getQualities(episodeURL[i]);

                    ep[i] = qualities[i].qualities;

                    threeSixty[i] = ep[i].get('360p');
                    fourEighty[i] = ep[i].get('480p');
                    sevenTwenty[i] = ep[i].get('720p');
                    tenEighty[i] = ep[i].get('1080p');

                    quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url.replace(/\s/g, "%20") : '') : '';
                    quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url.replace(/\s/g, "%20") : '') : '';
                    quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url.replace(/\s/g, "%20") : '') : '';
                    quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url.replace(/\s/g, "%20") : '') : '';


                    results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
                    count++;
                }
                
                var desc = results[0];

                msg.edit(`**Link Grabbed! Results are shown below**`);

                let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ALL`)
                .setAuthor(`Animeout`, 'https://www.animeout.xyz/wp-content/uploads/2015/03/animeout-logo-v2.png', 'https://www.animeout.xyz/')
                .setDescription(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes. [Search on Site](https://www.animeout.xyz/?s=${options[1].replace(/\s/g, "%20")}&post_type=post)\n**====**\n${desc ? desc : "-"}`)
                .setTimestamp();

                message.channel.send(embed);
                // console.log(results.length)
                for(var x = 1; x < results.length; x++){
                    var embedMuch = new MessageEmbed()
                    embedMuch.addField(`====`, results[x], false)

                    message.channel.send(embedMuch)
                }
                return;
            }

            // IF NOT ALL
            // Minus 1 the episodes cause array start from 0
            var episodeSearch = options[2] - 1;
            // console.log(episodeSearch)

            // Check if episode valid or not
            if(episodeSearch > anime.episodes.length || episodeSearch < 0 || isNaN(episodeSearch)) {
                msg.edit(`**Invalid Episode Inputted!**`);

                let embed = new MessageEmbed()
                .setDescription(`No results found for **${options[1]}** Ep ${options[2]} in Animeout`)
                .setFooter(`If you are sure that you inputed a correct episode, you should go check the website database and see if they have the episodes or not`);
                
                return message.channel.send(embed);
            } 

            // Retrieving the data
            var episodeURL = anime.episodes[parseInt(episodeSearch)].url;
            var qualities = await getQualities(episodeURL);
            
            // console.log(qualities);

            var ep = qualities.qualities; //Store episodes url to make it easier 
            
            // To get the qualities
            var threeSixty = ep.get('360p');
            var fourEighty = ep.get('480p');
            var sevenTwenty = ep.get('720p');
            var tenEighty = ep.get('1080p');

            let embed = new MessageEmbed()
                .setTitle(`${anime.title} Ep ${options[2]}`)
                .setAuthor(`Animeout`, 'https://www.animeout.xyz/wp-content/uploads/2015/03/animeout-logo-v2.png', 'https://www.animeout.xyz/')
                .setDescription(`**Quality Options**`)
                .addField(`360p`, `[Click Here](${threeSixty ? (threeSixty.url ? threeSixty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
                .addField(`480p`, `[Click Here](${fourEighty ? (fourEighty.url ? fourEighty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
                .addField(`720p`, `[Click Here](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
                .addField(`1080p`, `[Click Here](${tenEighty ? (tenEighty.url ? tenEighty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
                .addField(`Search on Site`, `[Click Here](https://www.animeout.xyz/?s=${options[1].replace(/\s/g, "%20")}&post_type=post)`, true)
                .addField(`Tips`, `Click the blue one to download`, true)
                .addField(`Notes`, `Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available`, false)
                .setTimestamp();

                msg.edit(`**Link Grabbed! Results are shown below**`);
            return message.channel.send(embed);
        } else { // if wrong choice
            return message.channel.send(catchWrongArgs());
        }
    }
}

function catchWrongArgs() {
    let embed = new MessageEmbed()
    .setDescription(`Please enter the correct argument example should be like this :arrow_down:\`\`\`css\n${prefix}anidl [gogo] [azumanga daioh] [3]\`\`\`For more info use the help commands.`)

    return embed;
}

/*
old ideas
            // var stored = `**EP. ${options[2]}**\n[360p](${threeSixty ? (threeSixty.url ? threeSixty.url : "-") : "-"}) [480p](${fourEighty ? (fourEighty.url ? fourEighty.url : "-") : "-"}) [720p](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url : "-") : "-"}) [1080p](${tenEighty ? (tenEighty.url ? tenEighty.url : "-") : "-"})`
            // console.log(stored);
*/

/* All is not possible cause of the embed limits SO TO COUNTER IT JUST SENDS LOTS OF EMBEDS LOL
            // If all
            // if(options[2].toLowerCase() == "all"){
            //     var ep = []; // To stored episode info
            //     var threeSixty = []; // To stored quality
            //     var fourEighty = [];
            //     var sevenTwenty = [];
            //     var tenEighty = [];

            //     var quality360 = [];
            //     var quality480 = [];
            //     var quality720 = [];
            //     var quality1080 = [];

            //     var results = []; // Results to show
            //     var episodeURL = [];
            //     var qualities = [];

            //     // To limit the lists
            //     var limit = anime.episodes.length;
                
            //     if(anime.episodes.length > 25) {
            //         limit = 25
            //     }

            //     // Count the ep
            //     var count = 1;
            //     for (var i = 0; i < limit; i++){
            //         console.log(i);
            //         episodeURL[i] = anime.episodes[i].url;
            //         qualities[i] = await getQualities(episodeURL[i]);

            //         ep[i] = qualities[i].qualities;

            //         threeSixty[i] = ep[i].get('360p');
            //         fourEighty[i] = ep[i].get('480p');
            //         sevenTwenty[i] = ep[i].get('720p');
            //         tenEighty[i] = ep[i].get('1080p');

            //         quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url : '') : '';
            //         quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url : '') : '';
            //         quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url : '') : '';
            //         quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url : '') : '';


            //         results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
            //         count++;
            //     }
                
            //     var desc = results[0];
            //     console.log(desc);

            //     msg.edit(`**Anime Found!**`);
            //     return message.channel.send(results);

                // let embed = new MessageEmbed()
                // .setTitle(`${anime.title} Ep ALL`)
                // .setAuthor(`Gogoanime`, 'https://gogoanime.sh/img/icon/logo.png', 'https://gogoanime.sh/')
                // .setDescription(desc ? desc : "-")
                // .setFooter(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes`)
                // .setTimestamp();

                // console.log(results.length)
                // for(var x = 1; x < results.length; x++){
                //     embed.addField(`====`, results[x], false)
                //     // console.log(results.slice(x, count2));
                //     // count2++;

                //     if(x == (results.length - 1)){
                //         msg.edit(`**Anime Found!**`);

                //         return message.channel.send(embed);
                //     }
                // }
            // }
*/

// else ~> DEPRECATED (ANIMEFREAK IS NOT WORKING)
        // if (options[0].toLowerCase() == "animefreak" ) { // If animefreak
        //     const { search, getAnime, getQualities } = require('anigrab').sites.siteLoader(
        //         'animefreak'
        //     );
        //     // console.log(options);
        //     const msg = await message.channel.send('Searching for the anime...');

        //     const searchResults = await search(options[1]); // Initiates a search, this is a promise so can be awaited
        //         // console.log(searchResults);

        //     if (searchResults[0] == undefined) {
        //         let embed = new MessageEmbed()
        //         .setDescription(`No results found for **${options[1]}**! Maybe you type it wrong? The search is very sensitive for this one`)
        //         .setFooter(`If the problem keeps happening even though the anime exist on the site, please contact admin. Also please note that some anime doesn't have download links for some reason`);

        //         msg.edit(`**Anime Not Found!**`);
        //         return message.channel.send(embed);
        //     }

        //     msg.edit(`**Anime Found!** Retrieving Download Links...`);

        //     const { url } = searchResults[0]; // Use destructuring to get url of search result at index 0
        //     const anime = await getAnime(url); // Retrieves the title of the anime and it's episodes, again this is awaitable

        //     // If all
        //     if(options[2].toLowerCase() == "all"){
        //         var ep = []; // To stored episode info
        //         var threeSixty = []; // To stored quality
        //         var fourEighty = [];
        //         var sevenTwenty = [];
        //         var tenEighty = [];

        //         var quality360 = [];
        //         var quality480 = [];
        //         var quality720 = [];
        //         var quality1080 = [];

        //         var results = []; // Results to show
        //         var episodeURL = [];
        //         var qualities = [];

        //         // To limit the lists
        //         var limit = anime.episodes.length;
                
        //         if(anime.episodes.length > 25) {
        //             limit = 30
        //         }

        //         // Count the ep
        //         var count = 1;
        //         for (var i = 0; i < limit; i++){
        //             msg.edit(`Retrieving Ep ${count}`);
        //             episodeURL[i] = anime.episodes[i].url;
        //             qualities[i] = await getQualities(episodeURL[i]);

        //             ep[i] = qualities[i].qualities;

        //             threeSixty[i] = ep[i].get('360p');
        //             fourEighty[i] = ep[i].get('480p');
        //             sevenTwenty[i] = ep[i].get('720p');
        //             tenEighty[i] = ep[i].get('1080p');

        //             quality360[i] = threeSixty[i] ? (threeSixty[i].url ? threeSixty[i].url.replace(/\s/g, "%20") : '') : '';
        //             quality480[i] = fourEighty[i] ? (fourEighty[i].url ? fourEighty[i].url.replace(/\s/g, "%20") : '') : '';
        //             quality720[i] = sevenTwenty[i] ? (sevenTwenty[i].url ? sevenTwenty[i].url.replace(/\s/g, "%20") : '') : '';
        //             quality1080[i] = tenEighty[i] ? (tenEighty[i].url ? tenEighty[i].url.replace(/\s/g, "%20") : '') : '';


        //             results[i] = `**Ep. ${count}**\n[360p](${quality360[i]})/[480p](${quality480[i]})/[720p](${quality720[i]})/[1080p](${quality1080[i]})\n`;
        //             count++;
        //         }
                
        //         var desc = results[0];
        //         // console.log(desc);

        //         msg.edit(`**Link Grabbed! Results are shown below**`);

        //         let embed = new MessageEmbed()
        //         .setTitle(`${anime.title} Ep ALL`)
        //         .setAuthor(`Animefreak`, 'https://cdn.discordapp.com/attachments/799595012005822484/810895709766418472/animefreaktv.png', 'https://www.animefreak.tv/')
        //         .setDescription(`**Notes** Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available. Max episodes shown are 30 episodes. [Site Link (Ep 1)](${anime.episodes[0].url.replace(/\s/g, "%20")})\n**====**\n${desc ? desc : "-"}`)
        //         .setTimestamp();

        //         message.channel.send(embed);
        //         // console.log(results.length)
        //         for(var x = 1; x < results.length; x++){
        //             var embedMuch = new MessageEmbed()
        //             embedMuch.addField(`====`, results[x], false)

        //             message.channel.send(embedMuch)
        //         }
        //         return;
        //     }
            
        //     // IF NOT ALL
        //     // Minus 1 the episodes cause array start from 0
        //     var episodeSearch = options[2] - 1;
        //     // console.log(episodeSearch)

        //     // Check if episode valid or not
        //     if(episodeSearch > anime.episodes.length || episodeSearch < 0 || isNaN(episodeSearch)) {
        //         msg.edit(`**Invalid Episode Inputted!**`);

        //         let embed = new MessageEmbed()
        //         .setDescription(`No results found for **${options[1]}** Ep ${options[2]} in Animefreak`)
        //         .setFooter(`If you are sure that you inputed a correct episode, you should go check the website database and see if they have the episodes or not`);
                
        //         return message.channel.send(embed);
        //     } 

        //     // Retrieving the data
        //     var episodeURL = anime.episodes[parseInt(episodeSearch)].url;
        //     var qualities = await getQualities(episodeURL);
            
        //     // console.log(qualities);

        //     var ep = qualities.qualities; //Store episodes url to make it easier 
            
        //     // To get the qualities
        //     var threeSixty = ep.get('360p');
        //     var fourEighty = ep.get('480p');
        //     var sevenTwenty = ep.get('720p');
        //     var tenEighty = ep.get('1080p');

        //     let embed = new MessageEmbed()
        //         .setTitle(`${anime.title} Ep ${options[2]}`)
        //         .setAuthor(`Animefreak`, 'https://cdn.discordapp.com/attachments/799595012005822484/810895709766418472/animefreaktv.png', 'https://www.animefreak.tv/')
        //         .setDescription(`**Quality Options**`)
        //         .addField(`360p`, `[Click Here](${threeSixty ? (threeSixty.url ? threeSixty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
        //         .addField(`480p`, `[Click Here](${fourEighty ? (fourEighty.url ? fourEighty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
        //         .addField(`720p`, `[Click Here](${sevenTwenty ? (sevenTwenty.url ? sevenTwenty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
        //         .addField(`1080p`, `[Click Here](${tenEighty ? (tenEighty.url ? tenEighty.url.replace(/\s/g, "%20") : "-") : "-"})`, true)
        //         .addField(`Site Link (Ep 1)`, `[Click Here](${anime.episodes[0].url})`, true)
        //         .addField(`Tips`, `Click the blue one to download`, true)
        //         .addField(`Notes`, `Keep in mind that some anime doesn't have download links for some reason & it's rare for all qualities to be available`, false)
        //         .setTimestamp();

        //         msg.edit(`**Link Grabbed! Results are shown below**`);
        //     return message.channel.send(embed);
        // } 