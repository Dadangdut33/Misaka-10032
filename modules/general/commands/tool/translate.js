const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const axios = require("axios");

module.exports = class extends Command {
	constructor() {
		super("translate", {
			aliases: ["tl"],
			categories: "tool",
			info: "Translate text using google translate.",
			usage: `${prefix}command/alias <source lang code> <destination lang code> <text to translate>\`\`\`**Notes**\n[Click here to see full language code](https://developers.google.com/admin-sdk/directory/v1/languages)`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (args.length < 3) {
			let embed = new MessageEmbed().setTitle(`Input Error`).setDescription(`Please input the correct format. Ex: \`\`\`${prefix}tl id en Selamat pagi!\`\`\``);

			return message.channel.send(embed);
		}
		const msg = await message.channel.send(`Loading...`);

		const options = {
			method: "GET",
			url: `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${args[0]}&tl=${args[1]}&dt=t&q=${encodeURIComponent(args.slice(2).join(" "))}`,
		};

		// get results
		axios(options)
			.then((res) => {
				const data = res.data;
				const result = data[0][0][0];

				msg.delete();
				let embed = new MessageEmbed()
					.setAuthor(message.author.username, message.author.displayAvatarURL({ format: "jpg", size: 2048 }))
					.setTitle(`${args[0]} to ${args[1]}`)
					.setDescription(result ? result : "Fail to fetch!")
					.addField("Not correct?", `Check that the language code is correct first in [here](https://developers.google.com/admin-sdk/directory/v1/languages)`)
					.setFooter(`Via Google Translate`);

				return message.channel.send(embed);
			})
			.catch((err) => {
				msg.edit(`Error: ${err.message}`);
			});
	}
};
