const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
var banish = require("to-zalgo/banish");

module.exports = class extends Command {
	constructor() {
		super("banish", {
			aliases: ["No alias is set for this command"],
			categories: "text",
			info: "Normalize **ẑ̴̧̳̯̔̒ā̶̟͖̗̤̙̿̉̎͛͋̆͂͝͝l̶̡̠̞̫̣̪̮̯̤̙͂̀͝͝ͅģ̵̡̨͚͚̤̦̪͕͓̞̖͖̄̏̏́̊̃̆͜o̴̡̧͎̻͈͓̞̮̩̎͆̓̉͒̽̎̿̐̋̊͆̈͠ͅě̷͔̠d̶̡̨̮̮̮̳̙͚̙͕͙̥̔̇̊̍̇** letter(s) using [to-zalgo](https://www.npmjs.com/package/to-zalgo)",
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription("Please enter the ẑ̴̧̳̯̔̒ā̶̟͖̗̤̙̿̉̎͛͋̆͂͝͝l̶̡̠̞̫̣̪̮̯̤̙͂̀͝͝ͅģ̵̡̨͚͚̤̦̪͕͓̞̖͖̄̏̏́̊̃̆͜o̴̡̧͎̻͈͓̞̮̩̎͆̓̉͒̽̎̿̐̋̊͆̈͠ͅě̷͔̠d̶̡̨̮̮̮̳̙͚̙͕͙̥̔̇̊̍̇ text that you want to normalize");

			message.channel.send(embed);
		} else {
			const banished = banish(args.join(" "));

			message.channel.send(banished);
		}
	}
};
