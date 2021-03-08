module.exports = client => {
    const guild = client.guilds.cache.get('640790707082231834')
    if(guild !== undefined){
        const channelId = '817672205659668531'; 
        const channel = guild.channels.cache.get(channelId)
        
        setInterval(function(){
            channel.setName(`Online : ${OnlineUsers()}`)
        }, 900000) // Every 15 minutes

        function OnlineUsers (users) {
            var users = guild.members.cache.filter(m => m.user.presence.status === 'online').size
            users += guild.members.cache.filter(m => m.user.presence.status === 'idle').size
            users += guild.members.cache.filter(m => m.user.presence.status === 'dnd').size

            var bots = guild.members.cache.filter(m => m.user.bot).size
           
            return users - bots;
        }

        channel.setName(`Online : ${OnlineUsers()}`)

        console.log(`Module: Online Counter Loaded | Loaded from local module | Now watching online users...`);
    }
}