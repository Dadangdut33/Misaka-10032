const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix, Genshin_Ver } = require("../../../../config");
const { paginationEmbed, find_DB, capitalizeFirstLetter } = require("../../../../local_dependencies/functions.js");
const emojiList = ["⏪", "⏩", "❌"];

module.exports = class extends Command {
	constructor() {
		super("gcharacter", {
			categories: "genshin",
			aliases: ["char", "chara", "gc", "gchar"],
			info: "Gives information about character farming info in genshin impact",
			usage: `${prefix}command/alias <name> or [lvlup] or [list]`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		var pages = [];

		if (!args[0]) {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Please enter the name of character that you want to check!")
				.setDescription("For character list you can type in command/alias list. **Example:** ```css\n!!gchar list```")
				.setFooter(message.guild.me.displayName)
				.setTimestamp();

			return message.channel.send(embed);
		}

		switch (args.join(" ").toLowerCase()) {
			case "list":
				list();
				break;

			case "lvlup" || "lvl":
				lvlUp();
				break;

			default:
				find_DB("g_Char", { name: capitalizeFirstLetter(args.join(" ")) }, function (err, docs) {
					if (docs[0] === undefined) {
						// if no data found
						notFound();
						return;
					} else {
						pages.push(charEmbed(docs[0]));
						pages.push(cardEmbed(docs[0]));
						pages.push(info());

						paginationEmbed(message, pages, emojiList, 300000);
					}
				});
				break;
		}

		async function list() {
			var anemo = [],
				cryo = [],
				electro = [],
				geo = [],
				hydro = [],
				pyro = [],
				adaptive = [],
				total;

			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
				.setTitle(`Showing Full Genshin Impact Character List`)
				.addField(`❯\u2000\Upcoming Character`, "- Ayaka [Cryo]\n")
				.setFooter(`Genshin Character List Patch ${Genshin_Ver}`)
				.setTimestamp();

			find_DB("g_Char", "", function (err, docs) {
				for (var i = 0; i < docs.length; i++) {
					switch (docs[i].type) {
						case "anemo":
							anemo.push(`- ${docs[i].name[0]}`);
							break;
						case "cryo":
							cryo.push(`- ${docs[i].name[0]}`);
							break;
						case "electro":
							electro.push(`- ${docs[i].name[0]}`);
							break;
						case "geo":
							geo.push(`- ${docs[i].name[0]}`);
							break;
						case "hydro":
							hydro.push(`- ${docs[i].name[0]}`);
							break;
						case "pyro":
							pyro.push(`- ${docs[i].name[0]}`);
							break;
						case "adaptive":
							adaptive.push(`- ${docs[i].name[0]}`);
							break;
						default:
							break;
					}
				}
				embed.addField(`❯\u2000\Anemo Character [${anemo.length}]`, anemo.join("\n"), true);
				embed.addField(`❯\u2000\Cryo Character [${cryo.length}]`, cryo.join("\n"), true);
				embed.addField(`❯\u2000\Electro Character [${electro.length}]`, electro.join("\n"), true);
				embed.addField(`❯\u2000\Geo Character [${geo.length}]`, geo.join("\n"), true);
				embed.addField(`❯\u2000\Hydro Character [${hydro.length}]`, hydro.join("\n"), true);
				embed.addField(`❯\u2000\Pyro Character [${pyro.length}]`, pyro.join("\n"), true);
				embed.addField(`❯\u2000\Adaptive Character [${adaptive.length}]`, adaptive.join("\n"), true);

				total = anemo.length + cryo.length + electro.length + geo.length + hydro.length + pyro.length + adaptive.length;

				embed.setDescription(
					`There are currently over ${total} playable character in genshin impact, each of them (aside from traveller) has their own unique element. There are 6 types of element in genshin impact. Currently Anemo has ${anemo.length} playable character, Cryo has ${cryo.length}, Electro has ${electro.length}, Geo has ${geo.length}, Hydro has ${hydro.length}, and Pyro has ${pyro.length}.`
				);

				message.channel.send(embed);
			});
		}

		function notFound() {
			let embed = new MessageEmbed().setTitle("Invalid Character Name").setDescription("For character list, check using !!gc list");

			return message.channel.send(embed);
		}

		function lvlUp() {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(":arrow_down: Materials and mora needed for lvl up")
				.setImage("https://cdn.discordapp.com/attachments/799595012005822484/799595215521316924/EriB3vTVkAYs0HD.jpg");
			message.channel.send(embed);
		}

		function charEmbed(data) {
			let embed = new MessageEmbed()
				.setColor(data.color)
				.setAuthor(`${data.name[0]} ${data.stars}`, data.pic_Small)
				.setDescription(`${data.name[0]} ${data.description}`)
				.addField("❯\u2000Talent Leveling Material:", data.fields.talent, true)
				.addField("❯\u2000Character Ascension Material:", data.fields.charAsc, true)
				.addField("❯\u2000World boss to gain material:", data.fields.worldBoss)
				.addField("❯\u2000Day To Farm Talent Material:", data.fields.farmDay)
				.addField("❯\u2000Special Passive", data.fields.passive)
				.setImage(data.pic_Big);

			return embed;
		}

		function cardEmbed(data) {
			let embed = new MessageEmbed().setColor(data.color).setTitle(`:arrow_down: Tips for ${data.name[0]} ${data.stars}`).setImage(data.pic_Card);

			return embed;
		}

		function info() {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(":arrow_down: Materials and Mora Needed For Leveling")
				.setDescription("For full character list type list in command```css\n!!gchar list```")
				.setImage("https://cdn.discordapp.com/attachments/799595012005822484/799595215521316924/EriB3vTVkAYs0HD.jpg");
			return embed;
		}
	}
};
