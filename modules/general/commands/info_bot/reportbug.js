const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');
const Moment = require('moment-timezone');

module.exports = class extends Command {
  constructor() {
    super('reportbug', {
      aliases: ['bugreport', 'contact'], 
      categories: 'info-bot',
      info: 'Report bugs to the bot. It will then be reviewed manually',
      usage: `${prefix}command <bugs detail>`,
      guildOnly: true,
    });
  }

  async run(message, args) {
    if(!args[0])
        return message.reply("What do you want to report?").then(msg => msg.delete({timeout: 5000}));

    // console.log(message.client)
    
    message.author.send(`Thanks for reporting the bug. It will be reviewed as soon as possible`);
    message.delete();

    var attachmentName = message.attachments.map(attachment => attachment.name);

    var attachmentURL = message.attachments.map(attachment => attachment.proxyURL);

    if(attachmentName == ""){
        attachmentName = "No Attachment"
    } else{
        attachmentName = `${attachmentName}`
    }

    if(attachmentURL == ""){
        attachmentURL = ""
    } else {
        attachmentURL = `[Click Here for The Attachment](${attachmentURL})`
    }

    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
    .setTitle(`Reported A Bug`)
    .setDescription(args.join(" "))
    .addField(`Reported at`, Moment(message.createdAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss'), false)
    .addField(`Message Details`, `**From**\nServer: ${message.guild}\nChannel Name: ${message.channel.name}\nChannel ID: ${message.channel.id}`, true)
    .addField(`Attachments`, `${attachmentName}\n${attachmentURL}`, false)
    .addField(`User Details`, `Username: ${message.author.username}\nDiscriminator: ${message.author.discriminator}`)
    .setFooter('Time in GMT + 7')
    .setTimestamp()

    message.client.channels.cache.get('817652855166074900').send(embed); // This get sends to bug reported channel in ppw
  }
};

/*
<ref *2> Message {
  channel: <ref *1> TextChannel {
    type: 'text',
    deleted: false,
    id: '791234593340653600',
    name: 'general',
    rawPosition: 0,
    parentID: '791234593340653598',
    permissionOverwrites: Collection(0) [Map] {},
    topic: null,
    nsfw: undefined,
    lastMessageID: '813270779840036904',
    rateLimitPerUser: 0,
    lastPinTimestamp: 1613870764000,
    guild: Guild {
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      roles: [RoleManager],
      presences: [PresenceManager],
      voiceStates: [VoiceStateManager],
      deleted: false,
      available: true,
      id: '791234592811122729',
      shardID: 0,
      name: 'tes server 2',
      icon: '85cfff1503e446bbbf8f2e53fa6bb962',
      splash: null,
      region: 'singapore',
      memberCount: 6,
      large: false,
      features: [],
      applicationID: null,
      afkTimeout: 300,
      afkChannelID: null,
      systemChannelID: '791234593340653600',
      embedEnabled: undefined,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      verificationLevel: 'NONE',
      explicitContentFilter: 'DISABLED',
      mfaLevel: 0,
      joinedTimestamp: 1611046751961,
      defaultMessageNotifications: 'ALL',
      systemChannelFlags: [SystemChannelFlags],
      maximumMembers: 100000,
      vanityURLCode: null,
      description: null,
      banner: null,
      rulesChannelID: null,
      publicUpdatesChannelID: null,
      ownerID: '311740375716986881',
      emojis: [GuildEmojiManager]
    },
    messages: MessageManager {
      cacheType: [class LimitedCollection extends Collection],
      cache: [LimitedCollection [Map]],
      channel: [Circular *1]
    },
    _typing: Map(1) { '311740375716986881' => [Object] }
  },
  deleted: false,
  id: '813270779840036904',
  type: 'DEFAULT',
  content: '!!reportbug test',
  author: User {
    id: '311740375716986881',
    bot: false,
    username: 'Dadangdut33',
    discriminator: '5264',
    avatar: '03ba372810baa3fb7735dd5c3a64874a',
    flags: UserFlags { bitfield: 128 },
    lastMessageID: '813270779840036904',
    lastMessageChannelID: '791234593340653600'
  },
  pinned: false,
  tts: false,
  nonce: '813270778811252736',
  system: false,
  embeds: [],
  attachments: Collection(0) [Map] {},
  createdTimestamp: 1613969263754,
  editedTimestamp: null,
  reactions: ReactionManager {
    cacheType: [class Collection extends Collection],
    cache: Collection(0) [Map] {},
    message: [Circular *2]
  },
  mentions: MessageMentions {
    everyone: false,
    users: Collection(0) [Map] {},
    roles: Collection(0) [Map] {},
    _members: null,
    _channels: null,
    crosspostedChannels: Collection(0) [Map] {}
  },
  webhookID: null,
  application: null,
  activity: null,
  _edits: [],
  flags: MessageFlags { bitfield: 0 },
  reference: null
}
*/