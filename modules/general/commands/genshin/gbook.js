const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const { paginationEmbed, find_DB, capitalizeFirstLetter } = require("../../../../local_dependencies/functions.js");
const emojiList = ["⏪", "⏩", "❌"];

module.exports = class extends Command {
	constructor() {
		super("gbook", {
			categories: "genshin",
			aliases: ["b", "book"],
			info: "Gives information about talent book in genshin impact",
			usage: `${prefix}gbook [name] or ${prefix}alias [name]`,
			guildOnly: true,
		});
	}
	async run(message, args) {
		if (!args[0]) {
			return message.channel.send(info());
		}

		switch (args.join(" ").toLowerCase()) {
			case "all":
				var pages = [];

				find_DB("g_Char", { book: "Gold" }, function (err, docs) {
					pages.push(dataToEmbed(docs));
				});

				find_DB("g_Char", { book: "Ballad" }, function (err, docs) {
					pages.push(dataToEmbed(docs));
				});

				find_DB("g_Char", { book: "Freedom" }, function (err, docs) {
					pages.push(dataToEmbed(docs));
				});

				find_DB("g_Char", { book: "Diligence" }, function (err, docs) {
					pages.push(dataToEmbed(docs));
				});

				find_DB("g_Char", { book: "Prosperity" }, function (err, docs) {
					pages.push(dataToEmbed(docs));
				});

				find_DB("g_Char", { book: "Resistance" }, function (err, docs) {
					pages.push(dataToEmbed(docs));

					paginationEmbed(message, pages, emojiList, 300000);
				});
				break;

			case "tatang sutarma":
			case "hidden":
			case "rahasia negara":
			case "rahasia":
			case "misteri":
			case "harta karun":
			case "tatang":
				message.channel.send(tatangSutarma());
				break;

			default:
				find_DB("g_Char", { book: `${capitalizeFirstLetter(args.join(" "))}` }, function (err, docs) {
					if (!docs[0]) {
						return message.channel.send(info());
					} else {
						return message.channel.send(dataToEmbed(docs));
					}
				});
				break;
		}

		function dataToEmbed(data) {
			var chars = [];
			Array.from(data, (newData) => {
				chars.push(newData.name[0]);
			});

			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
				.setTitle(`Information on "${data[0].book}" Book`)
				.setDescription(`Requested by ${message.author}`)
				.addField("❯\u2000Found On:", data[0].domain, true)
				.addField("❯\u2000Day to Farm:", data[0].fields.farmDay, true)
				.addField("❯\u2000Character That Needs It:", chars.join(", "))
				.setFooter(`${data[0].book} Talent Book Farming Info`)
				.setTimestamp();

			return embed;
		}

		function tatangSutarma() {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
				.setTitle(`Information on the legendary "Tatang Sutarma"`)
				.setDescription(
					`Requested by the chosen one ${message.author}, Konon katanya buku ini hanya ada satu di dunia dan hanya dipegang oleh satu-satunya sang sakti yaitu Sule sendiri\n
      Tapi, tahukah anda kalau buku tatang sutarma benar benar ada? dan buku itu ada sejak tahun 1788. Dalam buku ini terdapat terjemahan dari kitab-kitab Sunda Kuno karya pujangga besar yang meliputi 14 kitab. Keempat belas kitab kuno itu menjadi pedoman hidup sehari-hari masyarakat Jawa yang diwariskan secara turun-temurun dari generasi ke generasi. Pada saat-saat tertentu malah dijadikan bahan renungan yang menambah kekayaan rohani. Kita pantas bersyukur dengan kreatifitas dan produktifitas nenek moyang itu. Harkat dan martabat kita semakin mantab, karena mempunyai jati diri yang berupa kearifan lokal. Berbagai permasalahan yang terjadi sekarang sebenarnya bisa diatasi dengan butir-butir budaya luhur masa silam.`
				)
				.addField("❯\u2000Found On:", "Indonesia - Unspecified Location", true)
				.addField("❯\u2000Day To Farm:", "Confidential Information", true)
				.addField("❯\u2000Chapter That Are Released To Public Can Be Found On:", "https://buku-tatang-sutarman.blogspot.com/")
				.setImage("https://cdn.discordapp.com/attachments/651015913080094724/794514667992776724/Tatang_Sutarma.gif")
				.setFooter("Above are images of Tatang Sutarma Sighting In Public")
				.setTimestamp();

			return embed;
		}

		function info() {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle("Please enter the correct name of the book that you want to check!")
				.setDescription("There are currently 6 books for talent upgrade in genshin impact. You can use this command to check each of their farming information")
				.addField("❯\u2000Book Lists:", "- Gold\n- Ballad\n- Freedom\n- Prosperity\n- Resistance")
				.addField(`You can also check every book by using`, `${prefix}gbook all`)
				.setFooter(message.guild.me.displayName)
				.setTimestamp();

			return embed;
		}
	}
};
