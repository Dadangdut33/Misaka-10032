module.exports = client => {
    const guild = client.guilds.cache.get('640790707082231834')
    if(guild !== undefined){
        const updateMembers = guild => {
            const channel = guild.channels.cache.get(channelId)
            channel.setName(`Total Members: ${guild.memberCount}`)
        }
        
        const channelId = '798031042954919957'; 
    
        client.on('guildMemberAdd', (member) => updateMembers(member.guild))
        client.on('guildMemberRemove', (member) => updateMembers(member.guild))
      
        updateMembers(guild)
    
        console.log(`Module: Member-Count Loaded | Loaded from local module | Now waiting for new members...`);
    }
}