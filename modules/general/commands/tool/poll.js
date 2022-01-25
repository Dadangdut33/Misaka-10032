const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const pollEmbed = require("discord.js-poll-embed");

module.exports = class extends Command {
	constructor() {
		super("poll", {
			aliases: ["No alis is set for this command"],
			categories: "tool",
			info: "Create poll. Please not that it's not recommended to create a long poll because the bot is not hosted in a legit way so it's not always on 24/7 which means the collector won't work after reset. You can still see the poll results based on the emojis tho xD\n\n**Tips**\n1 hour = 3600 seconds\n\n**Poll limit is 10 options**",
			usage: `${prefix}command <timeout> <[title]> <[options 1]> <[options 2]> ... <[options x]>\`\`\`**Notes**\`\`\`Notice the -> []. If you want the poll to have infinite time, input 0 in timeout`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		var regex = /\[(.*?)\]/g; // Regex to find options in square bracket []
		var options = args.join(" ").match(regex); // Match the regex put it into options

		if (args[0] > 2147483647 || isNaN(args[0])) {
			// If number invalid
			let embed = new MessageEmbed().setDescription("Invalid duration inputted");

			return message.channel.send(embed);
		}

		if (!options[1]) {
			// If no options
			let embed = new MessageEmbed().setDescription("Please enter a valid options");

			return message.channel.send(embed);
		}

		if (options.length > 10) {
			let embed = new MessageEmbed().setDescription("Poll limit is 10 options!");

			return message.channel.send(embed);
		}

		// Remove the [] surrounding the options
		for (var i = 0; i < options.length; i++) {
			options[i] = options[i].replace(/[\[\]]/g, "");
		}

		// Title if first array of options
		var title = options[0];

		// Timeout on first args
		var timeout = args[0];

		// Remove first array of options which is the title
		options.shift();

		const emojiList = [
			// This contains emoji from 1-10
			"\u0031\u20E3",
			"\u0032\u20E3",
			"\u0033\u20E3",
			"\u0034\u20E3",
			"\u0035\u20E3",
			"\u0036\u20E3",
			"\u0037\u20E3",
			"\u0038\u20E3",
			"\u0039\u20E3",
			"\uD83D\uDD1F",
		];

		const forceEndPollEmoji = "\u2705"; // This is check mark emoji

		// Call the pollembed function
		pollEmbed(message, title, options, timeout, emojiList, forceEndPollEmoji).catch((error) => {
			// Catch error if there is any error
			console.log(error);
			let embed = new MessageEmbed().setTitle("An error occured").setDescription(error);

			return message.channel.send(embed);
		});
	}
};

// options is an array of strings, which contains the poll options
// timeout is the time in seconds for which users can vote for. 0 makes it infinite and default value is 30 seconds
// emojiList is the list of emojis used for voting. Defaults to 10 simple digit emojis. Which also limits the no of options you can give by default to 10. While using custom emojis be careful that discord doesnt support some emojis.
// forceEndPollEmoji is the emoji which can be voted by the poll author to force close voting. Default value is a green check box.
