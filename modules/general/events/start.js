const { Event } = require("../../../handler");
const { prefix } = require("../../../config");
const Moment = require("moment-timezone");
const membercount = require("./types/member-count");
const activityRand = require("./types/bot-activity");
const table = require("./types/start-table");
const Auditlog = require("./types/audit");
const listenToMessage = require("./types/msgListener");
const serverInfo = require("./types/server-info");
const crosspost = require("./types/crosspost");
// const dailyMessage = require('./types/daily-message');

module.exports = class extends Event {
	constructor() {
		super("ready");
	}

	run(client) {
		//Log Table to Console and login to console
		table("notable");
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
			var x = Math.floor(Math.random() * activityRand().actLen); //Now automatic
			client.user.setActivity({
				type: `${activityRand(x).activity.type}`,
				name: `${prefix}help | ${activityRand(x).activity.desc}`,
			});
		}, 900000); //900000 -> every 15 minutes
		console.log(`${"=".repeat(30)}\nModule: Random Bot activity loaded (${activityRand().actLen}) | Loaded from local modules | Bot's presence will change every 15 minutes.`);

		// Some Auditlog
		Auditlog(client, {
			//
			"640790707082231834": {
				// For PPW
				auditlog: "mod-log",
				auditmsg: "mod-log",
			},
		});

		// Crosspost
		crosspost(client);

		// Message Listener
		listenToMessage(client);

		// Membercount
		membercount(client, "640790707082231834", "798031042954919957");

		// Serverinfo
		serverInfo(
			client,
			"640790707082231834",
			"820964768067878922",
			"640825665310031882",
			"645494894613233665",
			"820964895767265280",
			"821170444509380639",
			"821170482945458196",
			"821205412795383871",
			"821206531730571274",
			"https://discord.com/channels/640790707082231834/820964768067878922/820964895767265280",
			"640790708155842575",
			"640790708155842587",
			"827086299051196426"
		); // Updated every 15 minutes
	}
};
