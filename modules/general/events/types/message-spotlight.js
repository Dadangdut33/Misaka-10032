const { insert_DB_One, find_DB_Return } = require("../../../../local_dependencies/functions");
const { MessageEmbed } = require("discord.js");

module.exports = (client, guild_ID, highlightChannel) => {
	const guild = client.guilds.cache.get(guild_ID);
	if (!guild) return console.log("Invalid guild for message spotlight");

	// get channel by id
	const channel = guild.channels.cache.get(highlightChannel);

	client.on("messageReactionAdd", async (reaction, user) => {
		try {
			const msg = await reaction.message.channel.messages.fetch(reaction.message.id);
			// make sure user is not bot
			if (user.bot || msg.author.bot) return;

			// make sure it is in the same guild
			if (reaction.message.guild.id !== guild.id) return;

			// make sure reaction is not in news channel or dm also make sure raction is not in same channel as highlightChannel
			if (reaction.message.channel.type === "news" || reaction.message.channel.type === "dm" || reaction.message.channel === channel) return;

			// if reactions >= 3, send it to the highlightChannel
			if (reaction.message.reactions.cache.size >= 3) {
				var data = {
					guildID: guild_ID,
					channelID: reaction.message.channel.id,
					messageID: reaction.message.id,
				};

				var db_Data = await find_DB_Return("spotlighted_message", data);
				// if already in db, return
				if (db_Data.length > 0) return;

				// insert to db
				insert_DB_One("spotlighted_message", data);

				const attachment = msg.attachments.first() ? msg.attachments.first().proxyURL : "";

				const embed = new MessageEmbed()
					.setColor("RANDOM")
					.setAuthor(msg.author.username, msg.author.displayAvatarURL({ format: "jpg", size: 2048 }))
					.setDescription(msg ? msg : "-")
					.setImage(attachment)
					.addField(`Source`, `[Jump](https://discord.com/channels/${guild_ID}/${reaction.message.channel.id}/${reaction.message.id})`)
					.setFooter(`Spotlighted`)
					.setTimestamp();

				if (attachment !== "") embed.addField(`Attachment`, `[Link](${attachment})`);

				channel.send(`<#${reaction.message.channel.id}>`);
				channel.send(embed);
			}
		} catch (e) {
			console.log(e);
			channel.send(`**Error**\n${e}`);
		}
	});

	console.log(`Module: Message Spotlight Module Loaded | Guild: ${guild.name}`);
};
