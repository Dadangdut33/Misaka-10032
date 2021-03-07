const { Event } = require('../../../handler');
const { prefix } = require("../../../config");
const membercount = require('./member-count');
const activityRand = require('./bot-activity');
const table = require('./start-table');
const Auditlog = require("discord-auditlog");
const Moment = require('moment-timezone');
const listenToMessage = require('./msgListener');
const onlineCount = require('./online-member');

module.exports = class extends Event {
  constructor() {
    super('ready');
  }

  run(client) {
    //Log Table to Console and login to console
    table(client);
    console.log(`Logged in as ${client.user.tag} at ${Moment(client.readyAt).tz('Asia/Jakarta').format('dddd DD MMMM YYYY HH:mm:ss')}\nManaging ${client.guilds.cache.size} Guilds, ${client.channels.cache.size} Channels, and ${client.users.cache.size} Members`);

    // Presence at start
    client.user.setPresence({
      status: "online",
      activity: {
        name: `${prefix}help | Rem = Best Girl, says Misaka stating the truth | ${Moment(client.readyAt).tz('Asia/Jakarta').format('HH:mm:ss')} Booting up... Managing ${client.guilds.cache.size} Guilds, ${client.channels.cache.size} Channels, and ${client.users.cache.size} Members`,
        type: "PLAYING"
      }
    });

    //Bot Activity 
    setInterval(() => {
      var x = Math.floor(Math.random() * activityRand().actLen); //Now automatic
      client.user.setActivity({
        type: `${activityRand(x).activity.type}`,
        name: `${prefix}help | ${activityRand(x).activity.desc}`
      })
    }, 900000); //900000 -> every 15 minutes
    console.log(`==============================================\nModule: Random Bot activity loaded (${activityRand().actLen}) | Loaded from local modules | Bot's presence will change every 15 minutes.`)

    // Best npm ever lol
    Auditlog(client, {
      "640790707082231834": { // For PPW
        auditlog: "mod-log",	
        movement: false,
        auditmsg: "vc-log",
        voice: false, // Set a Channel name if you want it
        trackroles: false, // Default is False
      }
    });

    // Message Listener
    listenToMessage(client);

    //Membercount 
    membercount(client);        

    //Onlinecount
    onlineCount(client); // Checked every 15 minutes
  }
};