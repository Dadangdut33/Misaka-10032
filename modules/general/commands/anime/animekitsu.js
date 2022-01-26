const { MessageEmbed } = require("discord.js");
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const malScraper = require("mal-scraper");
const { promptMessage } = require("../../../../local_dependencies/functions.js");
const chooseArr = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

module.exports = class extends Command {
	constructor() {
		super("animekitsu", {
			categories: "anime",
			aliases: ["ak"],
			info: "Get information of any anime from [kitsu.io](https://kitsu.io/explore/anime) using kitsu.js npm",
			usage: `${prefix}command/alias <title> [[kitsu]]\`\`\`**Notes**\`\`\`Optionally, you can search using old kitsu method by including [kitsu] in the arguments. *Notice the -> []`,
			guildOnly: true,
		});
	}
	async run(message, args) {
		//checking args
		if (!args[0]) {
			return message.channel.send("Please input the correct anime!");
		}
		const msg = await message.channel.send(`Searching for \`${args.join(" ")}\`...`);

		var regex = /\[(.*?)\]/g;
		var search2 = [];
		search2 = args.join(" ").match(regex); // If regex match then old method

		// OLD METHOD USING KITSU TO SEARCH
		if (search2) {
			search2[0] = search2[0].replace(/[\[\]]/g, "");

			if (search2[0].toLowerCase() == "kitsu") {
				// Check if it's correct option or not
				kitsu
					.searchAnime(args.join(" ").replace(/\[kitsu\]/i, ""))
					.then(async (result) => {
						if (result.length === 0) {
							return message.channel.send(`No results found for **${search2}**!`);
						}
						msg.edit(`**Anime Found!**`);
						var options = [];
						var limit = result.length;
						if (result.length >= 5) {
							limit = 5;
						}

						for (var i = 0; i < limit; i++) {
							options[i] = `${i + 1}. ${result[i].titles ? `${result[i].titles.english ? result[i].titles.english : result[i].slug}` : result[i].slug}`;
						}

						const embed = new MessageEmbed()
							.setColor("F75136")
							.setAuthor("Kitsu.io", "https://media.discordapp.net/attachments/799595012005822484/813793894163546162/kitsu.png", "https://kitsu.io/")
							.setTitle(`Please Choose The Anime That You Are Searching For Below`)
							.setDescription(options.join("\n"));

						const optionsToChoose = await message.channel.send(embed); // Await the embed
						const reacted = await promptMessage(optionsToChoose, message.author, 50, chooseArr); // Await reaction
						const reaction = await getResult(reacted); // Get Result from reaction
						await optionsToChoose.reactions.removeAll();

						if (reaction == undefined) {
							// If no reaction
							msg.delete();
							embed.setAuthor("Search aborted!").setTitle("").setDescription(`Search for **${search}** aborted because of no reaction from ${message.author}!`);

							optionsToChoose.edit(embed);
							return;
						}

						if (reaction + 1 > limit) {
							// +1 because the original is from 0 to access the array
							msg.delete();
							embed.setAuthor("Invalid options chosen!").setTitle("").setDescription("Please choose the correct available options!");

							optionsToChoose.edit(embed);
							return;
						}

						var anime = result[reaction];

						// Results to be shown
						embed
							.setTitle("")
							.setColor("F75136")
							.setAuthor(`${anime.titles.english ? anime.titles.english : search2} | ${anime.showType}`, anime.posterImage.original, `https://kitsu.io/anime/${anime.id}`)
							.setDescription(anime.synopsis)
							.addField("Japanese Name", `${anime.titles.romaji ? anime.titles.romaji : "-"}`, false)
							.addField(`Age Rating`, `${anime.ageRating}`, true)
							.addField(`NSFW`, ` ${anime.nsfw ? "Yes" : "No"}`, true)
							.addField(`User Count/Favorite`, `${anime.userCount}/${anime.favoritesCount}`, true)
							.addField(`Average Rating`, `${anime.averageRating}`, true)
							.addField(`Rating Rank`, `${anime.ratingRank}`, true)
							.addField(`Popularity Rank`, `${anime.popularityRank}`, true)
							.addField(`Episodes`, `${anime.episodeCount ? anime.episodeCount : "N/A"}`, true)
							.addField(`Start Date`, `${anime.startDate}`, true)
							.addField(`End Date`, `${anime.endDate ? anime.endDate : "Still airing"}`, true)
							.addFields(
								{
									name: "❯\u2000Search Online",
									// prettier-ignore
									value: `•\u2000\[Gogoanime](https://www1.gogoanime.pe//search.html?keyword=${data.title.replace(/ /g, "%20")})\n•\u2000\[AnimixPlay](https://animixplay.to/?q=${data.title.replace(/ /g,"%20")})`,
									inline: true,
								},
								{
									name: "❯\u2000PV",
									value: `•\u2000\[Click Here!](https://youtube.com/watch?v=${anime.youtubeVideoId})`,
									inline: true,
								},
								{
									name: "❯\u2000Search on MAL",
									value: `•\u2000\[MyAnimeList](https://myanimelist.net/search/all?q=${args.join("+").replace(/\[kitsu\]/i, "")}&cat=all)`,
									inline: true,
								}
							)
							.setFooter(`Data Fetched From Kitsu.io`)
							.setTimestamp()
							.setThumbnail(anime.posterImage.original, 100, 200);

						if (anime.coverImage) {
							embed.setImage(anime.coverImage.original);
						}

						msg.delete();
						optionsToChoose.edit(embed);
					})
					.catch((err) => {
						console.log(err); //cathing err
						return message.channel.send(`No results found for **${search}**!`);
					});
			} else {
				// If regex fail to find [kitsu]
				msg.edit(`**Search Aborted!**`);

				let embed = new MessageEmbed().setTitle(`Wrong arguments provided`).setDescription(`The optional inside the bracket should be -> [kitsu]\nPlease check using the help commands if you are still unsure`);

				return message.channel.send(embed);
			}
		} else {
			// Modern ver, using mal scrapper to get the anime name lol
			//main part
			var search = message.content.split(/\s+/g).slice(1).join(" ");
			getURL(search).then(function (malscrap) {
				var malSearch;
				if (malscrap.URL == null) {
					malSearch = search;
				} else {
					malSearch = malscrap.URL;
				}

				kitsu
					.searchAnime(malscrap.name)
					.then(async (result) => {
						if (result.length === 0) {
							return message.channel.send(`No results found for **${malscrap.name}**!`);
						}
						msg.edit(`**Anime Found!**`);

						var options = [];
						var limit = result.length;
						if (result.length >= 5) {
							limit = 5;
						}

						for (var i = 0; i < limit; i++) {
							options[i] = `${i + 1}. ${result[i].titles ? `${result[i].titles.english ? result[i].titles.english : result[i].slug}` : result[i].slug}`;
						}

						const embed = new MessageEmbed()
							.setColor("RANDOM")
							.setAuthor("Kitsu.io", "https://media.discordapp.net/attachments/799595012005822484/813793894163546162/kitsu.png", "https://kitsu.io/")
							.setTitle(`Please Choose The Anime That You Are Searching For Below`)
							.setDescription(options.join("\n"));

						const optionsToChoose = await message.channel.send(embed); // Await the embed
						const reacted = await promptMessage(optionsToChoose, message.author, 50, chooseArr); // Await reaction
						const reaction = await getResult(reacted); // Get Result from reaction
						await optionsToChoose.reactions.removeAll();

						if (reaction == undefined) {
							// If no reaction
							msg.delete();
							optionsToChoose.delete();
							return message.channel.send(`Search for **${search}** Aborted because of no reaction from ${message.author}!`);
						}

						if (reaction + 1 > limit) {
							// +1 because the original is from 0 to access the array
							msg.delete();
							optionsToChoose.delete();
							return message.channel.send(`Invalid options chosen! Please choose the correct available options!`);
						}

						var anime = result[reaction];

						// console.log(anime);
						// Results to be shown
						embed
							.setTitle("")
							.setColor("F75136")
							.setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original, `https://kitsu.io/anime/${anime.id}`)
							.setDescription(anime.synopsis)
							.addField("Japanese Name", `${anime.titles.romaji ? anime.titles.romaji : "-"}`, false)
							.addField(`Age Rating`, `${anime.ageRating}`, true)
							.addField(`NSFW`, ` ${anime.nsfw ? "Yes" : "No"}`, true)
							.addField(`User Count/Favorite`, `${anime.userCount}/${anime.favoritesCount}`, true)
							.addField(`Average Rating`, `${anime.averageRating}`, true)
							.addField(`Rating Rank`, `${anime.ratingRank}`, true)
							.addField(`Popularity Rank`, `${anime.popularityRank}`, true)
							.addField(`Episodes`, `${anime.episodeCount ? anime.episodeCount : "N/A"}`, true)
							.addField(`Start Date`, `${anime.startDate}`, true)
							.addField(`End Date`, `${anime.endDate ? anime.endDate : "Still airing"}`, true)
							.addFields(
								{
									name: "❯\u2000Search Online",
									value: `•\u2000\[Gogoanime](https://gogoanime.sh//search.html?keyword=${args.join("%20")})\n•\u2000\[4Anime](https://4anime.to/?s=${args.join(
										"+"
									)})\n•\u2000\[9Anime](https://9anime.ru/search?keyword=${args.join("+")})`,
									inline: true,
								},
								{
									name: "❯\u2000PV",
									value: `•\u2000\[Click Here!](https://youtube.com/watch?v=${anime.youtubeVideoId})`,
									inline: true,
								},
								{
									name: "❯\u2000MAL Link",
									value: `•\u2000\[MyAnimeList](${malSearch})`,
									inline: true,
								}
							)
							.setFooter(`Data Fetched From Kitsu.io`)
							.setTimestamp()
							.setThumbnail(anime.posterImage.original, 100, 200);

						if (anime.coverImage) {
							embed.setImage(anime.coverImage.original);
						}

						msg.delete();
						optionsToChoose.edit(embed);
					})
					.catch((err) => {
						console.log(err); //cathing err
						return message.channel.send(`No results found for **${search}**!`);
					});
			});
		}

		function getURL(title) {
			return malScraper
				.getInfoFromName(title)
				.then((data) => {
					return {
						URL: data.url,
						name: data.title,
					};
				})
				.catch((err) => {
					console.log(err);

					return null;
				});
		}

		// Below is the function to get the results of the reaction
		function getResult(me) {
			// Pass var as me
			switch (me) {
				case "1️⃣":
					return 0;
				case "2️⃣":
					return 1;
				case "3️⃣":
					return 2;
				case "4️⃣":
					return 3;
				case "5️⃣":
					return 4;
			}
		}
	}
};
