const { MessageEmbed } = require("discord.js");
const Moment = require('moment-timezone');
const prettyMS = require('pretty-ms')

module.exports = client => {
    const guild = client.guilds.cache.get('640790707082231834') // Server ID
    if(guild !== undefined){
        const channelID = '820964768067878922'; // The channel it's in
        const rulesChannelID = '640825665310031882'; // The rules channel
        const modsRolesID = '645494894613233665'; // Mod roles ID
        const serverInfoID = '820964895767265280'; // The id for server info embed  
        const emojisInfoID1 = '821170444509380639'; // Id for embed emojis 
        const emojisInfoID2 = '821170482945458196'; // Id for embed emojis 
        const memberInfoID = '821205412795383871'; // Id for embed showing member

        // Member info
        var memberList = [];
        memberList = getMember()

        // Oldest
        var oldest = []
        oldest = memberList.sort();

        var onlyFiveOldest = [];
        for (var i = 0; i < 5; i++){
            onlyFiveOldest.push(oldest[i].replace(/[0-9]+\s,,/g,"-"));
        } //[0-9]+- To get rid of the date  

        // Sort it for newest
        var newest = []
        newest = memberList.sort().reverse(); // Reverse for newest

        var onlyFiveNewest = [];
        for (var i = 0; i < 5; i++){
            onlyFiveNewest.push(newest[i].replace(/[0-9]+\s,,/g,"-"));
        } //[0-9]+- To get rid of the date  

        // Emojis
        var emoji = []; 
        emoji = getEmoji(); // Map the emojis

        var nonAnimated = [];
        var Animated  = [];
        if(emoji == ""){
          nonAnimated.push("No custom emoji in server");
          Animated.push("-")
        } else {
          for (var i = 0; i < emoji.length; i++){
            if (emoji[i].animated) {
              Animated.push(`<a:${emoji[i].name}:${emoji[i].id}>`)
            } else 
            if (!emoji[i].animated) {
              nonAnimated.push(`<:${emoji[i].name}:${emoji[i].id}>`)
            }
          }
        }

        // Non Animated
        var emojiNonAnimated = [];
        for (var i = 0; i < 50; i ++){ // 1-25
          emojiNonAnimated.push(nonAnimated[i]);
        }
        if (!emojiNonAnimated[0]){
          emojiNonAnimated.push('-');
        }

        // Animated
        var emojiAnimated = [];
        for (var i = 0; i < 25; i ++){ // 1-25
            emojiAnimated.push(Animated[i]);
        }
        for (var i = 25; i < 50; i ++){ // 26-50
            emojiAnimated.push(Animated[i]);
        }

        if(!emojiAnimated[0]){ // If no animated emoji
            emojiAnimated.push('-');
        }

        // Server Age
        var today = Moment().tz('Asia/Jakarta');
        var age = today - guild.createdAt; // Get server Age

        setInterval(function(){ // Function to change it
            embedStats();
            embedEmojis1();
            embedEmojis2();
            embedMember();
        }, 900000) // Every 15 minutes

        function embedStats() {
            client.channels.fetch(channelID).then(channel => { // First fetch channel from client
                channel.messages.fetch(serverInfoID).then(msg =>{ // Then fetch the message
                    let embed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL(({ format: 'jpg', size: 2048 })))
                    .setTitle('Server Information')
                    .setDescription(`Welcome To ${guild.name}! This embed contains some information of the server. Before you start participating please read the rules first in <#${rulesChannelID}>. If you have any questions feel free to ask the owner (<@${guild.ownerID}>) or <@&${modsRolesID}>. Once again welcome, have fun, & please enjoy your stay ^^\n\n[Get Server Icon](${guild.iconURL(({ format: 'jpg', size: 2048 }))})`)
                    .setThumbnail(guild.iconURL(({ format: 'jpg', size: 2048 })))
                    .addField('Server Owner', `<@${guild.ownerID}>`, false)
                    .addField(`Rules & Guides Channel`, `<#${rulesChannelID}>`, false)
                    .addField("Server Age", `${prettyMS(age)}`, false)
                    .addField('Server Created At', `${Moment(guild.createdAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')} GMT+0700`, false)
                    .addField(`Server Region`, guild.region, true)
                    .addField("Default Notification", guild.defaultMessageNotifications, true)
                    .addField("AFK Timeout", guild.afkTimeout, true)
                    .addField("Nitro/Booster", `LVL. ${guild.premiumTier}/${guild.premiumSubscriptionCount} Booster(s)`, true)
                    .addField('Total Members', guild.memberCount, true)
                    .addField('Total Bots', totalBots(), true)
                    .addField('Status (User Only)', `**Online :** ${onlineUsers()}\n**Offline :** ${(guild.memberCount - totalBots()) - onlineUsers()}`, false)
                    .setColor('RANDOM');
                    
        
                    msg.edit(embed);
                });
            })
        }        

        function embedEmojis1(){
            client.channels.fetch(channelID).then(channel => { // First fetch channel from client
                channel.messages.fetch(emojisInfoID1).then(msg =>{ // Then fetch the message
                    let embed = new MessageEmbed()
                    .setTitle('Server Emojis')
                    .setDescription(`**Non Animated**\n${emojiNonAnimated.join(" ")}`)
                    .setColor('RANDOM')
                
                    msg.edit(embed);
                });
            })
        }

        function embedEmojis2(){
            client.channels.fetch(channelID).then(channel => { // First fetch channel from client
                channel.messages.fetch(emojisInfoID2).then(msg =>{ // Then fetch the message
                    let embed = new MessageEmbed()
                    .setDescription(`**Animated**\n${emojiAnimated.join(" ")}`)
                    .setColor('RANDOM')
                
                    msg.edit(embed);
                });
            })
        }

        function embedMember(){
            client.channels.fetch(channelID).then(channel => { // First fetch channel from client
                channel.messages.fetch(memberInfoID).then(msg =>{ // Then fetch the message
                    let embed = new MessageEmbed()
                    .setTitle('Showing 5 of')
                    .setDescription(`**Oldest Member**\n${onlyFiveOldest.join("\n")}\n\n**Newest Member**\n${onlyFiveNewest.join("\n")}`)
                    .setFooter('Last Updated')
                    .setColor('RANDOM')
                    .setTimestamp();
                
                    msg.edit(embed);
                });
            })
        }

        function getEmoji(){
            return guild.emojis.cache.map(emojis => {
              return emojis;
            })
        }

        function getMember(){
            return guild.members.cache.map(GuildMember => {
                var dateNname = [];
                dateNname = Moment(GuildMember.joinedAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss');
                
                var today = Moment().tz('Asia/Jakarta');
                var age = today - GuildMember.joinedAt;

                return `${GuildMember.joinedTimestamp} ,, ${Moment(GuildMember.joinedAt).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')} - <@${GuildMember.id}> (${prettyMS(age)})`;
            })
        }

        function totalBots () {
            var bots = guild.members.cache.filter(m => m.user.bot).size
           
            return bots;
        }

        function onlineUsers (users) {
            var users = guild.members.cache.filter(m => m.user.presence.status === 'online').size
            users += guild.members.cache.filter(m => m.user.presence.status === 'idle').size
            users += guild.members.cache.filter(m => m.user.presence.status === 'dnd').size

            var bots = guild.members.cache.filter(m => m.user.bot).size
           
            return users - bots;
        }

        embedStats();
        embedEmojis1();
        embedEmojis2();
        embedMember();

        console.log(`Module: Online Counter Loaded | Loaded from local module | Now watching online users...`);
    }
}

/* Other method is for channel name, but it's gonna polute your audit log, so use it wisely

const channelId = '817672205659668531'; // channel ID
const channel = guild.channels.cache.get(channelId) // Get the channel

setInterval(function(){ // Function to change it
    channel.setName(`Online : ${OnlineUsers()}`)
}, 900000) // Every 15 minutes

channel.setName(`Online : ${OnlineUsers()}`)

*/