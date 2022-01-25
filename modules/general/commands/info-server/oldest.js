const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const Moment = require("moment-timezone");
const prettyMS = require("pretty-ms");

module.exports = class extends Command {
	constructor() {
		super("oldest", {
			aliases: ["No alias is set for this command"],
			categories: "info-server",
			info: "List the oldest member (Max 25)",
			usage: `${prefix}command`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			//Get data
			var memberList = [];
			memberList = getMember();

			//Sort it
			var sorted = [];
			sorted = memberList.sort();

			for (var i = 0; i < sorted.length; i++) {
				sorted[i] = sorted[i].replace(/[0-9]+\s,,/g, "-");
			} //[0-9]+- To get rid of the date

			//Oldest is array 0
			var oldest = [];
			for (var i = 0; i < 25; i++) {
				oldest[i] = sorted[i];
			}

			let embed = new MessageEmbed()
				.setTitle(`Showing max of 25 list of oldest member in ${message.guild.name}`)
				.setDescription(`${oldest.join("\n")}`)
				.setAuthor(message.guild.name, message.guild.iconURL({ format: "jpg", size: 2048 }), `https://discord.com/channels/${message.guild.id}`)
				.setFooter(`Format date D-M-Y • Time are in GMT + 7`)
				.setTimestamp();

			message.channel.send(embed);
		}

		function getMember() {
			return message.guild.members.cache.map((GuildMember) => {
				var dateNname = [];
				dateNname = Moment(GuildMember.joinedAt).tz("Asia/Jakarta").format("dddd DD MMMM YYYY HH:mm:ss");

				var today = Moment().tz("Asia/Jakarta");
				var age = today - GuildMember.joinedAt;

				return `${GuildMember.joinedTimestamp} ,, ${Moment(GuildMember.joinedAt).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")} - <@${GuildMember.id}> (${prettyMS(age)})`;
			});
		}

		function getDate() {
			return message.guild.members.cache.map((GuildMember) => {
				return `${GuildMember.joinedTimestamp}`;
			});
		}
	}
};
