const responseImg_ole = [
	"https://media.discordapp.net/attachments/641142856094056471/942304942239125544/youre-welcome-the-rock.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942304972941455430/HardDarkIlladopsis-max-1mb.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942304902737186876/200.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942304871166640148/youre-welcome-bubble-gum.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942304831199133696/homer-simpson-bart-simpson.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942304814304460930/moist-critical.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942291885123321897/chenqui-borat.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942291843855556648/nice-funny.gif",
	"https://media.discordapp.net/attachments/641142856094056471/942275553174642718/thegangg.jpg",
	"https://media.discordapp.net/attachments/641142856094056471/942275503186927656/welcome-friend.jpg",
	"https://media.discordapp.net/attachments/641142856094056471/942275485138841671/5094861.jpg",
];

const responseTxt_ole = [
	"Absen dulu absen",
	"wElKAm Banh",
	"Hello ma friend … nice to meet you ",
	"Selamat pagi , siang , sore , malem : ) ",
	"WELCOME (selamat datang).. BUKAN KESET WELCOME",
	"Thank you udah join .. semoga hari mu tidak suram : )",
	"Selamat datang, Jadi gini … iya gitu",
	"Welcome , Welcome , welcome",
	"Selamat datang, semoga hari mu menyenangkan",
	"😂👆",
];

module.exports = (client, guildID, channelID) => {
	const personalGuild = client.guilds.cache.get(guildID);
	if (!personalGuild) return console.log("Invalid guild for welcome message");
	try {
		const theID = channelID;
		const sendWelcomeMessage = (member) => {
			try {
				const guild = member.guild;
				const tagUser = `<@${member.user.id}>`;

				const channel = guild.channels.cache.get(theID);
				const randomImg = responseImg_ole[Math.floor(Math.random() * responseImg_ole.length)];
				const randomTxt = responseTxt_ole[Math.floor(Math.random() * responseTxt_ole.length)];
				if (channel) channel.send({ files: [randomImg], content: tagUser + " " + randomTxt });
			} catch (error) {
				console.log(error);
			}
		};

		client.on("guildMemberAdd", (member) => {
			// check if the guild is the personal guild
			if (member.guild === personalGuild) sendWelcomeMessage(member);
		});

		console.log(`Module: Welcome-message Loaded | Loaded from local module | For guild ${personalGuild.name}`);
	} catch (e) {
		console.log(e);
	}
};
