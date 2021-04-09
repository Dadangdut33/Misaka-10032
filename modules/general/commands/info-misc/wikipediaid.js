const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const request = require('request-promise');

module.exports = class extends Command {
  constructor() {
    super('wikipediaid', {
      aliases: ["wikiid"],
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
      const authorlink = 'https://id.wikipedia.org/'
      const url = 'https://id.wikipedia.org/api/rest_v1/page/summary/';
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

/*
        const wiki = await request(link)
          .then(article => JSON.parse(article))
          .catch(error => {
            if (error.statusCode === 403) return message.channel.send('Wikipedia is down, try again later.');
            if (error.statusCode === 404) return message.channel.send(`I couldn\'t find that article on Wikipedia or maybe you type it wrong?`);
            else {
              return message.channel.send('Error');
            }
          });
          console.log(wiki);

        let embed = new MessageEmbed()
        .setAuthor(author)
        .setColor('RANDOM')
        .setDescription(`${wiki.extract}`)
        .setFooter(footer, footerpic)
        .setImage(`${wiki.thumbnail ? wiki.thumbnail.source : ''}`)
        .setTitle(`${wiki.title}`)
        .setURL(`${wiki.content_urls.desktop.page}`)
        .setTimestamp();

        return message.channel.send(embed);
          */