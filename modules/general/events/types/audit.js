/*
Forked for personal use
From https://www.npmjs.com/package/discord-auditlog
*/

module.exports = function (bot, options) {
    const description = {
        name: "audit",
        filename: "audit.js",
        version: "1.0.0"
    }

    const eventtype = {
        guildMemberUpdate: "auditlog",
        usernameChangedMsg: "auditlog",
        discriminatorChangedMsg: "auditlog",
        avatarChangedMsg: "auditlog",
        messageDelete: "auditmsg",
    }
    console.log(`Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)

    let debugmode = false
    if (options && options.debugmode === true) debugmode = true

    const DiscordJSversion = require("discord.js").version
    if (DiscordJSversion.substring(0, 2) !== "12") console.error("This version of discord-lobby only run on DiscordJS V12 and up, please run \"npm i discord-auditlog@discord.js-v11\" to install an older version")
    if (DiscordJSversion.substring(0, 2) !== "12") return

    /*
        Event type
        guildMemberAdd: welcome message
        guildMemberUpdate: NICKNAME
        usernameChangedMsg, discriminatorChangedMsg, avatarChangedMsg: USER UPDATE AVATAR, USERNAME, DISCRIMINATOR, 
        messageDelete : Image deleted
    */

    // Deleted image
    // Only if the message contains image V12
    bot.on("messageDelete", message => {
        if (message.author.bot === true) return
        if (message.channel.type !== "text") return
        if (message.attachments.map(x => x.proxyURL).length == 0) return 
        // if (message)
        if (debugmode) console.log(`Module: ${description.name} | messageDelete triggered`)
        var embed = {
            description: `
**Author : ** <@${message.author.id}> - *${message.author.tag}*
**Date : ** ${message.createdAt}
**Channel : ** <#${message.channel.id}> - *${message.channel.name}*

**Deleted Image : **
${message.attachments.map(x => x.proxyURL)}

`,
            image: {
                url: message.attachments.map(x => x.proxyURL)[0]
            },
            color: 000000,
            timestamp: new Date(),
            footer: {
                text: `
            Deleted: `
            },
            author: {
                name: `
            IMAGE DELETED `,
                icon_url: "https://cdn.discordapp.com/emojis/619328827872641024.png"
            }
        }
        if (message && message.member && typeof message.member.guild === "object") {
            send(bot, message.member.guild, options, embed, "messageDelete")
        } else {
            console.error(`Module: ${description.name} | messageDelete - ERROR - member guild id couldn't be retrieved`)
            console.error("author", message.author)
            console.error("member", message.member)
            console.error("content", message.content)
        }
    })

    // USER NICKNAME UPDATE V12
    bot.on("guildMemberUpdate", (oldMember, newMember) => {
        if (debugmode) console.log(`Module: ${description.name} | guildMemberUpdate:nickname triggered`)
        if (oldMember.nickname !==
             newMember.nickname) {
            var embed = {
                description: `<@${newMember.user.id}> - *${newMember.user.id}*`,
                url: newMember.user.displayAvatarURL(),
                color: 000000,
                timestamp: new Date(),
                footer: {
                    text: `${newMember.nickname || newMember.user.username}`
                },
                thumbnail: {
                    url: newMember.user.displayAvatarURL()
                },
                author: {
                    name: `NICKNAME CHANGED: ${newMember.user.tag}`,
                    icon_url: "https://cdn.discordapp.com/emojis/435119397237948427.png"
                },
                fields: [{
                    name: "Old Nickname",
                    value: `**${oldMember.nickname || oldMember.user.username}**`,
                    inline: true
                },
                {
                    name: "New Nickname",
                    value: `**${newMember.nickname || newMember.user.username}**`,
                    inline: true
                }
                ]
            }
            send(bot, newMember.guild, options, embed, "guildMemberUpdate")
        }
    })

    // USER UPDATE AVATAR, USERNAME, DISCRIMINATOR V12
    bot.on("userUpdate", (oldUser, newUser) => {
        if (debugmode) console.log(`Module: ${description.name} | userUpdate triggered`)

        // Log quand le user change de username (et possiblement discriminator)
        var usernameChangedMsg = null
        var discriminatorChangedMsg = null
        var avatarChangedMsg = null

        // search the member from all guilds, since the userUpdate event doesn't provide guild information as it is a global event.
        bot.guilds.cache.forEach(function (guild, guildid) {
            guild.members.cache.forEach(function (member, memberid) {
                if (newUser.id === memberid) {
                    // var member = bot.guilds.get(guildid).members.get(member.id)

                    // USERNAME CHANGED V12
                    if (oldUser.username !== newUser.username) {
                        if (debugmode) console.log(`Module: ${description.name} | userUpdate:USERNAME triggered`)

                        usernameChangedMsg = {
                            description: `<@${newUser.id}> - *${newUser.id}*`,
                            url: newUser.displayAvatarURL(),
                            color: 000000,
                            timestamp: new Date(),
                            footer: {
                                text: `${member.nickname || member.user.username}`
                            },
                            thumbnail: {
                                url: newUser.displayAvatarURL()
                            },
                            author: {
                                name: `USERNAME CHANGED: ${newUser.tag}`,
                                icon_url: "https://cdn.discordapp.com/emojis/435119402279763968.png"
                            },
                            fields: [{
                                name: "Old Username",
                                value: `**${oldUser.username}**`,
                                inline: true
                            },
                            {
                                name: "New Username",
                                value: `**${newUser.username}**`,
                                inline: true
                            }
                            ]
                        }
                    }

                    // DISCRIMINATOR CHANGED V12
                    if (oldUser.discriminator !== newUser.discriminator) {
                        if (debugmode) console.log(`Module: ${description.name} | userUpdate:DISCRIMINATOR triggered`)

                        discriminatorChangedMsg = {
                            description: `<@${newUser.id}> - *${newUser.id}*`,
                            url: newUser.displayAvatarURL(),
                            color: 000000,
                            timestamp: new Date(),
                            footer: {
                                text: `${member.nickname || member.user.username}`
                            },
                            thumbnail: {
                                url: newUser.displayAvatarURL()
                            },
                            author: {
                                name: `DISCRIMINATOR CHANGED: ${newUser.tag}`,
                                icon_url: "https://cdn.discordapp.com/emojis/435119390078271488.png"
                            },
                            fields: [{
                                name: "Old Discriminator",
                                value: `**${oldUser.discriminator}**`,
                                inline: true
                            },
                            {
                                name: "New Discriminator",
                                value: `**${newUser.discriminator}**`,
                                inline: true
                            }
                            ]
                        }
                    }

                    // AVATAR CHANGED V12
                    if (oldUser.avatar !== newUser.avatar) {
                        if (debugmode) console.log(`Module: ${description.name} | userUpdate:AVATAR triggered`)

                        avatarChangedMsg = {
                            description: `<@${newUser.id}> - *${newUser.id}*`,
                            url: newUser.displayAvatarURL(),
                            color: 000000,
                            timestamp: new Date(),
                            footer: {
                                text: `${member.nickname || member.user.username} • If old avatar doesn't show up, it means it's not in the bot's cache`
                            },
                            thumbnail: {
                                url: newUser.displayAvatarURL()
                            },
                            author: {
                                name: `AVATAR CHANGED: ${newUser.tag}`,
                                icon_url: "https://cdn.discordapp.com/emojis/435119382910337024.png"
                            },
                            image: {
                                url: oldUser.displayAvatarURL()
                            },
                            fields: [{
                                name: "Old Avatar",
                                value: ":arrow_down:"
                            }]
                        }
                    }

                    if (usernameChangedMsg) send(bot, guild, options, usernameChangedMsg, "usernameChangedMsg")
                    if (discriminatorChangedMsg) send(bot, guild, options, discriminatorChangedMsg, "discriminatorChangedMsg")
                    if (avatarChangedMsg) send(bot, guild, options, avatarChangedMsg, "avatarChangedMsg")
                }
            })
        })
    })

    // SEND FUNCTION V12
    function send (bot, guild, options, msg, movement) {
        let embed = ""

        if (debugmode) console.log(`Module: ${description.name} | send - configured options:`, options)

        // Initialize option if empty
        if (!options) {
            options = {}
        }

        // Initialize if options are multi-server
        if (options[guild.id]) {
            options = options[guild.id]
        }

        if (debugmode) console.log(`Module: ${description.name} | send - specifics options:`, options)

        // Add default channel
        if (typeof options.auditlog === "undefined") options.auditlog = false
        if (typeof options.auditmsg === "undefined") options.auditmsg = false


        if (debugmode) console.log(`Module: ${description.name} | send - computed options:`, options)

        const channelname = (options[eventtype[movement]])
        if (channelname) {
            // define channel object
            const channel = guild.channels.cache.find(val => val.name === channelname) || guild.channels.cache.find(val => val.id === channelname)
            if (channel) {
                if (channel.permissionsFor(bot.user).has("SEND_MESSAGES") && channel.permissionsFor(bot.user).has("SEND_MESSAGES")) {
                    if (typeof msg === "object") {
                        // Embed
                        if (channel.permissionsFor(bot.user).has("EMBED_LINKS")) {
                            embed = msg
                            channel.send({
                                embed
                            })
                                .catch(console.error)
                        } else {
                            console.log(`${description.name} -> The Bot doesn't have the permission EMBED_LINKS to the configured channel "${channelname}" on server "${guild.name}" (${guild.id})`)
                        }
                    } else {
                        // Send the Message
                        channel.send(msg)
                            .catch(console.error)
                    }
                } else {
                    console.log(`${description.name} -> The Bot doesn't have the permission to send public message to the configured channel "${channelname}" on server "${guild.name}" (${guild.id})`)
                }
            } else {
                console.log(`${description.name} -> The channel "${channelname}" do not exist on server "${guild.name}" (${guild.id})`)
            }
        } else {
            // console.log(`AuditLog: No channel option for event ${movement} on server "${guild.name}" (${guild.id})`);
        }
    }
}
