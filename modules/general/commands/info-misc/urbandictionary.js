const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = class extends Command {
  constructor() {
    super('urbandictionary', {
      aliases: ["urban"],
      categories: 'info-misc',
      info: 'Find the definition of a word from [Urbandictinoary](https://www.urbandictionary.com/)',
      usage: `${prefix}command/alias <...>`,
      guildOnly: false,
    });
  }
  async run(message, args) {
    if (!args[0]) {
      return null;
    } else {
      const query = args.join(`%20`);

      // const author = "Urban Dictionary";
      const url = 'https://www.urbandictionary.com/define.php?term=';
      const thumbnail = "https://naeye.net/wp-content/uploads/2018/05/Urban-Dictionary-logo-475x300.png";
      const link = url + query;

      await request(link)
        .then(definition => {
          const $ = cheerio.load(definition);

          //Limit it to 3
          $('.def-panel').slice(0,3).each((i, el) => {
            const author = $(el).find('.ribbon').text()
            const title = toTitleCase($(el).find('.word').text());
            const meaning = $(el).children('.meaning').text();
            const contributor = $(el).children('.contributor').children('a').text();
            const examples = $(el).find('.example').text();
            const upvotes = $(el).find('.up').children('.count').text();
            const downvotes = $(el).find('.down').children('.count').text();

            const description = [
              `${meaning}`,
              `\n**Examples:**\n${examples}`,
              `\n**Author:** ${contributor}`
            ].join('\n');

            let display = new MessageEmbed()
              .setAuthor(author)
              .setColor('RANDOM')
              .setThumbnail(thumbnail)
              .setURL(url)
              .addField("Upvotes", `\\👍 ${upvotes}`, true)
              .addField("Downvotes", `\\👎 ${downvotes}`, true)
              .setDescription(description)
              .setTitle(title);

            return message.channel.send(display);
          })
        })
        .catch(() => {
          // console.log(error)
          return message.channel.send('No definition found, please enter a correct word!');
        });
    }
  }
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}