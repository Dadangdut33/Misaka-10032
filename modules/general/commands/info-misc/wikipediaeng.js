const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const request = require('request-promise');

module.exports = class extends Command {
  constructor() {
    super('wikipediaeng', {
      aliases: ["wikien", "wikieng"],
      categories: 'info-misc',
      info: 'Finds an English Wikipedia Article by title.',
      usage: `${prefix}command/alias <...>`,
      guildOnly: false,
    });
  }

  async run(message, args) {
    if (!args[0]) {
      return null;
    } else {
      // const query = encodeURIComponent(searchTerm).replace('-', '_');
      const query = args.join(`_`);

      const footer = `Requested by ${message.author.username}`;
      const footerpic = message.author.displayAvatarURL()
      const author = '© Wikipedia.org';
      const authorpic = 'https://i.imgur.com/fnhlGh5.png';
      const authorlink = 'https://en.wikipedia.org/'
      const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
      const link = url + query;

      request(link)
        .then(article => {
          var data = JSON.parse(article)

          let embed = new MessageEmbed()
            .setAuthor(author, authorpic, authorlink)
            .setColor('RANDOM')
            .setDescription(`${data.extract}`)
            .setFooter(footer, footerpic)
            // .setImage(`${data.thumbnail ? data.thumbnail.source : ''}`)
            .setThumbnail(`${data.thumbnail ? data.thumbnail.source : ''}`)
            .setTitle(`${data.title}`)
            .setURL(`${data.content_urls.desktop.page}`)
            .setTimestamp();

          return message.channel.send(embed);
        })
        .catch(error => {
          if (error.statusCode === 403) return message.channel.send('Wikipedia is down, try again later.');
          if (error.statusCode === 404) return message.channel.send(`I couldn\'t find that article on Wikipedia or maybe you type it wrong?`);
          else {
            return message.channel.send('Error');
          }
        });
    }
  }
}

/* RESULT EXAMPLE
{ 
  type: 'standard',
  title: 'Indonesia',
  displaytitle: 'Indonesia',
  namespace: { id: 0, text: '' },
  wikibase_item: 'Q252',
  titles: {
    canonical: 'Indonesia',
    normalized: 'Indonesia',
    display: 'Indonesia'
  },
  pageid: 14579,
  thumbnail: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/320px-Flag_of_Indonesia.svg.png',
    width: 320,
    height: 213
  },
  originalimage: {
    source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/900px-Flag_of_Indonesia.svg.png',
    width: 900,
    height: 600
  },
  lang: 'en',
  dir: 'ltr',
  revision: '1004710632',
  tid: '1ba8b070-667c-11eb-87b7-f598ce54099f',
  timestamp: '2021-02-04T00:00:59Z',
  description: 'Country in Southeast Asia and Oceania',
  description_source: 'local',
  coordinates: { lat: -5, lon: 120 },
  content_urls: {
    desktop: {
      page: 'https://en.wikipedia.org/wiki/Indonesia',
      revisions: 'https://en.wikipedia.org/wiki/Indonesia?action=history',
      edit: 'https://en.wikipedia.org/wiki/Indonesia?action=edit',
      talk: 'https://en.wikipedia.org/wiki/Talk:Indonesia'
    },
    mobile: {
      page: 'https://en.m.wikipedia.org/wiki/Indonesia',
      revisions: 'https://en.m.wikipedia.org/wiki/Special:History/Indonesia',
      edit: 'https://en.m.wikipedia.org/wiki/Indonesia?action=edit',
      talk: 'https://en.m.wikipedia.org/wiki/Talk:Indonesia'
    }
  },
  extract: "Indonesia, officially the Republic of Indonesia, is a country in Southeast Asia and Oceania, between the Indian and Pacific oceans. It consists of more than seventeen thousand 
islands, including Sumatra, Java, Sulawesi, and parts of Borneo (Kalimantan) and New Guinea (Papua). Indonesia is the world's largest island country and the 14th-largest country by land area, at 1,904,569 square kilometres. With more than 270.2 million people, Indonesia is the world's 4th-most populous country as well as the most populous Muslim-majority country. Java, the 
world's most populous island, is home to more than half of the country's population.",
  extract_html: "<p><b>Indonesia</b>, officially the <b>Republic of Indonesia</b>, is a country in Southeast Asia and Oceania, between the Indian and Pacific oceans. It consists of more than seventeen thousand islands, including Sumatra, Java, Sulawesi, and parts of Borneo (Kalimantan) and New Guinea (Papua). Indonesia is the world's largest island country and the 14th-largest country by land area, at 1,904,569 square kilometres. With more than 270.2 million people, Indonesia is the world's 4th-most populous country as well as the most populous Muslim-majority country. Java, the world's most populous island, is home to more than half of the country's population.</p>"
}
*/