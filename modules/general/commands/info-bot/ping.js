const { stripIndents } = require('common-tags');
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');

module.exports = class extends Command {
  constructor() {
    super('ping', {
      aliases: ['p'], 
      categories: 'info-bot',
      info: 'Get the ping of the bot',
      usage: `${prefix}ping or ${prefix}alias`,
      guildOnly: false,
    });
  }

  async run(message) {
    const msg = await message.channel.send('🏓 Pinging...');
    const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);

    if (ping <= 0) {
      return msg.edit('Please try again...');
    }

    return msg.edit(
      `🏓 Pong\n>>> Latency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(message.client.ws.ping)}ms`
    );
  }
};
