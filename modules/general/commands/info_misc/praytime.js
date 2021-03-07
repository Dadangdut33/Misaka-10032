const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const adhan = require('adhan');
const moment = require('moment'); //Not used but kept here for future use (maybe) 
const Moment = require('moment-timezone');
const { prefix } = require("../../../../config");
const cities = require('all-the-cities');
const GraphemeSplitter = require('grapheme-splitter');
var splitter = new GraphemeSplitter();

module.exports = class extends Command {
    constructor() {
        super('praytime', {
            categories: 'info-misc',
            aliases: ["pt", "sholat", "adzan"],
            info: "Provide today's praytime, default timezone used are GMT+7. Calculation method using Muslim World League, dependencies used are moment-timezone and adhan. The default coordinate is Ciledug Indonesia but you can enter custom coordinate from google maps or custom city and also custom time zone as you can see in the usage section",
            usage: `${prefix}command/alias\`\`\`**or** \`\`\`css\n${prefix}command/alias <coordinates/coords> <coordinates1 coordinates2> [+/-] [GMT Timezone]\`\`\`**or**\`\`\`css\n${prefix}command/alias <city> "<cityname>" [[+/-] [GMT Timezone]] \`\`\`\`\`\`-> Notice the " and []`,
            guildOnly: false,
        });
    }

    async run(message, args) {
        if (!args[0]) { // DEFAULT
            //Get Coordinates
            var coordinates = new adhan.Coordinates(-6.224036603042286, 106.70806216188234); //Ciledug -6.224036603042286, 106.70806216188234

            //Set Up Data
            var date = new Date(); //Tidak dipakai karena bot di host online tapi diperlukan
            var params = adhan.CalculationMethod.MuslimWorldLeague();
            params.madhab = adhan.Madhab.Shafi;
            var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

            //Manual Adjustment (Dunno why but it's not working)
            params.adjustments.fajr = 0;
            params.adjustments.sunrise = 0;
            params.adjustments.dhuhr = 0;
            params.adjustments.asr = 0;
            params.adjustments.maghrib = 0;
            params.adjustments.isha = 4;

            //Get Praytime
            var fajrTime = Moment(prayerTimes.fajr).tz('Asia/Jakarta').format('h:mm A');
            var sunriseTime = Moment(prayerTimes.sunrise).tz('Asia/Jakarta').format('h:mm A');
            var dhuhrTime = Moment(prayerTimes.dhuhr).tz('Asia/Jakarta').format('h:mm A');
            var asrTime = Moment(prayerTimes.asr).tz('Asia/Jakarta').format('h:mm A');
            var maghribTime = Moment(prayerTimes.maghrib).tz('Asia/Jakarta').format('h:mm A');
            var ishaTime = Moment(prayerTimes.isha).tz('Asia/Jakarta').format('h:mm A');
            var qiblaDirection = adhan.Qibla(coordinates);

            //Dinamic
            var current = prayerTimes.currentPrayer();
            var next = prayerTimes.nextPrayer();

            //Current and next
            if (current == "fajr") {
                var nextPrayer = sunriseTime;
            } else
            if (current == "sunrise") {
                var nextPrayer = dhuhrTime;
            } else
            if (current == "dhuhr") {
                var nextPrayer = asrTime;
            } else
            if (current == "asr") {
                var nextPrayer = maghribTime;
            } else
            if (current == "maghrib") {
                var nextPrayer = ishaTime;
            } else
            if (current == "isha") {
                var nextPrayer = fajrTime;
                var next = fajrTime;
            }

            //Moment Date Format
            var date2 = Moment.tz('Asia/Jakarta').format('dddd DD MMMM YYYY');
            var time = Moment.tz('Asia/Jakarta').format('HH:mm:ss');

            //Send Result
            let embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`Praytime for ${date2}`)
                .setDescription("Time provided are based on \`GMT+7 Asia/Jakarta\`\nCoordinates: \`-6.22410, 106.70805 (Ciledug)\`")
                .addField(`Current Prayer Time`, `${current}`, true)
                .addField('Next Prayer', `${next}`, true)
                .addField('Next Prayer in', `${nextPrayer}`)
                .addField(`Below are the praytime for today`, "```css\n       Current Time: " + time + "```")
                .addFields({
                    name: "Fajr",
                    value: `${fajrTime}`,
                    inline: true
                }, {
                    name: "Sunrise",
                    value: `${sunriseTime}`,
                    inline: true
                }, {
                    name: "Dhuhr",
                    value: `${dhuhrTime}`,
                    inline: true
                }, {
                    name: "Asr",
                    value: `${asrTime}`,
                    inline: true
                }, {
                    name: "Maghrib",
                    value: `${maghribTime}`,
                    inline: true
                }, {
                    name: "Isha",
                    value: `${ishaTime}`,
                    inline: true
                })
                .setFooter(`GMT+0700 (Western Indonesia Time)`)

            message.channel.send(embed);

            //User input coordinates
        } else
        if (args[0] == "coordinates" || args[0] == "coords") { // COORDINATES

            
            if (isNaN(args[1] || isNaN(args[2]))){
                return errinfo();
            } 

            //Get coordinates
            let coord = []
            coord = args[1].replace(/,/g, ``); 
            var coordinates = new adhan.Coordinates(coord, args[2]);

            //Set Up Data
            var date = new Date(); //Tidak dipakai karena bot di host online tapi diperlukan
            var params = adhan.CalculationMethod.MuslimWorldLeague();
            params.madhab = adhan.Madhab.Shafi;
            var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

            //Declare Timezone
            let timezone;

            //Prevent wrong invalid timezone input
            if (args[4] > 13 || args[4] < -12) {
                let embed = new MessageEmbed()
                    .setTitle(`Invalid timezone provided`)
                    .setDescription(`The valid timezone are range from -12 to +13, that is the rule of physics`)
                    .setTimestamp();

                message.channel.send(embed);
            } else {
                //Get TImezone
                if (!args[3]) {
                    timezone = `-7`;
                } else
                if (args[3] == "+") {
                    timezone = `-${args[4]}`;
                } else
                if (args[3] == "-") {
                    timezone = `+${args[4]}`;
                }

                //Get Praytime
                var fajrTime = Moment(prayerTimes.fajr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var sunriseTime = Moment(prayerTimes.sunrise).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var dhuhrTime = Moment(prayerTimes.dhuhr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var asrTime = Moment(prayerTimes.asr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var maghribTime = Moment(prayerTimes.maghrib).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var ishaTime = Moment(prayerTimes.isha).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var qiblaDirection = adhan.Qibla(coordinates);

                //Dinamic
                var current = prayerTimes.currentPrayer();
                var next = prayerTimes.nextPrayer();

                //Current and next
                if (current == "fajr") {
                    var nextPrayer = sunriseTime;
                } else
                if (current == "sunrise") {
                    var nextPrayer = dhuhrTime;
                } else
                if (current == "dhuhr") {
                    var nextPrayer = asrTime;
                } else
                if (current == "asr") {
                    var nextPrayer = maghribTime;
                } else
                if (current == "maghrib") {
                    var nextPrayer = ishaTime;
                } else
                if (current == "isha") {
                    var nextPrayer = fajrTime;
                    var next = fajrTime;
                }

                //Moment Date Format
                var date2 = Moment.tz(`Etc/GMT${timezone}`).format('dddd DD MMMM YYYY');
                var time = Moment.tz(`Etc/GMT${timezone}`).format('HH:mm:ss');
                let zone = Moment.tz(`Etc/GMT${timezone}`).format('Z');

                //Send Result

                let embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Praytime for ${date2}`)
                    .setDescription(`Time provided are based on \`GMT${zone}\`. Default is GMT+7\nCoordinates: \`${coord}, ${args[2]}\``)
                    .addField(`Current Prayer Time`, `${current}`, true)
                    .addField('Next Prayer', `${next}`, true)
                    .addField('Next Prayer in', `${nextPrayer}`)
                    .addField(`Below are the praytime for today`, "```css\n       Current Time: " + time + "```")
                    .addFields({
                        name: "Fajr",
                        value: `${fajrTime}`,
                        inline: true
                    }, {
                        name: "Sunrise",
                        value: `${sunriseTime}`,
                        inline: true
                    }, {
                        name: "Dhuhr",
                        value: `${dhuhrTime}`,
                        inline: true
                    }, {
                        name: "Asr",
                        value: `${asrTime}`,
                        inline: true
                    }, {
                        name: "Maghrib",
                        value: `${maghribTime}`,
                        inline: true
                    }, {
                        name: "Isha",
                        value: `${ishaTime}`,
                        inline: true
                    })
                    .setFooter(`GMT${timezone}`)
                    .setTimestamp();

                message.channel.send(embed);
                if (!args[3]) {
                    info();
                }
            }
        } else if (args[0] == "city") { // CITY
            //SEARCH CITY
            var reg =  /(["'])(?:(?=(\\?))\2.)*?\1/;

            var search = reg.exec(args.join(" "));

            // console.log(search);
            if (search == null) return errorinfo();
            var searchClear = search[0].replace(/["']/g, "");

            var result = []
            result = cities.filter(city => city.name.match(capitalizeTheFirstLetterOfEachWord(searchClear)));

            // console.log(result);
            if (result[0] == undefined) return errorinfo();
            

            //Get Coordinates
            let coord = []
            coord = result[0].loc.coordinates;

            var coordinates = new adhan.Coordinates(coord[1], coord[0]);


            //Set Up Data
            var date = new Date(); //Tidak dipakai karena bot di host online tapi diperlukan
            var params = adhan.CalculationMethod.MuslimWorldLeague();
            params.madhab = adhan.Madhab.Shafi;
            var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

            //Declare Timezone
            let timezone;

            
                var reg2 = /\[(.*?)\]/;

                var tz = reg2.exec(args.join(" ")); //Clear one on index 1 for some reason
                // var clearTZ = tz[0].replace(/[\[\]]/g, ""); tz1
                var splitted = [];

                if (tz) {
                    var tzString = tz[1];

                    splitted = splitter.splitGraphemes(tzString);                   
                }

                //Prevent wrong invalid timezone input
                if (splitted[2] > 13 || splitted[2] < -12) {
                    let embed = new MessageEmbed()
                        .setTitle(`Invalid timezone provided`)
                        .setDescription(`The valid timezone are range from -12 to +13, that is the rule of physics`)
                        .setTimestamp();
    
                    return message.channel.send(embed);
                }

                //Get TImezone
                if (!splitted[0]) {
                    timezone = `-7`;
                } else
                if (splitted[0] == "+") {
                    timezone = `-${splitted[2]}`;
                } else
                if (splitted[0] == "-") {
                    timezone = `+${splitted[2]}`;
                } 

                //Get Praytime
                var fajrTime = Moment(prayerTimes.fajr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var sunriseTime = Moment(prayerTimes.sunrise).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var dhuhrTime = Moment(prayerTimes.dhuhr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var asrTime = Moment(prayerTimes.asr).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var maghribTime = Moment(prayerTimes.maghrib).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var ishaTime = Moment(prayerTimes.isha).tz(`Etc/GMT${timezone}`).format('h:mm A');
                var qiblaDirection = adhan.Qibla(coordinates);

                //Dinamic
                var current = prayerTimes.currentPrayer();
                var next = prayerTimes.nextPrayer();

                //Current and next
                if (current == "fajr") {
                    var nextPrayer = sunriseTime;
                } else
                if (current == "sunrise") {
                    var nextPrayer = dhuhrTime;
                } else
                if (current == "dhuhr") {
                    var nextPrayer = asrTime;
                } else
                if (current == "asr") {
                    var nextPrayer = maghribTime;
                } else
                if (current == "maghrib") {
                    var nextPrayer = ishaTime;
                } else
                if (current == "isha") {
                    var nextPrayer = fajrTime;
                    var next = fajrTime;
                }

                //Moment Date Format
                var date2 = Moment.tz(`Etc/GMT${timezone}`).format('dddd DD MMMM YYYY');
                var time = Moment.tz(`Etc/GMT${timezone}`).format('HH:mm:ss');
                let zone = Moment.tz(`Etc/GMT${timezone}`).format('Z');

                //Send Result

                let embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Praytime for ${date2}`)
                    .setDescription(`Time provided are based on \`GMT${zone}\`. Default is GMT+7\nCity: \`${result[0].name} - ${result[0].country}\`\nCoordinates: \`${coord[1]}, ${coord[0]}\``)
                    .addField(`Current Prayer Time`, `${current}`, true)
                    .addField('Next Prayer', `${next}`, true)
                    .addField('Next Prayer in', `${nextPrayer}`)
                    .addField(`Below are the praytime for today`, "```css\n       Current Time: " + time + "```")
                    .addFields({
                        name: "Fajr",
                        value: `${fajrTime}`,
                        inline: true
                    }, {
                        name: "Sunrise",
                        value: `${sunriseTime}`,
                        inline: true
                    }, {
                        name: "Dhuhr",
                        value: `${dhuhrTime}`,
                        inline: true
                    }, {
                        name: "Asr",
                        value: `${asrTime}`,
                        inline: true
                    }, {
                        name: "Maghrib",
                        value: `${maghribTime}`,
                        inline: true
                    }, {
                        name: "Isha",
                        value: `${ishaTime}`,
                        inline: true
                    })
                    .setFooter(`GMT${zone}`)
                    .setTimestamp();

                message.channel.send(embed);
                if (!splitted[0]) {
                    info2();
                }
            
        }
        function errinfo(){
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Invalid coordinate provided!`)
            .setDescription(`For more detailed info please check using the help command. Example :arrow_down:\`\`\`css\n${prefix}pt coordinates 21.403643126916453 39.8159612615235\`\`\``);


            message.channel.send(embed);
        }

        function info() {
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`You can also enter custom timezone`)
                .setDescription(`For more detailed info please check using the help command. Example :arrow_down:\`\`\`css\n${prefix}pt coordinates 21.403643126916453 39.8159612615235 + 3\`\`\`Above are example to check praytime in Mecca. If you want to check the timezones of cities you can check using the \`citycoordinate\` command`);
            // .setFooter(message.guild.me.displayName, message.client.user.displayAvatarURL())
            // .setTimestamp();

            message.channel.send(embed);
        }

        function info2() {
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`You can also enter custom timezone`)
                .setDescription(`For more detailed info please check using the help command. Example :arrow_down:\`\`\`css\n${prefix}pt city "Mecca" [+ 3]\`\`\`Above are example to check praytime in Mecca. If you want to check the timezones of cities you can check using the \`citycoordinate\` command`);

            message.channel.send(embed);
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function errorinfo(){
            let embed = new MessageEmbed()
            .setTitle(`Error`)
            .setDescription(`City not found, maybe you type it wrong? Correct example should be like this :arrow_down:\`\`\`css\n${prefix}pt city "Mecca"\`\`\``)

            return message.channel.send(embed);
        }

        function capitalizeTheFirstLetterOfEachWord(words) {
            var separateWord = words.toLowerCase().split(' ');
            for (var i = 0; i < separateWord.length; i++) {
               separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
               separateWord[i].substring(1);
            }
            return separateWord.join(' ');
        }
    }
}