// const haiku = require("haiku-detect"); Now forked onto local dependencies for manual calibration
const { MessageEmbed } = require("discord.js");
const randomRes = require("./bot-response");
const { prefix } = require("../../../../config");
const { capitalizeFirstLetter, hasNumber } = require("../../../../local_dependencies/functions");
const { detect, format } = require("./detect-haiku/detect-haiku");

module.exports = (client) => {
	const listenToMessage = (message) => {
		// The function
		const regexEmojiHaiku = /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g;

		if (!message.content.startsWith(prefix) && message.channel.type !== "dm") {
			if (message.content.includes("!geh")) {
				var x = Math.floor(Math.random() * randomRes().resGehLen);

				message.channel.send(randomRes(x).resGeh);
			}

			// Mention, Emoji, Link
			if (
				!message.mentions.members.first() && // Mention member
				!message.mentions.channels.first() && // Mention channel
				!regexEmojiHaiku.test(message.content) && // Emoji
				!hasNumber(message.content) && // Number
				!new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(message.content) // Links
			) {
				// To Prevent Error
				if (!message.content.startsWith("||") && !message.content.endsWith("||") && !message.author.bot) {
					// Make sure it's not a spoiler and not a bot
					if (detect(message.content)) {
						var haikuGet = [];
						var toHaikued = message.content.replace(/(\n)/g, ""); // Remove new line

						haikuGet = format(toHaikued);
						if (haikuGet[0] !== undefined) {
							for (var i = 0; i < haikuGet.length; i++) {
								haikuGet[i] = capitalizeFirstLetter(haikuGet[i]);
							}

							let embed = new MessageEmbed()
								.setDescription(
									`*${haikuGet.join("\n\n").replace(/[\*\`\"]/g, "")}*\n\n- ${
										message.author.username
									}\n__　　　　　　　　　　　　　__\n[ᴴᵃᶦᵏᵘ](https://en.wikipedia.org/wiki/Haiku) ᵈᵉᵗᵉᶜᵗᵉᵈ ⁻ ˢᵒᵐᵉᵗᶦᵐᵉˢ ˢᵘᶜᶜᵉˢˢᶠᵘᶫᶫʸ`
								)
								.setColor(`RANDOM`);
							// .setFooter(``) ―

							message.channel.send(embed);
						}
					}
				}
			}
		}
	}; // End of it

	client.on(`message`, (message) => listenToMessage(message)); // Listen

	console.log(`Module: msgListener Loaded | Loaded from local modules | Now seeking for haiku and geh content...`);
};
