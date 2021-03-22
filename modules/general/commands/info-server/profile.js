const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const Moment = require('moment-timezone');
const prettyMS = require('pretty-ms')

module.exports = class extends Command {
  constructor() {
    super('profile', {
      aliases: ['info', "avatar"],
      categories: 'info-server',
      info: 'Shows yours or tagged user information (Join date, ID, Avatar, & Roles)',
      usage: `${prefix}profile [tagged user] or ${prefix}alias [tagged user]`,
      guildOnly: true,
    });
  }

  async run(message, args) {
    let Embed = new MessageEmbed();
    let roles = [];
    if (!message.mentions.users.first()) {
      message.member.roles.cache.forEach((role) => {
        roles.push(role.name);
      });

      // console.log(message.author.presence)
      // console.log(message.author.presence.activities[0]);

      var state, name, type;
      if(message.author.presence.activities[0] !== undefined){
        if(message.author.presence.activities[0].name == null) {
          state = "-";
          name = "-";
          type = "-";
        } else {
          state = `${message.author.presence.activities[0].emoji ? `${message.author.presence.activities[0].emoji} ` : ""}${message.author.presence.activities[0].state ? message.author.presence.activities[0].state : "-"}`;
          name = message.author.presence.activities[0].name;
          type = message.author.presence.activities[0].type;
        }
      } else {
        state = "-";
        name = "-";
        type = "-";
      }

      var today = Moment().tz('Asia/Jakarta');
      var age = today - message.author.createdAt;

      //Embed
      Embed.setTitle(`Your Profile! (${message.author.tag})`);
      Embed.setThumbnail(message.author.displayAvatarURL({ format: 'jpg', size: 2048 }));
      Embed.setColor(`RANDOM`);
      Embed.addField(`Server Joined at`, `${Moment(message.member.joinedAt).tz('Asia/Jakarta').format('DD/MM/YYYY .(HH:mm:ss)').replace(`.`,`\n`)}`, true)
      Embed.addField(`ID`, `${message.author.id}`, true)
      Embed.addField(`User Status`, `${message.author.presence.status}`, true)
      Embed.addField(`Activity Name`, `${name}`, true)
      Embed.addField(`Activity Type`, `${type}`, true)
      Embed.addField(`Activity State`, `${state}`, true)
      Embed.addField(`Account Age`, `${prettyMS(age)}`, false)
      Embed.addField(`Account Created At`, `${Moment(message.author.createdAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700 (Western Indonesia Time)`, false)
      Embed.addField(`Roles`, `\`\`\`css\n${roles.join(`, `)}\`\`\``)
      Embed.addField(`Avatar URL`, `[JPG](${message.author.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [PNG](${message.author.displayAvatarURL({ format: 'png', size: 2048 })}) | [WEBP](${message.author.displayAvatarURL({ format: 'webp', size: 2048 })})`)
      Embed.setFooter(`${message.author.username}'s Profile`)
      Embed.setTimestamp();

      return message.channel.send(Embed);

    } else {
      let User = message.mentions.members.first();
      User.roles.cache.forEach((role) => {
        roles.push(role.name);
      });
      // console.log(User);

      if(User.nickname == null){
        User.nickname = `-`
      }

      var state;
      // console.log(User.presence.activities);
      // console.log(User.presence.activities[0].name);
      if(User.presence.activities[0] !== undefined){
        if(User.presence.activities[0].name == null) {
          state = "-";
          name = "-";
          type = "-";
        } else {
          state = `${User.presence.activities[0].emoji ? `${User.presence.activities[0].emoji} ` : ""}${User.presence.activities[0].state ? User.presence.activities[0].state : "-"}`;
          name = User.presence.activities[0].name;
          type = User.presence.activities[0].type;
          if (state == null) {
            state = "-";
          }
        }
      } else {
        state = "-";
        name = "-";
        type = "-";
      }

      var today = Moment().tz('Asia/Jakarta');
      var age = today - message.client.users.cache.get(User.id).createdAt;

      //Embed
      Embed.setTitle(`${message.client.users.cache.get(User.id).tag}'s Profile!`);
      Embed.setThumbnail(message.client.users.cache.get(User.id).displayAvatarURL({ format: 'jpg', size: 2048 }));
      Embed.setColor(`RANDOM`);
      Embed.addField(`Nickname`, User.nickname, false)
      Embed.addField(`Server Joined at`, `${Moment(User.joinedAt).tz('Asia/Jakarta').format('DD/MM/YYYY .(HH:mm:ss)').replace(`.`,`\n`)}`, true)
      Embed.addField(`ID`, `${User.id}`, true)
      Embed.addField(`User Status`, `${User.presence.status}`, true)
      Embed.addField(`Activity Name`, `${name}`, true)
      Embed.addField(`Activity Type`, `${type}`, true)
      Embed.addField(`Activity State`, `${state}`, true)
      Embed.addField(`Account Age`, `${prettyMS(age)}`, false)
      Embed.addField(`Account Created At`, `${Moment(message.client.users.cache.get(User.id).createdAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700 (Western Indonesia Time)`, false)
      Embed.addField(`Roles`, `\`\`\`css\n${roles.join(`, `)}\`\`\``)
      Embed.addField(`Avatar URL`, `[JPG](${message.client.users.cache.get(User.id).displayAvatarURL({ format: 'jpg', size: 2048 })}) | [PNG](${message.client.users.cache.get(User.id).displayAvatarURL({ format: 'png', size: 2048 })}) | [WEBP](${message.client.users.cache.get(User.id).displayAvatarURL({ format: 'webp', size: 2048 })})`)
      Embed.setFooter(`Requested by ${message.author.username}`)

      return message.channel.send(Embed);
    }
  }
};



