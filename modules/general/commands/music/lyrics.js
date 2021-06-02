const { MessageEmbed } = require("discord.js")
const Genius = new (require("genius-lyrics")).Client(process.env.Genius_Key);
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');

module.exports = class extends Command {
  constructor() {
    super('lyrics', {
      aliases: ["ly"],
      categories: 'music',
      info: 'Get lyrics of song. Source from genius.com',
      usage: `${prefix}lyrics <song name> or ${prefix}alias <song name>`,
      guildOnly: false,
    });
  }

  async run(message, args) {
    let embed = new MessageEmbed()
      .setDescription("Looking For Lyrics ...")
      .setColor("YELLOW")

    if (!args.length) {
      return message.channel.send("Please Type In The Song Name")
    }

    const msg = await message.channel.send(embed)
    try {
      const songs = await Genius.tracks.search(args.join(" "));
      const lyrics = await songs[0].lyrics();

      if(lyrics.length == 0){
        msg.delete();
        let embed = new MessageEmbed()
        .setTitle(`Something went Wrong!`)
        .setDescription(`Lyrics won't load, please try again!`)
        
        message.channel.send(embed);
        return;
      }

      const edited = new MessageEmbed()
      .setTitle(songs[0].title)
      .setURL(songs[0].url)
      .addField(`Lyrics State`, songs[0].raw.lyrics_state, true)
      .addField(`Released At`, songs[0].releasedAt, true)
      .setImage(songs[0].image)
      .setColor("YELLOW")

      msg.edit(edited)
      var start = 0, end = 2048;
      for (let i = 0; i < Math.ceil(lyrics.length / 2048); i++) {
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(lyrics.slice(start, end));

        start += 2048;
        end += 2048;
        console.log(i);
        message.channel.send(embed);
      }
    } catch (e) {
      embed.setDescription("Got err : " + e)
      msg.edit(embed)
      console.log(e);
    }
  }

}