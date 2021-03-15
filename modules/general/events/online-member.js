const { MessageEmbed } = require("discord.js");

module.exports = client => {
    const guild = client.guilds.cache.get('640790707082231834') // Server ID
    if(guild !== undefined){
        const msgId = '820964895767265280'; // The embed id 
        const channelID = '820964768067878922'; // The channel it's in
        const rulesChannelID = '640825665310031882'; // The rules channel
        const modsRolesID = '645494894613233665'; // Mod roles ID

        setInterval(function(){ // Function to change it
            embedStats();
        }, 900000) // Every 15 minutes

        function embedStats() {
            client.channels.fetch(channelID).then(channel => { // First fetch channel from client
                channel.messages.fetch(msgId).then(msg =>{ // Then fetch the message
                    let embed = new MessageEmbed()
                    .setAuthor(guild.name, guild.iconURL(({ format: 'jpg', size: 2048 })))
                    .setTitle('Server Information')
                    .setDescription(`Welcome To ${guild.name}! This embed contains some information of the server. Before you start participating please read the rules first in <#${rulesChannelID}>. Feel free to ask <@${guild.ownerID}> or <@&${modsRolesID}> if you have any questions! Once again welcome, have fun, & please enjoy your stay ^^\n\n[Get Server Icon](${guild.iconURL(({ format: 'jpg', size: 2048 }))})`)
                    .setThumbnail(guild.iconURL(({ format: 'jpg', size: 2048 })))
                    .addField('Server Owner', `<@${guild.ownerID}>`, false)
                    .addField(`Rules & Guides Channel`, `<#${rulesChannelID}>`, false)
                    .addField(`Server Region`, guild.region, true)
                    .addField("Default Notification", guild.defaultMessageNotifications, true)
                    .addField("AFK Timeout", guild.afkTimeout, true)
                    .addField("Nitro/Booster", `LVL. ${guild.premiumTier}/${guild.premiumSubscriptionCount} Booster(s)`, true)
                    .addField('Total Members', guild.memberCount, true)
                    .addField('Total Bots', totalBots(), true)
                    .addField('Status (User Only)', `**Online :** ${onlineUsers()}\n**Offline :** ${guild.memberCount - onlineUsers()}`, false)
                    .setFooter('Last Updated at')
                    .setColor('RANDOM')
                    .setTimestamp();
                    
        
                    msg.edit(embed);
                });
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