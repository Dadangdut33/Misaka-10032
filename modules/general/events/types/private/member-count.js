module.exports = (client, guildID, channelID) => {
	const personalGuild = client.guilds.cache.get(guildID);
	if (!personalGuild) return console.log("Invalid guild for member count");
	try {
		const theID = channelID;
		const updateMembers = (guild) => {
			const channel = guild.channels.cache.get(theID);
			if (channel) channel.setName(`Total Members: ${guild.memberCount}`);
		};

		client.on("guildMemberAdd", (member) => {
			// check if the guild is the personal guild
			if (member.guild === personalGuild) updateMembers(member.guild);
		});
		client.on("guildMemberRemove", (member) => {
			if (member.guild === personalGuild) updateMembers(member.guild);
		});

		updateMembers(personalGuild);

		console.log(`Module: Member-Count Loaded | Loaded from local module | Now waiting for new members...`);
	} catch (e) {
		console.log(e);
	}
};
