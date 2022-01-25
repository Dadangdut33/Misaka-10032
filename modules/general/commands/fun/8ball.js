const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("8ball", {
			categories: "fun",
			aliases: ["No alias is set for this command"],
			info: "*The Magic 8 Ball is a toy used for fortune-telling or seeking advice* or at least that's what it's supposed to do, so yeah.",
			usage: `${prefix}8ball [...]`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		var x = Math.floor(Math.random() * responses.length);

		message.channel.send(`:8ball: | ${random8ball(x)} **${message.author.username}**`);
	}
};

const responses = [
	"it is certain",
	"it is decidedly so",
	"without a doubt",
	"yes — definitely",
	"you may rely on it",
	"as I see it, yes",
	"most likely",
	"outlook good",
	"yes",
	"signs point to yes",
	"reply hazy, try again",
	"ask again later",
	"better not tell you now",
	"cannot predict now",
	"concentrate and ask again",
	"don’t count on it",
	"my reply is no",
	"my sources say no",
	"outlook not so good",
	"very doubtful",
	"Menurut buku tatang sutarma jawabannya adalah IYA",
	"Menurut buku tatang sutarma jawabannya adalah Tidak",
	"Iya silakan",
	"Monggo",
	"ora",
	"Jangan",
];

function random8ball(x) {
	return responses[x];
}
