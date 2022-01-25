const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const Moment = require("moment-timezone");

module.exports = class extends Command {
	constructor() {
		super("weather", {
			aliases: ["No alias is set for this command"],
			categories: "info-misc",
			info: "Gives weather information of given location",
			usage: `${prefix}weather <location>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args.length) {
			return message.channel.send("Please enter location that you want to observe");
		}

		weather.find({ search: args.join(" "), degreeType: "C" }, function (err, result) {
			try {
				// console.log(result[0]);
				var time = Moment.tz("Asia/Jakarta").format("dddd, YYYY-MM-D (HH:mm:ss)");

				let embed = new MessageEmbed()
					.setTitle(`Showing Weather Condition of ${result[0].location.name} (${result[0].current.date})`)
					.setColor("RANDOM")
					.setDescription("Results may not be 100% accurate")
					.addField("Lat/Long", `${result[0].location.lat}/${result[0].location.long}`, true)
					.addField("Timezone", `${result[0].location.timezone}`, true)
					.addField("Alert", `${result[0].location.alert ? result[0].location.alert : "-"}`, true)
					.addField("Temperature/Feels Like", `${result[0].current.temperature}°C/${result[0].current.feelslike}°C`, true)
					.addField("Sky", result[0].current.skytext, true)
					.addField("Humidity", result[0].current.humidity, true)
					.addField("Wind", result[0].current.winddisplay, true)
					.addField("Observation Time", result[0].current.observationtime, true)
					.addField("Observation Point", result[0].current.observationpoint, true)
					// .addField(`Below are 5 days forecast`, `\`\`\`css\n    Current Date & Time: ${time}\`\`\``, false)
					.addField(`\`\`\`Current Date & Time: ${time}\`\`\``, `**5 days forecast**`, false)
					.setThumbnail(result[0].current.imageUrl);
				for (var i = 0; i < result[0].forecast.length; i++) {
					embed.addField(
						`${result[0].forecast[i].day}`,
						`Date: ${result[0].forecast[i].date}\nLow: ${result[0].forecast[i].low}\nHigh: ${result[0].forecast[i].low}\nSky: ${result[0].forecast[i].skytextday}\nPrecip: ${
							result[0].forecast[i].precip ? result[0].forecast[i].precip : "-"
						}`,
						true
					);
				}
				embed.addField(`Source`, `[MSN](https://www.msn.com/)`, true);
				embed.setFooter(`Date Format: (Year-Month-Day)`);

				message.channel.send(embed);
			} catch (err) {
				console.log(err);
				return message.channel.send("Unable to get data of the given location");
			}
		});
	}
};
