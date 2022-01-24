const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class extends Command {
	constructor() {
		super("animequote", {
			categories: "anime-misc",
			aliases: ["aq"],
			info: "Get random quote from anime. There are over 8000+ Quotes that are fetched from [less-real](https://www.less-real.com/) Commands are scrapped from [anime-quotes-api](https://www.npmjs.com/package/anime-quotes-api)",
			usage: `${prefix}command or ${prefix}alias`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		let image;
		let tags;
		let found;

		/*
        Why these random values are being considered?
        Some quotes on Less-Real are not working for some reason. This is why such random values are taken after trial and error.
        */

		var a = Math.floor(Math.random() * 7000) || Math.floor(Math.random() * (11267 - 10950 + 1) + 10950); //7001 to 10949 missing

		let link = `https://www.less-real.com/quotes/${a}`;

		//Fetching the HTML using axios
		var { data } = await axios.get(link);

		//Using cheerio to load the HTML fetched
		var $ = await cheerio.load(data);

		//Fetching the title of the site
		var title = await $("title")[0].children[0].data.split("-");

		//Gets the quote
		var quote = await $('div[class = "quoteBig"]').text();
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

		//Remove Less Real and comma
		const final = title.toString().replace(/Less|Real|,/g, "");

		//Quote New Line
		var quoteFinal = quote.toString().replace("-", "\n\n-");

		//Add space after comma
		let tagSpace = `${Array.from(tags).join(`, `)}`;

		//Checks if quote
		// if quote found = true;
		if ((found = true)) {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(final)
				.setDescription(quoteFinal)
				.setImage(image)
				.setFooter(`Tags: ` + tagSpace);

			message.channel.send(embed);
		}

		//If quote false
		if ((found = false)) {
			var x = Math.floor(Math.random() * animequote.length);
			let embed2 = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`${quoteLocal(x).quotecharacter} - ${quoteLocal(x).quoteanime}`)
				.setDescription(`**"${quoteLocal(x).quotesentence}"**`)
				.setImage(quoteLocal(x).quoteimage)
				.setFooter(`If you see this it means that there is no quote found from less real`);

			message.channel.send(embed2);
		}
	}
};
("use strict");
var animequote = [
	{
		quotenumber: 1,
		quoteimage: "https://i.redd.it/zqww2qjnc3e51.jpg",
		quotesentence: "Hidup di dunia itu kosong karena yang kekal di akhirat",
		quotecharacter: "Dame",
		quoteanime: "Life",
	},
	{
		quotenumber: 2,
		quoteimage: "https://i.pinimg.com/564x/10/c2/c2/10c2c227f83c695cd4c08981e85a540b.jpg",
		quotesentence: "Even if everything just goes to waste someday, I'll just keep struggling. Just like i am today",
		quotecharacter: "Kaneki Ken",
		quoteanime: "Tokyo Ghoul",
	},
	{
		quotenumber: 3,
		quoteimage: "https://knowledge.insead.edu/sites/www.insead.edu/files/images/2020/04/gettyimages-628537464-1.jpg",
		quotesentence: "Hidup itu susah karena saat lahir tidak ada pilihan difficultynya",
		quotecharacter: "Unknown",
		quoteanime: "Life",
	},
	{
		quotenumber: 4,
		quoteimage: "https://cdn.discordapp.com/attachments/640848455497154570/796763009057685565/unknown.png",
		quotesentence: "Udah kaya babi genshin",
		quotecharacter: "Andre",
		quoteanime: "Quoting on Re:Zero",
	},
];

function quoteLocal(x) {
	return animequote[x];
}
