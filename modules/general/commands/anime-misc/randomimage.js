const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class extends Command {
	constructor() {
		super("randomimage", {
			categories: "anime-misc",
			aliases: ["ri", "lri"],
			info: "Get random image fetched from [less-real](https://www.less-real.com/)",
			usage: `${prefix}command or ${prefix}alias`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		try {
			let image;
			let tags;

			/*
        Why these random values are being considered?
        Some quotes on Less-Real are not working for some reason. This is why such random values are taken after trial and error.
        */

			var a = Math.floor(Math.random() * 30750);

			let link = `https://www.less-real.com/images/${a}`;

			//Fetching the HTML using axios
			var { data } = await axios.get(link);

			//Using cheerio to load the HTML fetched
			var $ = await cheerio.load(data);

			//Get Image
			try {
				image = "https://www.less-real.com" + (await $("img")[1].attribs.src);
			} catch (err) {
				image = "";
			}
			try {
				tags = await $("img")[1].attribs.alt.split(",");
				tags = tags.map((s) => s.trim());
			} catch (err) {
				tags = "";
			}
			//Add space after comma
			let tagSpace = `${Array.from(tags).join(`, `)}`;

			//
			const chars = { "/": "%2F", ":": "%3A" };

			//If image empty
			if (image == "") {
				message.channel.send(imgLocal());
			} else {
				//Send Embed
				let embed = new MessageEmbed()
					.setColor("RANDOM")
					.setImage(image)
					.setDescription(`[LR Source](${link}) - [SauceNAO](https://saucenao.com/search.php?db=999&url=${image.replace(/[:/]/g, (m) => chars[m])})`)
					.setFooter(`Tags: ` + tagSpace);

				message.channel.send(embed);
			}
		} catch (error) {
			message.channel.send(imgLocal());
		}
	}
};

("use strict");
var localimg = [
	{
		title: "Kosong",
		image: "https://cdn.discordapp.com/attachments/653206818759376916/797412658063212544/1503598.png",
		description: "Seperti hidup ini",
	},
	{
		title: "Kosong",
		image: "https://cdna.artstation.com/p/assets/images/images/025/208/698/large/nathan-jordan-backroom2-v3-final.jpg?1585023646",
		description: "Seperti hidup ini",
	},
	{
		title: "Kosong",
		image: "https://static.wikia.nocookie.net/backrooms/images/7/7d/Lvl10.jpg/revision/latest?cb=20190730121302",
		description: "Seperti hidup ini",
	},
];

function imgLocal(x) {
	var x = Math.floor(Math.random() * localimg.length);
	let embed = new MessageEmbed()
		.setColor("RANDOM")
		.setTitle(`${localimg[x].title}`)
		.setImage(`${localimg[x].image}`)
		.setDescription(`${localimg[x].description}`)
		.setFooter(`If you see this it means that the bot fails to fetch\ndata from less real. Might be because less real is down.`);

	return embed;
}
