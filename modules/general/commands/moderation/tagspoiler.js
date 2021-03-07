const { MessageEmbed, DiscordAPIError } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');
const Moment = require('moment-timezone');

module.exports = class extends Command {
  constructor() {
    super('tagspoiler', {
      aliases: ["ts"],
      categories: 'moderation',
      info: 'Tag spoiler a message by using the bot, only usable by admin and mods',
      usage: `${prefix}command/alias <message id> <reason>`,
      guildOnly: true,
    });
  }

  async run(message, args) {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the required permissions to use this command.").then(msg => msg.delete({timeout:5000}));

        if (args.length < 1)
            return message.channel.send(invalidArgs()).then(msg => msg.delete({timeout: 5000}));

        if(isNaN(args[0]))
            return message.channel.send(errorID()).then(msg => msg.delete({timeout: 5000}));

        if (!args[1])
            return message.channel.send(noReason()).then(msg => msg.delete({timeout: 5000}));

        var reason = args.join(" ").replace(args[0], "");
        var author = message.author;
        var authorPP = message.author.displayAvatarURL({ format: 'jpg', size: 2048 })

        message.channel.messages.fetch(args[0]).then(message => {
            // console.log(message);
            // console.log(message.attachments);
                message.delete();
                
                var newMsg = `${message.author} **__Your Message Has Been Marked as Spoiler__**`

                var attachmentName = message.attachments.map(attachment => attachment.name);

                var attachmentURL = message.attachments.map(attachment => attachment.proxyURL);

                var height = message.attachments.map(attachment => attachment.height);
                var width = message.attachments.map(attachment => attachment.width);
                var size = message.attachments.map(attachment => attachment.size);

                // console.log(attachmentName);
                if(attachmentName == ""){
                    attachmentName = ""
                } else{
                    attachmentName = `(${attachmentName})`
                }

                if(attachmentURL == ""){
                    attachmentURL = "No Attachment"
                } else {
                    attachmentURL = `[Click Here for The Attachment](${attachmentURL})`
                }

                if(size == ""){
                    size = "-";
                }
                
                let embed = new MessageEmbed()
                .setTitle(`Reason: ${reason.trim()}`)
                .setDescription(`**Message Content Below:**\n${message.content ? `||${message.content.replace(/\||```/g, "")}||` : "-"}`)
                .addField(`Attachment ${attachmentName}`, `${attachmentURL}\nAttachment Details: **${width} x ${height}** (${size} Bytes)`, false)
                .addField(`Go To`, `[Message Position](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, false)
                .addField(`Reminder`, `Please use the tag spoiler if your message contains spoiler so this won't happen again in the future. Example of how to use it -> \`||spoiler here||\``, false)
                .addField(`Message Sent At`, Moment(message.createdTimestamp).tz('Asia/Jakarta').format('dddd, D-M-YY (HH:mm:ss)'), true)
                .addField(`Message Author`, message.author, true)
                .addField(`Marked by`, author, true)
                .setFooter(`Format Date: D-M-Y, GMT + 7`)
                .setTimestamp()

                message.channel.send(newMsg)
                return message.channel.send(embed);
            })
            .catch(error => {
                console.log(error);
                if(error instanceof DiscordAPIError){
                    let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Invalid Message ID provided. Please provide a correct one!`)

                    return message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));
                } else {
                    let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Caught Error: ${error}`)
    
                    return message.channel.send(embed).then(msg => msg.delete({timeout: 5000}));
                }
            });
        function invalidArgs(){
            let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Wrong Arguments Provided!`)

            return embed;
        }

        function errorID(){
            let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Invalid Message ID provided. Please provide a correct one!`)

            return embed;
        }

        function noReason(){
            let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Please provide a reason!`)

            return embed;
        }
    }
}

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
    lastMessageID: '812853995911512085',
    rateLimitPerUser: 0,
    lastPinTimestamp: null,
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
  id: '812853972796178443',
  type: 'DEFAULT',
  content: '',
  author: User {
    id: '311740375716986881',
    bot: false,
    username: 'Dadangdut33',
    discriminator: '5264',
    avatar: '12a430a807863b7e4e7cf5738ccc784d',
    flags: UserFlags { bitfield: 128 },
    lastMessageID: '812853995911512085',
    lastMessageChannelID: '791234593340653600'
  },
  pinned: false,
  tts: false,
  nonce: undefined,
  system: false,
  embeds: [],
  attachments: Collection(1) [Map] {
    '812853972570079252' => MessageAttachment {
      attachment: 'https://cdn.discordapp.com/attachments/791234593340653600/812853972570079252/hjj9d4piscf61.jpg',
      name: 'hjj9d4piscf61.jpg',
      id: '812853972570079252',
      size: 56996,
      url: 'https://cdn.discordapp.com/attachments/791234593340653600/812853972570079252/hjj9d4piscf61.jpg',
      proxyURL: 'https://media.discordapp.net/attachments/791234593340653600/812853972570079252/hjj9d4piscf61.jpg',
      height: 640,
      width: 640
    }
  },
  createdTimestamp: 1613869889211,
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