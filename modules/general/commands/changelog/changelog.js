const { prefix } = require("../../../../config");
const { Command } = require("../../../../handler");
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { build, Repo_Link } = require("../../../../config");
const { paginationEmbed } = require("../../../../local_dependencies/functions.js");
const emojiList = ["⏪", "⏩", "❌"];

module.exports = class extends Command {
	constructor() {
		super("changelog", {
			aliases: ["log"],
			categories: "changelog",
			info: "Get bot changelog",
			usage: `${prefix}command/alias`,
			guildOnly: true,
		});
	}

	async run(message, args) {
		var pages = [];

		for (let i = 0; i < 4; i++) {
			let path = `./local_dependencies/changelog/changelog${i + 1}.txt`;
			let content = fs.readFileSync(path, "utf-8");
			let page = new MessageEmbed().setAuthor(`${message.client.user.username} Ver. ${build}`, `${message.client.user.displayAvatarURL()}`, Repo_Link).setTitle(`Changelog`).setDescription(content).setTimestamp();
			pages.push(page);
		}

		paginationEmbed(message, pages, emojiList, 300000); // 5 Minutes
	}
};
