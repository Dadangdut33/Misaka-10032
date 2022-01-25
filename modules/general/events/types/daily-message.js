const cron = require("cron");
const adhan = require("adhan");
const Moment = require("moment-timezone");
const { MessageEmbed } = require("discord.js");

// dailyMessage(client, '640790707082231834', '832439834609844235');

module.exports = async (client, guildID, channelID) => {
	const guild = client.guilds.cache.get(guildID);
	if (!guild) return console.log("Invalid guild for daily message");
	try {
		const theID = channelID;
		const data = await fetch(`https://api.banghasan.com/quran/format/json/acak`);
		const dataParsed = await data.json();

		let embedAyat = new MessageEmbed()
			.setAuthor(`Random Ayat of the day`)
			.setTitle(`Q.S. ${dataParsed.surat.nama}: ${dataParsed.surat.nomor} ${dataParsed.surat.asma} (${dataParsed.acak.id.ayat})`)
			.setDescription(`${dataParsed.acak.ar.teks}\n\n**Terjemahan**: \n${dataParsed.acak.id.teks}`)
			.setColor("RANDOM");

		let scheduledMessage = new cron.CronJob(
			"00 00 07 * * *",
			() => {
				// This runs every day at 07:00:00, you can do anything you want
				var apiError = false;
				if (dataParsed.status == "error") {
					apiError = true;
					console.log(dataParsed.pesan);
				}
				// Default for local time
				var coordinates = new adhan.Coordinates(-6.224036603042286, 106.70806216188234); //Ciledug -6.224036603042286, 106.70806216188234

				//Set Up Data
				var date = new Date(); // Date UTC + 0
				var params = adhan.CalculationMethod.MuslimWorldLeague();
				params.madhab = adhan.Madhab.Shafi;
				var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

				//Get Praytime
				var fajrTime = Moment(prayerTimes.fajr).tz("Asia/Jakarta").format("h:mm A");
				var sunriseTime = Moment(prayerTimes.sunrise).tz("Asia/Jakarta").format("h:mm A");
				var dhuhrTime = Moment(prayerTimes.dhuhr).tz("Asia/Jakarta").format("h:mm A");
				var asrTime = Moment(prayerTimes.asr).tz("Asia/Jakarta").format("h:mm A");
				var maghribTime = Moment(prayerTimes.maghrib).tz("Asia/Jakarta").format("h:mm A");
				var ishaTime = Moment(prayerTimes.isha).tz("Asia/Jakarta").format("h:mm A");

				//Moment Date Format
				var date2 = Moment.tz("Asia/Jakarta").format("dddd DD MMMM YYYY");
				var time = Moment.tz("Asia/Jakarta").format("HH:mm:ss");

				//Send Result
				let embedPray = new MessageEmbed()
					.setColor("RANDOM")
					.setTitle(`Daily Praytime for ${date2} - Ciledug`)
					.addField(`Below are the praytime for today`, "```css\n       Current Time: " + time + "```")
					.addFields(
						{ name: "Fajr", value: `${fajrTime}`, inline: true },
						{ name: "Sunrise", value: `${sunriseTime}`, inline: true },
						{ name: "Dhuhr", value: `${dhuhrTime}`, inline: true },
						{ name: "Asr", value: `${asrTime}`, inline: true },
						{ name: "Maghrib", value: `${maghribTime}`, inline: true },
						{ name: "Isha", value: `${ishaTime}`, inline: true }
					)
					.setFooter(`GMT+0700 (Western Indonesia Time)`);

				let channel = guild.channels.cache.get(theID);
				channel.send(embedPray);
				if (!apiError) {
					channel.send(embedAyat);
				}
			},
			null,
			true,
			"Asia/Jakarta"
		);

		// When you want to start it, use:
		scheduledMessage.start();

		console.log(`Module: Daily-Message Loaded | Loaded from local module`);
	} catch (e) {
		throw e;
	}
};
