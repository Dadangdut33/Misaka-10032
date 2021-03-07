const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
  constructor() {
    super('avatar', {
      aliases: ['pp'],
      categories: 'info-server',
      info: 'Show avatar of tagged user',
      usage: `${prefix}command/alias [tagged user]`,
      guildOnly: true,
    });
  }

  async run(message, args) {
    let Embed = new MessageEmbed();
    if (!message.mentions.users.first()) {

      //Embed
      Embed.setTitle(`Your Profile! (${message.author.tag})`);
      Embed.setColor(`RANDOM`);
      Embed.setImage(message.author.displayAvatarURL({ format: 'jpg', size: 2048 }));
      Embed.addField(`Avatar URL`, `[Click Here!](${message.author.displayAvatarURL({ format: 'jpg', size: 2048 })})`)
      Embed.setFooter(`${message.author.username}'s Profile`)

      return message.channel.send(Embed);
    } else {
      let User = message.mentions.members.first();

      //Embed
      Embed.setTitle(`${message.client.users.cache.get(User.id).tag}'s Profile!`);
      Embed.setColor(`RANDOM`);
      Embed.setImage(message.client.users.cache.get(User.id).displayAvatarURL({ format: 'jpg', size: 2048 }));
      Embed.addField(`Avatar URL`, `[Click Here](${message.client.users.cache.get(User.id).displayAvatarURL({ format: 'jpg', size: 2048 })})`)
      Embed.setFooter(`Requested by ${message.author.username}`)

      return message.channel.send(Embed);
    }
  }
};