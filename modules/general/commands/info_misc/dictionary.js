const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = class extends Command {
  constructor() {
    super('dictionary', {
      aliases: ["dic", "dict"],
      categories: 'info-misc',
      info: 'Find the definition of a word from Oxford Dictionary using [Lexico](https://www.lexico.com/)',
      usage: `${prefix}command/alias <...>`,
      guildOnly: false,
    });
  }
  async run(message, args) {
    if (!args[0]) {
      return null;
    } else {

      //const query = encodeURIComponent(wordToDefine.join(this.usageDelim));
      const query = args.join(`_`);

      const author = 'Lexico (Powered By Oxford)'
      const thumbnail = 'https://i.imgur.com/4wHZP6c.png';
      const url = 'https://www.lexico.com/en/definition/'
      const link = url + query;


      await request(link)
        .then(definition => {
          const $ = cheerio.load(definition);
          const title = toTitleCase($('.entryWrapper').find('.hw').data('headword-id'));

          $('.entryWrapper').children('.gramb').each((i, el) => {
            const examples = `**Examples:**\n${$(el).find('.ex').first().text()}`;
            const meaning = $(el).find('.ind').text();
            const type = toTitleCase($(el).find('.pos').children('.pos').text());

            const description = [
              `\n\n**${type}:**`,
              `${meaning.replace(/\./g, `.\n\n`)}`,
              `${examples}`
            ].join('\n');
            //`${meaning.replace(/\./g, `.\n`)}`,

            const display = new MessageEmbed()
              .setAuthor(author)
              .setColor("RANDOM")
              .setTitle(title)
              .setDescription(description)
              .setThumbnail(thumbnail)
              .setURL(link);

            // console.log(meaning.join('\n'))
            // console.log(meaning.replace(/.|;/g, `.\n`))
            return message.channel.send(display);
          });
        })
        .catch(() => {
          // console.log(error);
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