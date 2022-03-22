const { insert_DB_One, find_DB_Return } = require("../../../../../local_dependencies/functions");
const { MessageEmbed } = require("discord.js");

module.exports = (client, guild_ID, hallOfFame) => {
	const guild = client.guilds.cache.get(guild_ID);
	if (!guild) return console.log("Invalid guild for message spotlight");

	// get channel by id
	const channel = guild.channels.cache.get(hallOfFame);

	client.on("messageReactionAdd", async (reaction, user) => {
		try {
			const reactor = reaction.message.guild.members.cache.get(user.id);
			const msg = await reaction.message.channel.messages.fetch(reaction.message.id);
			// make sure user is not bot
			if (user.bot || msg.author.bot) return;

			// make sure it is in the same guild
			if (reaction.message.guild.id !== guild.id) return;

			// make sure reactor is admin
			if (!reactor.hasPermission("ADMINISTRATOR")) return;

			// check reaction content
			if (!reaction.emoji.name.includes("SETUJUBANH")) return;

			var data = {
				guildID: guild_ID,
				channelID: reaction.message.channel.id,
				messageID: reaction.message.id,
			};

			var db_Data = await find_DB_Return("hall_of_fame", data);
			// if already in db, return
			if (db_Data.length > 0) return;

			// insert to db
			insert_DB_One("hall_of_fame", data);

			const attachment = msg.attachments.first() ? msg.attachments.first().proxyURL : "";

			const footerChoice = ["💎", "Worthy", "El caliente", "⭐⭐⭐⭐⭐", "Keren abangnya", "😂👆", "😂👆", "Awesome", "Fantastic", "Pengememe handal"];
			const embed = new MessageEmbed()
				.setColor("YELLOW")
				.setAuthor(
					msg.author.username,
					msg.author.displayAvatarURL({ format: "jpg", size: 2048 }),
					`https://discord.com/channels/${guild_ID}/${reaction.message.channel.id}/${reaction.message.id}`
				)
				.setDescription(msg ? msg : "-")
				.setImage(attachment)
				.addField(`Source`, `[Jump](https://discord.com/channels/${guild_ID}/${reaction.message.channel.id}/${reaction.message.id})`)
				.setFooter(footerChoice[Math.floor(Math.random() * footerChoice.length)])
				.setTimestamp();

			if (attachment !== "") embed.addField(`Attachment`, `[Link](${attachment})`);

			channel.send(`<#${reaction.message.channel.id}>`, { embed: embed });

			let extraEmbedSend = false;
			// check if attachment is a video
			if (attachment.includes(".mp4")) channel.send(attachment.replace("media.discordapp.net", "cdn.discordapp.com"));

			// another video but discord embed link
			if (msg.content.includes("cdn.discordapp.com")) {
				extraEmbedSend = true;
				// get only the video link
				channel.send(msg.embeds[0].url);
			}

			if (extraEmbedSend) return; // extra embed already send

			if (msg.embeds[0])
				if (msg.embeds[0].type === "video")
					// last check through the embeded content in message
					channel.send(msg.embeds[0].url);
		} catch (e) {
			console.log(e);
			channel.send(`**Error**\n${e}`);
		}
	});

	console.log(`Module: Hall of Fame Module Loaded | Guild: ${guild.name}`);
};