/* 
Activity {
  name: 'Custom Status',
  type: 'CUSTOM_STATUS',
  url: null,
  details: null,
  state: "̿̿ ̿̿ ̿̿ ̿'̿'\\̵͇̿\\",
  applicationID: null,
  timestamps: null,
  party: null,
  assets: null,
  syncID: undefined,
  flags: ActivityFlags { bitfield: 0 },
  emoji: null,
  createdTimestamp: 1612699652436
*/

      /*
      var lm;
      if(User.lastMessageID == null){
        lm = `-`
      } else {
        lm = `[Click here](https://discord.com/channels/${message.guild.id}/${message.guild.systemChannelID}/${User.lastMessageID})`
      }

      var lmchannel;
      if(User.lastMessageChannelID == null){
        lmchannel = `-`
      } else {
        lmchannel = `[Click here](https://discord.com/channels/${message.guild.id}/${message.guild.systemChannelID}/${User.lastMessageChannelID})`
      }
      Embed.addField(`Last Message`, `${lm}`, false)
      Embed.addField(`In Channel`, `${lmchannel}`, false)
      */


/*
GuildMember {
  guild: <ref *1> Guild {
    members: GuildMemberManager {
      cacheType: [class Collection extends Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    channels: GuildChannelManager {
      cacheType: [class Collection extends Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    roles: RoleManager {
      cacheType: [class Collection extends Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    presences: PresenceManager {
      cacheType: [class Collection extends Collection],
      cache: [Collection [Map]]
    },
    voiceStates: VoiceStateManager {
      cacheType: [class Collection extends Collection],
      cache: Collection(0) [Map] {},
      guild: [Circular *1]
    },
    deleted: false,
    available: true,
    id: '791234592811122729',
    shardID: 0,
    name: 'tes server 2',
    icon: null,
    splash: null,
    region: 'singapore',
    memberCount: 7,
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
    systemChannelFlags: SystemChannelFlags { bitfield: 0 },
    maximumMembers: 100000,
    vanityURLCode: null,
    description: null,
    banner: null,
    rulesChannelID: null,
    publicUpdatesChannelID: null,
    ownerID: '311740375716986881',
    emojis: GuildEmojiManager {
      cacheType: [class Collection extends Collection],
      cache: Collection(0) [Map] {},
      guild: [Circular *1]
    }
  },
  user: User {
    id: '311740375716986881',
    bot: false,
    username: 'Dadangdut33',
    discriminator: '5264',
    avatar: '40ac6b5c30e049cee3ac3618f33bd937',
    flags: UserFlags { bitfield: 128 },
    lastMessageID: '807831156337803274',
    lastMessageChannelID: '791234593340653600'
  },
  joinedTimestamp: 1608715427411,
  lastMessageID: '807831156337803274',
  lastMessageChannelID: '791234593340653600',
  premiumSinceTimestamp: null,
  deleted: false,
  _roles: [],
  nickname: 'Dadang'
}
*/