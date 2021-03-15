const weather = require('weather-js');
const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const Moment = require('moment-timezone');

module.exports = class extends Command {
  constructor() {
    super('weather', {
      aliases: ["No alias is set for this command"], 
      categories: 'info-misc',
      info: 'Gives weather information of given location',
      usage: `${prefix}weather <location>`,
      guildOnly: false,
    });
  }

  async run(message, args) {
    if(!args.length) {
      return message.channel.send("Please enter location that you want to observe")
    }
  
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
    try {
      // console.log(result[0]);
      var time = Moment.tz('Asia/Jakarta').format('dddd, YYYY-MM-D (HH:mm:ss)');

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
        .setThumbnail(result[0].current.imageUrl)
        for (var i = 0; i < result[0].forecast.length; i++){
          embed.addField(`${result[0].forecast[i].day}`, `Date: ${result[0].forecast[i].date}\nLow: ${result[0].forecast[i].low}\nHigh: ${result[0].forecast[i].low}\nSky: ${result[0].forecast[i].skytextday}\nPrecip: ${result[0].forecast[i].precip ? result[0].forecast[i].precip : "-"}`, true)
        }
        // .addField(`${result[0].forecast[0].day}\n(${result[0].forecast[0].date})`, `Low: ${result[0].forecast[0].low}\nHigh: ${result[0].forecast[0].low}\nSky: ${result[0].forecast[0].skytextday}\nPrecip: ${result[0].forecast[0].precip ? result[0].forecast[0].precip : "-"}`, true)
        // .addField(`${result[0].forecast[1].day}\n(${result[0].forecast[1].date})`, `Low: ${result[0].forecast[1].low}\nHigh: ${result[0].forecast[1].low}\nSky: ${result[0].forecast[1].skytextday}\nPrecip: ${result[0].forecast[1].precip ? result[0].forecast[1].precip : "-"}`, true)
        // .addField(`${result[0].forecast[2].day}\n(${result[0].forecast[2].date})`, `Low: ${result[0].forecast[2].low}\nHigh: ${result[0].forecast[2].low}\nSky: ${result[0].forecast[2].skytextday}\nPrecip: ${result[0].forecast[2].precip ? result[0].forecast[2].precip : "-"}`, true)
        // .addField(`${result[0].forecast[3].day}\n(${result[0].forecast[3].date})`, `Low: ${result[0].forecast[3].low}\nHigh: ${result[0].forecast[3].low}\nSky: ${result[0].forecast[3].skytextday}\nPrecip: ${result[0].forecast[3].precip ? result[0].forecast[3].precip : "-"}`, true)
        // .addField(`${result[0].forecast[4].day}\n(${result[0].forecast[4].date})`, `Low: ${result[0].forecast[4].low}\nHigh: ${result[0].forecast[4].low}\nSky: ${result[0].forecast[4].skytextday}\nPrecip: ${result[0].forecast[4].precip ? result[0].forecast[4].precip : "-"}`, true)
        embed.addField(`Source`, `[MSN](https://www.msn.com/)`, true);
        embed.setFooter(`Date Format: (Year-Month-Day)`)

        message.channel.send(embed)
    } catch(err) {
        console.log(err)
        return message.channel.send("Unable to get data of the given location")
      }
    });   
    
  }
}

/*
{
  location: {
    name: 'Ciledug, Indonesia',
    zipcode: undefined,
    lat: '-6.228',
    long: '106.705',
    timezone: '7',
    alert: '',
    degreetype: 'C',
    imagerelativeurl: 'http://blob.weather.microsoft.com/static/weather4/en-us/'
  },
  current: {
    temperature: '25',
    skycode: '11',
    skytext: 'Rain Showers',
    date: '2021-02-15',
    observationtime: '07:00:00',
    observationpoint: 'Ciledug, Indonesia',
    feelslike: '25',
    humidity: '94',
    winddisplay: '4 km/h South',
    day: 'Monday',
    shortday: 'Mon',
    windspeed: '4 km/h',
    imageUrl: 'http://blob.weather.microsoft.com/static/weather4/en-us/law/11.gif'
  },
  forecast: [
    {
      low: '24',
      high: '29',
      skycodeday: '9',
      skytextday: 'Rain Showers',
      date: '2021-02-14',
      day: 'Sunday',
      shortday: 'Sun',
      precip: ''
    },
    {
      low: '24',
      high: '29',
      skycodeday: '9',
      skytextday: 'Light Rain',
      date: '2021-02-15',
      day: 'Monday',
      shortday: 'Mon',
      precip: '100'
    },
    {
      low: '24',
      high: '29',
      skycodeday: '9',
      skytextday: 'Light Rain',
      date: '2021-02-16',
      day: 'Tuesday',
      shortday: 'Tue',
      precip: '100'
    },
    {
      low: '24',
      high: '30',
      skycodeday: '11',
      skytextday: 'Rain',
      date: '2021-02-17',
      day: 'Wednesday',
      shortday: 'Wed',
      precip: '100'
    },
    {
      low: '24',
      high: '29',
      skycodeday: '11',
      skytextday: 'Rain Showers',
      date: '2021-02-18',
      day: 'Thursday',
      shortday: 'Thu',
      precip: '100'
    }
  ]
}
*/