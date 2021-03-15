const { MessageEmbed } = require("discord.js");
const { prefix, build } = require("../../../../config");
const { Command } = require('../../../../handler');
const Moment = require('moment-timezone');
const prettyMS = require('pretty-ms')

module.exports = class extends Command {
  constructor() {
    super('uptime', {
      aliases: ['No alias is set for this command'], 
      categories: 'info-bot',
      info: 'Get info of bot\'s uptime',
      usage: `${prefix}uptime`,
      guildOnly: true,
    });
  }

  async run(message) {
    let embed = new MessageEmbed()
    .setAuthor(`${message.guild.me.displayName} Ver. ${build}`, `${message.client.user.displayAvatarURL()}`)
    .addField('Booted up on', `${Moment(message.client.readyAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')}`, false)
    .addField('Total Uptime', prettyMS(message.client.uptime), false)

    return message.channel.send(embed);
  }
};
