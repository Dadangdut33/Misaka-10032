const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("qr", {
			aliases: ["No alias is set for this command"],
			categories: "tool",
			info: "Convert text (Can be link or just plain text) to QR code",
			usage: `${prefix}command/alias <link/text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			return message.channel.send("Please enter a valid url or text!");
		}

		const neb = args.join("+");

		/*function isValidURL(string) {
            //regex for link
            // eslint-disable-next-line no-useless-escape
            const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null);
        }*/

		// if (isValidURL(neb) == true) {
		const url = `http://api.qrserver.com/v1/create-qr-code/?data=${neb}&size=400x400`;

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setDescription(`Original Text\`\`\`${args.join(" ")}\`\`\``)
			.setTitle(`:arrow_down: QR Code Generated`)
			.setImage(url);
		await message.channel.send(embed);
		// }
	}
};
