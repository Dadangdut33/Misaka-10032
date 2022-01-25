module.exports = (client, guildID, channelID) => {
	const guild = client.guilds.cache.get(guildID);
	if (!guild) return console.log("Invalid guild for member count");
	try {
		const theID = channelID;
		const updateMembers = (guild) => {
			const channel = guild.channels.cache.get(theID);
			channel.setName(`Total Members: ${guild.memberCount}`);
		};

		client.on("guildMemberAdd", (member) => updateMembers(member.guild));
		client.on("guildMemberRemove", (member) => updateMembers(member.guild));

		updateMembers(guild);

		console.log(`Module: Member-Count Loaded | Loaded from local module | Now waiting for new members...`);
	} catch (e) {
		console.log(e);
	}
};
