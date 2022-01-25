const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const cities = require("all-the-cities");
const ct = require("countries-and-timezones");

module.exports = class extends Command {
	constructor() {
		super("citycoordinate", {
			aliases: ["cc"],
			categories: "info-misc",
			info: "Get city coordinate using the [all-the-cities](https://www.npmjs.com/package/all-the-cities)",
			usage: `${prefix}command/alias <link>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			return message.channel.send("Please enter a valid city name!");
		} else {
			var search = args.join(" ");

			var result = [];
			result = cities.filter((city) => city.name.match(capitalizeTheFirstLetterOfEachWord(search)));

			if (result[0] == undefined) {
				let embed = new MessageEmbed().setDescription("Can't find the city, maybe you type it wrong?");

				message.channel.send(embed);
			} else {
				//Location
				var location = [];
				location = result[0].loc.coordinates;

				//Timezone
				var timezones = [];
				timezones = ct.getTimezonesForCountry(result[0].country);
				var storedTZ = [];

				if (timezones == null) {
					storedTZ = "Not found";
				} else {
					for (var i = 0; i < timezones.length; i++) {
						storedTZ[i] = `${timezones[i].name} [${timezones[i].utcOffsetStr}]`;
					}
				}
				var tzString = storedTZ.join("\n");

				if (tzString.length > 1024) {
					tzString = tzString.substring(0, 1024);
				}

				let embed = new MessageEmbed()
					.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
					.setTitle(`${result[0].name} [${result[0].country}]`)
					.addField(`City ID`, result[0].cityId, true)
					.addField(`Feature Code`, result[0].featureCode, true)
					.addField(`Admin Code`, result[0].adminCode, true)
					.addField(`Population`, result[0].population, false)
					.addField(`Timezones in country [Might be cropped if it doesn't fit]`, `${tzString}`)
					.addField(`Coordinates/${result[0].loc.type}`, `\`${location[1]} ${location[0]}\``, false)
					.setTimestamp();

				message.channel.send(embed);
			}
		}

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function capitalizeTheFirstLetterOfEachWord(words) {
			var separateWord = words.toLowerCase().split(" ");
			for (var i = 0; i < separateWord.length; i++) {
				separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
			}
			return separateWord.join(" ");
		}
	}
};

/* Result example
[
  {
    cityId: 1642911,
    name: 'Jakarta',
    altName: '',
    country: 'ID',
    featureCode: 'PPLC',
    adminCode: '04',
    population: 8540121,
    loc: { type: 'Point', coordinates: [Array] }
  }
]
[ 106.84513, -6.21462 ]
*/

/*
[
  {
    name: 'Asia/Ujung_Pandang',
    country: 'ID',
    utcOffset: 480,
    utcOffsetStr: '+08:00',
    dstOffset: 480,
    dstOffsetStr: '+08:00',
    aliasOf: 'Asia/Makassar'
  },
  {
    name: 'Asia/Jakarta',
    country: 'ID',
    utcOffset: 420,
    utcOffsetStr: '+07:00',
    dstOffset: 420,
    dstOffsetStr: '+07:00',
    aliasOf: null
  },
  {
    name: 'Asia/Jayapura',
    country: 'ID',
    utcOffset: 540,
    utcOffsetStr: '+09:00',
    dstOffset: 540,
    dstOffsetStr: '+09:00',
  },
    name: 'Asia/Makassar',
    country: 'ID',
    utcOffset: 480,
    utcOffsetStr: '+08:00',
    dstOffset: 480,
    dstOffsetStr: '+08:00',
    aliasOf: null
  },
  {
    name: 'Asia/Pontianak',
    country: 'ID',
    utcOffset: 420,
    utcOffsetStr: '+07:00',
    dstOffset: 420,
    dstOffsetStr: '+07:00',
    aliasOf: null
  }
]
*/
