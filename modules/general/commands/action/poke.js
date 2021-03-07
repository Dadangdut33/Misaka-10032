const { Random } = require("../../../../local_dependencies/indexrandom.js");
const random = new Random();
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(){ 
    super('poke', {
      categories: "action",
      aliases: ["No alias is set for this command"],
      info: "Pokes others. Images are fetched from [Nekos.live API](https://nekos.life/)",
      usage: `${prefix}command [tag] [message]`,
      guildOnly: true,
    });
  }
  
  async run (message, args) {
    let User = message.mentions.members.first();

    if(!args[0]) {
        let data = await random.getAnimeImgURLV2("poke");
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${message.author.username} pokes`)
        .setImage(data)

        message.channel.send(embed);    
    } else {
        let data = await random.getAnimeImgURL("poke");
        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${message.author.username} pokes ${args.join(" ")}`)
        .setImage(data)

        message.channel.send(embed);
    } 
  }
}