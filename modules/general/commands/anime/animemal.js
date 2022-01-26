const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const malScraper = require("mal-scraper");
const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();

module.exports = class extends Command {
	constructor() {
		super("animemal", {
			categories: "anime",
			aliases: ["am"],
			info: "Get information of any anime from [myanimelist.net](https://myanimelist.net/) using [mal-scraper](https://www.npmjs.com/package/mal-scraper)",
			usage: `${prefix}command/alias <title>`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		//checking args
		if (!args[0]) {
			return message.channel.send("Please input correctly!!");
		}
		const msg = await message.channel.send(`Searching for \`${args.join(" ")}\`...`);

		//main part
		var name = args.join(" ");
		malScraper
			.getInfoFromName(name)
			.then((data) => {
				if (!data) {
					return message.channel.send(`No results found for **${name}**!`);
				}

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

				msg.edit(`**Anime Found!**`);

				let embed = new MessageEmbed()
					.setColor("2E51A2")
					.setAuthor(`${data.englishTitle ? data.englishTitle : data.title} | ${data.type ? data.type : "-"}`, data.picture, data.url)
					.setDescription(data.synopsis ? data.synopsis : "No synopsis available.")
					.addField("Japanese Name", `${data.japaneseTitle ? `${data.japaneseTitle} (${data.title})` : data.title}`, false)
					.addField("Synonyms", `${data.synonyms[0] === "" ? "-" : data.synonyms.join(" ")}`, false)
					.addField(`Genres`, `${data.genres[0] === "" ? "-" : data.genres.join(", ")}`, false)
					.addField(`Age Rating`, `${data.rating ? data.rating : "-"}`, true)
					.addField(`Source`, ` ${data.source ? data.source : "-"}`, true)
					.addField(`Status`, `${data.status ? data.status : "-"}`, true)
					.addField(`User Count/Favorite`, `${data.members ? data.members : "-"}/${data.favorites ? data.favorites : "-"}`, true)
					.addField(`Average Score`, `${data.score ? data.score : "-"} (${data.scoreStats ? data.scoreStats : "-"})`, true)
					.addField(`Rating Rank/Popularity Rank`, `${data.ranked ? data.ranked : "-"}/${data.popularity ? data.popularity : "-"}`, true)
					.addField(`Episodes/Duration`, `${data.episodes ? data.episodes : "-"}/${data.duration ? data.duration : "-"}`, true)
					.addField(`Broadcast Date`, `${data.aired ? data.aired : "-"}`, true)
					.addField(`Studios`, `${data.studios[0] === "" ? "-" : data.studios.join(", ")}`, true)
					.addField(`Producers`, `${data.producers[0] === "" ? "-" : data.producers.join(", ")}`, true)
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

				// getIMG(data.title).then(function(imgGet) {
				//   return message.channel.send(embed.setImage(imgGet.IMG));  //Only problem is that the db of kitsu and mal is different so chances are that the image sent could be wrong
				// })

				return message.channel.send({ embed });
			})
			.catch((err) => {
				console.log(err);
				return message.channel.send(`**Error!** \n\n${err}`);
			});

		function getIMG(title) {
			return kitsu
				.searchAnime(title)
				.then((result) => {
					if (result[0].coverImage.original) {
						return {
							IMG: result[0].coverImage.original,
						};
					} else {
						return {
							IMG: "",
						};
					}
				})
				.catch((err) => {
					console.log(err);

					return null;
				});
		}

		function checkIfStaff(toBeCheck) {
			var listCheck = ["Director", "Original Creator", "Producer", "Music", "Sound Director", "Series Composition"];

			for (var i = 0; i < listCheck.length; i++) {
				if (toBeCheck.includes(listCheck[i])) {
					return true;
				}
			}
			return false;
		}
	}
};
