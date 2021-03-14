const currentlyAiringAnime = require('currently-airing-anime')
const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const fetch = require("node-fetch");
const { id } = require('common-tags');
global.fetch = fetch
const { paginationEmbed } = require('../../../../local_dependencies/functions.js');
const emojiList = ['⏪', '⏩', '❌'];

module.exports = class extends Command {
    constructor(){ 
        super('airing', {
        categories: "anime",
        aliases: ["No alias is set for this command"],
        info: "Get current season's airing information using the [currently-airing-anime npm](https://github.com/ricklancee/currently-airing-anime)",
        usage: `${prefix}command`,
        guildOnly: false,
        });
    }
    async run (message) {
        currentlyAiringAnime({
            // sort: ['POPULARITY'],
            // includeSchedule: true
        }).then(({shows, next}) => {

            //1st Half
            var title1 = [], airing1 = [], days1 = [], status1 = [];
            var firstHalf = shows.length/2;
            for (var i = 0; i < firstHalf; i++){
                var result = shows[i];

                title1[i] = result.title.romaji;
                if (title1[i].length > 55) {
                    title1[i] = title1[i].substring(0,55);
                }

                // status1[i] = result.status.toLowerCase();

                // status1[i] = capitalizeFirstLetter(status1[i]);

                if (result.nextAiringEpisode){
                    airing1[i] = result.nextAiringEpisode.timeUntilAiring;

                    days1[i] = secondsToDhms(airing1[i]);
                }
            }

            // 2nd Half
            var count = 0;
            var title2 = [], airing2 = [], days2 = [], status2 = [];
            for (var j = firstHalf; j < 50; j++){
                var result = shows[j]

                count++;
                title2[count] = result.title.romaji;
                if (title2[count].length > 55) {
                    title2[count] = title2[count].substring(0,55);
                }

                // status2[count] = result.status.toLowerCase();

                // status2[count] = capitalizeFirstLetter(status2[count]);

                if (result.nextAiringEpisode){
                    airing2[count] = result.nextAiringEpisode.timeUntilAiring;

                    days2[count] = secondsToDhms(airing2[count])

                }
            }

            // Embed pages
            var pages;
            var animePage1 = [];
            for (var i = 0; i < title1.length; i ++) {
                if(days1[i] == undefined) {
                    days1[i] = "-"
                }

                animePage1.push(`**${title1[i]}**\nNext Ep in: ${days1[i]}`); 
            }

            let page1 = new MessageEmbed()
            .setAuthor(`Click For Web View`, ``, `https://ricklancee.github.io/currently-airing-anime/`)
            .setTitle(`Current Season's Anime`)
            .setDescription(animePage1.join("\n\n"))
            .setTimestamp();

            var animePage2 = [];
            for (var i = 0; i < title2.length; i ++) {
                if(days2[i] == undefined) {
                    days2[i] = "-"
                }

                animePage2.push(`**${title2[i]}**\nNext Ep in: ${days2[i]}`); 
            }

            let page2 = new MessageEmbed()
            .setTitle(`Current Season's Anime`)
            .setDescription(animePage2.join("\n\n"));

            // Next page
            if (next) {    
                next().then(({shows}) => {{
                    let titleNext = [], statusNext = [], airingNext = [], daysNext = [];
                    for (var k = 0; k < shows.length; k++){
                        var result = shows[k];

                        titleNext[k] = result.title.romaji;
                        if (titleNext[k].length > 55) {
                            titleNext[k] = titleNext[k].substring(0,55);
                        }
        
                        // statusNext[k] = result.status.toLowerCase();
        
                        // statusNext[k] = capitalizeFirstLetter(statusNext[k]);
        
                        if (result.nextAiringEpisode){
                            airingNext[k] = result.nextAiringEpisode.timeUntilAiring;
        
                            daysNext[k] = secondsToDhms(airingNext[k]);
                        }
                    }

                    var animePage3 = [];
                    for (var i = 0; i < titleNext.length; i ++) {
                        if(daysNext[i] == undefined) {
                            daysNext[i] = "-"
                        }

                        animePage3.push(`**${titleNext[i]}**\nNext Ep in: ${daysNext[i]}`); 
                    }

                    let page3 = new MessageEmbed()
                    .setTitle(`Current Season's Anime`)
                    .setDescription(animePage3.join("\n\n"));

                    pages = [
                        page1,
                        page2,
                        page3
                      ]
                
                    paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
                }})
            } else { // If no next
                pages = [
                    page1,
                    page2
                  ]
            
                paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
            }

        })
    }
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";    
    // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    // return dDisplay + hDisplay + mDisplay + sDisplay;
    return dDisplay + "+ " + h + ":" + m + ":" + s;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }