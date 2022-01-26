// const haiku = require("haiku-detect"); Now forked onto local dependencies for manual calibration
const { MessageEmbed } = require("discord.js");
const randomRes = require("./bot-response");
const { prefix } = require("../../../../config");
const { capitalizeFirstLetter, hasNumber } = require("../../../../local_dependencies/functions");
const { detect, format } = require("./detect-haiku/detect-haiku");
const malScraper = require("mal-scraper");

module.exports = (client) => {
	const checkGeh = (message) => {
		if (!message.content.startsWith(prefix) && message.channel.type !== "dm") {
			if (message.content.includes("!geh")) {
				var x = Math.floor(Math.random() * randomRes().resGehLen);

				message.channel.send(randomRes(x).resGeh);
			}
		}
	};

	const detectHaiku = (message) => {
		const regexEmojiHaiku = /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g;

		if (!message.content.startsWith(prefix) && message.channel.type !== "dm") {
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
	};

	async function detectAnimeSearch(message) {
		if (!message.content.startsWith(prefix) && message.channel.type !== "dm") {
			// regex for words surrounded by  {{}}
			const regexAnimeSearch = /\{\{([^\{\}]*)\}\}/g;

			// check if there is a match
			if (regexAnimeSearch.test(message.content)) {
				// get the match
				const match = message.content.match(regexAnimeSearch);
				// array of matches
				const matches = match.map((m) => m.replace(/\{\{|\}\}/g, ""));

				// search anime
				for (var data of matches) {
					const msg = await message.channel.send(`Fetching data...`);
					malScraper
						.getInfoFromName(data)
						.then((data) => {
							var animeChar = [],
								animeStaff = [];

							if (data.staff) {
								for (var i = 0; i < data.staff.length; i++) {
									animeStaff[i] = `• ${data.staff[i].name} - ${data.staff[i].role ? data.staff[i].role : `-`}`;
								}
							} else {
								animeStaff = [`No staff for this anime have been added to this title.`];
							}

							if (data.characters) {
								for (var i = 0; i < data.characters.length; i++) {
									animeChar[i] = `• ${data.characters[i].name} (${data.characters[i].role}) VA: ${data.characters[i].seiyuu.name ? data.characters[i].seiyuu.name : `-`}`;
								}
							} else {
								animeChar = ["No characters or voice actors have been added to this title."];
							}

							if (data.characters[0].name === data.staff[0].name && (data.staff[0].role === "Main" || data.staff[0].role === "Supporting") && animeStaff.length === 1) {
								// No Staff, sometimes the char is the staff
								animeStaff = [`No staff for this anime have been added to this title.`];
							}

							if (data.characters[0].name === data.staff[0].name && checkIfStaff(data.staff[0].role) && animeChar.length === 1) {
								// No Character, sometimes the staff is the char
								animeChar = [`No characters or voice actors have been added to this title.`];
							}

							let embed = new MessageEmbed()
								.setColor("2E51A2")
								.setAuthor(`${data.englishTitle ? data.englishTitle : data.title} | ${data.type ? data.type : "N/A"}`, data.picture, data.url)
								.setDescription(data.synopsis ? data.synopsis : "No synopsis available.")
								.addField("Japanese Name", `${data.japaneseTitle ? `${data.japaneseTitle} (${data.title})` : data.title}`, false)
								.addField("Synonyms", `${data.synonyms[0] === "" ? "N/A" : data.synonyms.join(" ")}`, false)
								.addField(`Genres`, `${data.genres[0] === "" ? "N/A" : data.genres.join(", ")}`, false)
								.addField(`Age Rating`, `${data.rating ? data.rating : "N/A"}`, true)
								.addField(`Source`, ` ${data.source ? data.source : "N/A"}`, true)
								.addField(`Status`, `${data.status ? data.status : "N/A"}`, true)
								.addField(`User Count/Favorite`, `${data.members ? data.members : "N/A"}/${data.favorites ? data.favorites : "N/A"}`, true)
								.addField(`Average Score`, `${data.score ? data.score : "N/A"} (${data.scoreStats ? data.scoreStats : "N/A"})`, true)
								.addField(`Rating Rank/Popularity Rank`, `${data.ranked ? data.ranked : "N/A"}/${data.popularity ? data.popularity : "N/A"}`, true)
								.addField(`Episodes/Duration`, `${data.episodes ? data.episodes : "N/A"}/${data.duration ? data.duration : "N/A"}`, true)
								.addField(`Broadcast Date`, `${data.aired ? data.aired : "N/A"}`, true)
								.addField(`Studios`, `${data.studios[0] === "" ? "N/A" : data.studios.join(", ")}`, true)
								.addField(`Producers`, `${data.producers[0] === "" ? "N/A" : data.producers.join(", ")}`, true)
								.addField(`Staff`, `${animeStaff.join("\n")}`, false)
								.addField(`Characters`, `${animeChar.join("\n")}`, false)
								.addFields(
									{
										name: "❯\u2000Search Online",
										// prettier-ignore
										value: `•\u2000\[Gogoanime](https://www1.gogoanime.pe//search.html?keyword=${data.title.replace(/ /g, "%20")})\n•\u2000\[AnimixPlay](https://animixplay.to/?q=${data.title.replace(/ /g,"%20")})`,
										inline: true,
									},
									{
										name: "❯\u2000PV",
										value: `${data.trailer ? `•\u2000\[Click Here!](${data.trailer})` : "No PV available."}`,
										inline: true,
									},
									{
										name: "❯\u2000MAL Link",
										value: `•\u2000\[Click Title or Here](${data.url})\n`,
										inline: true,
									}
								)
								.setFooter(`Data Fetched From Myanimelist.net`)
								.setTimestamp()
								.setThumbnail(data.picture, 100, 200);

							msg.delete();
							message.channel.send(embed);
						})
						.catch((err) => {
							console.log(err);
							msg.delete();
							message.channel.send(`Err fetching data.\n${err}`);
						});
				}
			}
		}
	}

	client.on(`message`, (message) => {
		checkGeh(message);
		detectHaiku(message);
		detectAnimeSearch(message);
	}); // Listen

	console.log(`Module: msgListener Loaded | Loaded from local modules | Now seeking for haiku, geh content, anime, and manga...`);
};
