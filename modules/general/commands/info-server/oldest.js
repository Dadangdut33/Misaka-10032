const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const Moment = require('moment-timezone');
const prettyMS = require('pretty-ms')


module.exports = class extends Command {
    constructor() {
        super('oldest', {
            aliases: ['No alias is set for this command'],
            categories: 'info-server',
            info: 'List the oldest member (Max 25)',
            usage: `${prefix}command`,
            guildOnly: true,
        });
    }

    async run(message, args) {
        if (!args[0]) {
            // console.log(message.guild.members);
            // console.log(message.guild);
            
            //Get data
            var memberList = []
            memberList = getMember()
            // console.log(memberList);

            //Sort it
            var sorted = []
            sorted = memberList.sort();
            // console.log(sorted);

            for (var i = 0; i < sorted.length; i++){
              sorted[i] = sorted[i].replace(/[0-9]+\s,,/g,"-");
            } //[0-9]+- To get rid of the date            

            //Oldest is array 0
            var oldest = [];
            for (var i = 0; i < 25; i++){
              oldest[i] = sorted[i];
            }

            let embed = new MessageEmbed()
            .setTitle(`Showing max of 25 list of oldest member in ${message.guild.name}`)
            .setDescription(`${oldest.join("\n")}`)
            .setAuthor(message.guild.name , message.guild.iconURL(({ format: 'jpg', size: 2048 })), `https://discord.com/channels/${message.guild.id}`)
            .setFooter(`Format date D-M-Y • Time are in GMT + 7`)
            .setTimestamp();

            message.channel.send(embed);
        }

        function getMember(){
            return message.guild.members.cache.map(GuildMember => {
                var dateNname = [];
                dateNname = Moment(GuildMember.joinedAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss');
                
                var today = Moment().tz('Asia/Jakarta');
                var age = today - GuildMember.joinedAt;

                return `${GuildMember.joinedTimestamp} ,, ${Moment(GuildMember.joinedAt).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')} - <@${GuildMember.id}> (${prettyMS(age)})`;
            })
        }

        function getDate(){
          return message.guild.members.cache.map(GuildMember => {
              return `${GuildMember.joinedTimestamp}`;
          })
        }
        
    }
}
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
    ownerID: '311740375716986881',
    emojis: GuildEmojiManager {
      cacheType: [class Collection extends Collection],
      cache: Collection(0) [Map] {},
      guild: [Circular *1]
    }
  },
  user: User {
    id: '751394375040499784',
    bot: false,
    username: 'John F Smith',
    discriminator: '1955',
    avatar: '6dff0a350096a197def84105fda2fa59',
    flags: UserFlags { bitfield: 0 },
    lastMessageID: null,
    lastMessageChannelID: null
  },
  joinedTimestamp: 1611297791935,
  lastMessageID: null,
  lastMessageChannelID: null,
  premiumSinceTimestamp: null,
  deleted: false,
  _roles: [],
  nickname: null
}
*/