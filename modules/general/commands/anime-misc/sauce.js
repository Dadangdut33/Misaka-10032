const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class extends Command {
	constructor() {
		super("sauce", {
			categories: "anime-misc",
			aliases: ["source"],
			info: "Get an image source by using [saucenao](https://saucenao.com/)",
			usage: `${prefix}command/alias [url/image]\`\`\`**Or You can reply to a message that has an image with**\`\`\`${prefix}command/alias`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		const chars = { "/": "%2F", ":": "%3A" };
		var ref, refMsg, url_or_attachment, link;

		const msgLoading = await message.channel.send("**Fetching message...**");

		if (args.length == 0) {
			// check if message is replying or not
			if (message.reference) {
				// fetch message by  id
				ref = message.reference;
				refMsg = await message.channel.messages.fetch(ref.messageID).then((msg) => msg);

				if (refMsg.attachments.size > 0) {
					// get attachment
					url_or_attachment = refMsg.attachments.first().proxyURL;
				} else {
					// get url
					url_or_attachment = refMsg.content;
					// regex match img url
					var regex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp))/gi;
					var match = regex.exec(url_or_attachment);
					if (match) {
						url_or_attachment = match[0];
					}
				}
			} else {
				// if not reply
				url_or_attachment = message.attachments.first().proxyURL;
			}
			// check if attachment is empty
			if (!url_or_attachment || url_or_attachment.match(/\.(jpeg|jpg|gif|png)$/) == null) return message.channel.send(`**Please input a valid image url or reply to a message that has an image.**`);

			link = `https://saucenao.com/search.php?db=999&url=${url_or_attachment.replace(/[:/]/g, (m) => chars[m])}`;
		} else {
			// check if input is a valid image url or not
			if (args[0].match(/\.(jpeg|jpg|gif|png)$/) == null) return message.channel.send(`**Please input a valid image url or reply to a message that has an image.**`);
			link = `https://saucenao.com/search.php?db=999&url=${args[0].replace(/[:/]/g, (m) => chars[m])}`;
		}

		msgLoading.edit("**Fetching data from SauceNao...**");
		// Fetching the HTML using axios
		var { data } = await axios.get(link);

		// Using cheerio to load the HTML fetched
		var $ = cheerio.load(data);

		// get all the elements with class "resulttablecontent"
		var results = $(".resulttablecontent");

		var limit = results.length;
		if (limit > 10) {
			limit = 10;
		}

		// get top 5 results and store in array, after that remove element that is from the same source
		var results_array = [],
			imgLink,
			similarityPercentage;
		for (var i = 0; i < limit; i++) {
			imgLink = $(results[i]).find(".resultcontentcolumn").find("a").attr("href");
			similarityPercentage = $(results[i]).find(".resultsimilarityinfo").text();

			// result is in <a></a>
			try {
				results_array.push([getDomainName(imgLink), imgLink, similarityPercentage]);
			} catch (e) {} // ignored
		}

		// remove duplicate
		results_array = results_array.filter((v, i, a) => a.findIndex((t) => t[0] === v[0]) === i);

		// remove furaffinity => shit
		results_array = results_array.filter((v, i, a) => v[0] !== "furaffinity.net");

		// remove if percentage is less than 70
		results_array = results_array.filter((v, i, a) => parseInt(v[2].split("%")[0]) > 69);

		// if no result found
		if (results_array.length == 0) {
			msgLoading.delete();
			return message.channel.send(`**No result found.**`);
		} else {
			msgLoading.edit("**Loading Finished!**");
			// create embed
			// prettier-ignore
			const embed = new MessageEmbed()
				.setColor("0096fa")
				.setTitle(`🥫 Found ${results_array.length} results`)
				.setDescription(`[See Full Result](${link})`)
				.setImage(url_or_attachment)
				.setFooter(`Via SauceNao.com | Use top result for accurate result.`);

			if (results_array.length > 1) {
				embed.addField(`Top Result (${results_array[0][2]})`, `[${results_array[0][0]}](${results_array[0][1]})`);
				embed.addField(
					`Other Results (Might not be accurate)`,
					results_array
						.slice(1, results_array.length)
						.map((v, i) => `[${v[0]} (${v[2]})](${v[1]})`)
						.join(" | ")
				);
			} else if (results_array.length == 0) {
				embed.addField(`No Result found`, `Results found has less than 70% similarity. You can check full result for more info.`);
			} else {
				embed.addField(`Top Result (${results_array[0][2]})`, `[${results_array[0][0]}](${results_array[0][1]})`);
			}

			// send embed
			return message.channel.send(embed);
		}
	}
};

function getDomainName(url) {
	var domain = url.split("/")[2];

	return domain.replace(/^www\./, "");
}
