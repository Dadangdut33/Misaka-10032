const { Random } = require("../../../../local_dependencies/indexrandom.js");
const random = new Random();
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(){ 
    super('tickle', {
      categories: "action",
      aliases: ["No alias is set for this command"],
      info: "Tickles people lol. Images are fetched [Nekos.life API](https://nekos.life/)",
      usage: `${prefix}command [tag] [message]`,
      guildOnly: true,
    });
  }
  
  async run (message, args) {
    let User = message.mentions.members.first();

    if(!args[0]) {
        let data = await random.getAnimeImgURLV2("tickle");
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${message.author.username} tickles`)
        .setImage(data)

        message.channel.send(embed);    
    } else if (!User) {
        let data = await random.getAnimeImgURLV2("tickle");
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${message.author.username} tickles ${args.join(" ")}`)
        .setImage(data)

        message.channel.send(embed);   
    } 
  }
}