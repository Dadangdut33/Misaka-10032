const { Event } = require("../../../handler");
const { prefix } = require("../../../config");
const Moment = require("moment-timezone");
// public
const table = require("./types/startup/start-table");
const activityRand = require("./types/public/bot-activity");
const listenToMessage = require("./types/public/msgListener");

// personal private server
const membercount = require("./types/private/member-count");
const Auditlog = require("./types/private/audit");
const serverInfo = require("./types/private/server-info");
const messageSpotlight = require("./types/private/message-spotlight");
// const dailyMessage = require('./types/private/daily-message');

// slashes
const slashCommands = require("./types/slash-commands/slasher");

module.exports = class extends Event {
	constructor() {
		super("ready");
	}

	run(client) {
		//Log Table to Console and login to console
		// table("notable");
		// prettier-ignore
		console.log(
			`Logged in as ${client.user.tag} at ${Moment(client.readyAt).tz("Asia/Jakarta").format("dddd DD MMMM YYYY HH:mm:ss")}\nManaging ${client.guilds.cache.size} Guilds, ${client.channels.cache.size} Channels, and ${client.users.cache.size} Members`
		);

		// Presence at start
		client.user.setPresence({
			status: "online",
			activity: {
				name: `${prefix}help | ${Moment(client.readyAt).tz("Asia/Jakarta").format("HH:mm:ss")} Booting up... Managing ${client.guilds.cache.size} Guilds, ${client.channels.cache.size} Channels, and ${
					client.users.cache.size
				} Members`,
				type: "PLAYING",
			},
		});

		//Bot Activity
		setInterval(() => {
			var x = Math.floor(Math.random() * activityRand().actLen);
			client.user.setActivity({
				type: `${activityRand(x).activity.type}`,
				name: `${prefix}help | ${activityRand(x).activity.desc}`,
			});
		}, 900000); //900000 -> every 15 minutes
		console.log(`${"=".repeat(30)}\nModule: Random Bot activity loaded (${activityRand().actLen}) | Loaded from local modules | Bot's presence will change every 15 minutes.`);

		// register slash commands
		slashCommands(client);

		// events
		const personalGuildID = "640790707082231834",
			vc_label_id = "798031042954919957",
			channel_Spotlight_id = "935898723735728148";

		// Some Auditlog
		Auditlog(client, {
			personalServerID: {
				auditlog: "mod-log",
				auditmsg: "mod-log",
			},
		});

		// Message Listener
		listenToMessage(client); // meme react, haiku, anime, manga, crosspost news
		messageSpotlight(client, personalGuildID, channel_Spotlight_id); // message spotlight

		// Membercount
		membercount(client, personalGuildID, vc_label_id); // update member count

		// Serverinfo
		serverInfo(
			client,
			personalGuildID,
			"820964768067878922", // channelID
			"640825665310031882", // rulesChannelID
			"645494894613233665", // modRolesID
			"820964895767265280", // serverInfoID
			"821170444509380639", // emojisInfoID1
			"821170482945458196", // emojisInfoID2
			"821205412795383871", // memberInfoID
			"821206531730571274", // jumpChannelID
			"640790708155842575", // jumpToGeneral
			"640790708155842587", // vcGeneral
			"827086299051196426" // publicStage
		); // Updated every 15 minutes
	}
};
