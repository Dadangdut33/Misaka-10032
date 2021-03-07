const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix, PPW_invite } = require("../../../../config");
const Moment = require('moment-timezone');
const prettyMS = require('pretty-ms')

module.exports = class extends Command {
    constructor() {
      super('serverinfo', {
        aliases: ['si', 'server'],
        categories: 'info-server',
        info: 'Get current server info',
        usage: `${prefix}command/alias`,
        guildOnly: true,
      });
    }

    async run(message, args) {
        if (!args[0]){
          var emoji = []; 
          emoji = getEmoji();

          var emojiList = [];
          if(emoji == ""){
            emojiList[0] = "No custom emoji in server"
          } else {
            for (var i = 0; i < emoji.length; i++){
              emojiList[i] = `<:${emoji[i].name}:${emoji[i].id}>` 
            }
          }

          var emoji1 = [];
          var emoji2 = [];
          for (var i = 0; i < 25; i ++){
            emoji1[i] = emojiList[i];
          }

          for (var i = 25; i < 50; i ++){
            emoji2[i] = emojiList[i];
          }
          if (!emoji2[25]){
            emoji2[25] = "-"
          }

          var today = Moment().tz('Asia/Jakarta');
          var age = today - message.guild.createdAt;

          let embed = new MessageEmbed()
          .setThumbnail(message.guild.iconURL(({ format: 'jpg', size: 2048 })))
          .setAuthor(message.guild.name, message.guild.iconURL(({ format: 'jpg', size: 2048 })), `https://discord.com/channels/${message.guild.id}`)
          .setTitle(`Server Information`)
          .setDescription(`[Get Server Icon](${message.guild.iconURL(({ format: 'jpg', size: 2048 }))})`)
          .addField("Server ID", message.guild.id, true)
          .addField("Permanent Invite Link", PPW_invite, true)
          .addField("Owner", "<@" + message.guild.ownerID + ">", false)
          .addField("Server Name", message.guild.name, true)
          .addField("Region", message.guild.region, true)
          .addField("Members/Online", `${message.guild.memberCount}/${OnlineUsers()}`, true)
          .addField("Default Notification", message.guild.defaultMessageNotifications, true)
          .addField("AFK Timeout", message.guild.afkTimeout, true)
          .addField("Nitro Lvl/Supporter", `${message.guild.premiumTier}/${message.guild.premiumSubscriptionCount}`, true)
          .addField("Emojis (Max shown 50 - animated emojis are not supported)", emoji1.join(" "), false)
          .addField("Cont.", emoji2.join(" "), false)
          .addField("Server Age", `${prettyMS(age)}`, false)
          .addField("Created On", `${Moment(message.guild.createdAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700 (Western Indonesia Time)`, false)
          .addField("You Joined At", `${Moment(message.member.joinedAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700 (Western Indonesia Time)`, false)
          .setColor('RANDOM')
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
          .setTimestamp();

          message.channel.send(embed)
        }

        function OnlineUsers (users) {
          var users = message.guild.members.cache.filter(m => m.user.presence.status === 'online').size
          users += message.guild.members.cache.filter(m => m.user.presence.status === 'idle').size
          users += message.guild.members.cache.filter(m => m.user.presence.status === 'dnd').size
          return users;
        }

        function getEmoji(){
          return message.guild.emojis.cache.map(emojis => {
            return emojis;
          })
        }
    }
}

// .addField(`Total Channel`, message.client.channels.cache.size, true)
// .setImage(message.guild.iconURL(({ format: 'jpg', size: 2048 })))

/*
<ref *1> Guild {
  members: GuildMemberManager {
    cacheType: [class Collection extends Collection],
    cache: Collection(7) [Map] {
      '159985870458322944' => [GuildMember],
      '172002275412279296' => [GuildMember],
      '213466096718708737' => [GuildMember],
      '235148962103951360' => [GuildMember],
      '311740375716986881' => [GuildMember],
      '740161634940616765' => [GuildMember],
      '751394375040499784' => [GuildMember]
    },
    guild: [Circular *1]
  },
  channels: GuildChannelManager {
    cacheType: [class Collection extends Collection],
    cache: Collection(7) [Map] {
      '791234593340653598' => [CategoryChannel],
      '791234593340653599' => [CategoryChannel],
      '791234593340653600' => [TextChannel],
      '791234593340653601' => [VoiceChannel],
      '796714796308889630' => [TextChannel],
      '802064992303054848' => [TextChannel],
      '806521319733592084' => [TextChannel]
    },
    guild: [Circular *1]
  },
  roles: RoleManager {
    cacheType: [class Collection extends Collection],
    cache: Collection(7) [Map] {
      '791234592811122729' => [Role],
      '791234702823522346' => [Role],
      '795141413326028812' => [Role],
      '795325473794031627' => [Role],
      '802062754814361611' => [Role],
      '802187577390006333' => [Role],
      '802187582284103680' => [Role]
    },
    guild: [Circular *1]
  },
  presences: PresenceManager {
    cacheType: [class Collection extends Collection],
    cache: Collection(6) [Map] {
      '159985870458322944' => [Presence],
      '172002275412279296' => [Presence],
      '213466096718708737' => [Presence],
      '235148962103951360' => [Presence],
      '311740375716986881' => [Presence],
      '740161634940616765' => [Presence]
    }
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
}
*/