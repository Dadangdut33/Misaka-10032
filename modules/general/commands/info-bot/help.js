const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix, build, Repo_Link } = require("../../../../config");

const mapCommands = (source, type) => {
	return `${Array.from(source)
		.filter(([, command]) => command.categories == type)
		.map(([, command]) => `\`${command.name}\``)
		.join(` `)}`;
};

module.exports = class extends Command {
	constructor({ commandHandler }) {
		super("help", {
			aliases: ["h"],
			categories: "info-bot",
			info: "Get all commands or one specific command info.",
			usage: `${prefix}help [command] or ${prefix}alias [command]`,
			guildOnly: true,
		});

		this.commandHandler = commandHandler;
	}

	async run(message, args) {
		if (args.length == 0) {
			//Show Commands
			let infoBot = mapCommands(this.commandHandler.commands, "info-bot");
			let fun = mapCommands(this.commandHandler.commands, "fun");
			let genshin = mapCommands(this.commandHandler.commands, "genshin");
			let anime = mapCommands(this.commandHandler.commands, "anime");
			let manga = mapCommands(this.commandHandler.commands, "manga");
			let moderation = mapCommands(this.commandHandler.commands, "moderation");
			let music = mapCommands(this.commandHandler.commands, "music");
			let tool = mapCommands(this.commandHandler.commands, "tool");
			let action = mapCommands(this.commandHandler.commands, "action");
			let changelog = mapCommands(this.commandHandler.commands, "changelog");
			let text = mapCommands(this.commandHandler.commands, "text");
			let animeMisc = mapCommands(this.commandHandler.commands, "anime-misc");
			let infoMisc = mapCommands(this.commandHandler.commands, "info-misc");
			let infoServer = mapCommands(this.commandHandler.commands, "info-server");
			let muslim = mapCommands(this.commandHandler.commands, "muslim");

			var total =
				infoBot.split(" ").length +
				infoServer.split(" ").length +
				infoMisc.split(" ").length +
				text.split(" ").length +
				fun.split(" ").length +
				action.split(" ").length +
				anime.split(" ").length +
				manga.split(" ").length +
				animeMisc.split(" ").length +
				genshin.split(" ").length +
				tool.split(" ").length +
				moderation.split(" ").length +
				music.split(" ").length +
				changelog.split(" ").length +
				muslim.split(" ").length;

			const embed = new MessageEmbed()
				.setTitle("Showing Full Command List!")
				.setFooter(
					`Requested by ${message.author.username}`,
					message.author.displayAvatarURL({
						format: "jpg",
						size: 2048,
					})
				)
				.setTimestamp()
				.setColor("RANDOM")
				.setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL({ format: "jpg", size: 2048 })}`)
				.setThumbnail("https://cdn.discordapp.com/attachments/653206818759376916/795497635812343848/Kirino_Question.png")
				.setDescription(
					`These are the available commands for ${message.guild.me.displayName}#7471‎‏‏‎ Version \`${build}\`\nThe bot currently has \`${total} commands in total\`\nThe bot's prefix is: \`${prefix}\`\nFor more details use \`\`\`css\n${prefix}help <command> or ${prefix}h <command>\`\`\``
				)
				.addFields(
					{
						name: `**Info-Bot** [${infoBot.split(" ").length}]`,
						value: `${infoBot}`,
						inline: false,
					},
					{
						name: `**Info-Server** [${infoServer.split(" ").length}]`,
						value: `${infoServer}`,
						inline: false,
					},
					{
						name: `**Info-Misc** [${infoMisc.split(" ").length}]`,
						value: `${infoMisc}`,
						inline: false,
					},
					{
						name: `**Text** [${text.split(" ").length}]`,
						value: `${text}`,
						inline: false,
					},
					{
						name: `**Fun** [${fun.split(" ").length}]`,
						value: `${fun}`,
						inline: false,
					},
					{
						name: `**Action** [${action.split(" ").length}]`,
						value: `${action}`,
						inline: false,
					},
					{
						name: `**Anime** [${anime.split(" ").length}]`,
						value: `${anime}`,
						inline: false,
					},
					{
						name: `**Manga** [${manga.split(" ").length}]`,
						value: `${manga}`,
						inline: false,
					},
					{
						name: `**Anime-Misc** [${animeMisc.split(" ").length}]`,
						value: `${animeMisc}`,
						inline: false,
					},
					{
						name: `**Genshin** [${genshin.split(" ").length}]`,
						value: `${genshin}`,
						inline: false,
					},
					{
						name: `**Tool/Utility** [${tool.split(" ").length}]`,
						value: `${tool}`,
						inline: false,
					},
					{
						name: `**Moderation** [${moderation.split(" ").length}]`,
						value: `${moderation}`,
						inline: false,
					},
					{
						name: `**Muslim** [${muslim.split(" ").length}]`,
						value: `${muslim}`,
						inline: false,
					},
					{
						name: `**Music** [${music.split(" ").length}]`,
						value: `${music}`,
						inline: false,
					},
					{
						name: `**Changelog** [${changelog.split(" ").length}]`,
						value: `You can check the bot's change over the time by using ${changelog}`,
						inline: false,
					},
					{
						name: `Command's Source Code`,
						value: `[Click Here](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/info-bot/help.js)`,
						inline: true,
					},
					{
						name: `Bot's Repository`,
						value: `[GitHub](${Repo_Link})`,
						inline: true,
					}
				);

			message.channel.send(embed);
		} else {
			let command = this.commandHandler.commands.get(args[0].toLowerCase());

			if (!command) {
				command = this.commandHandler.aliases.get(args[0].toLowerCase());
			}

			if (!command) {
				const embed = new MessageEmbed().setTitle("Something went wrong!").setDescription("Invalid command provided, please try again!").setTimestamp();

				message.channel.send(embed);
				return;
			}

			const embed = new MessageEmbed()
				.setTitle(`Details For \`${command.name}\` Command!`)
				.setFooter(`Parameters: <> = required, [] = optional`)
				.setTimestamp()
				.setColor("RANDOM")
				.setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
				.setThumbnail("https://cdn.discordapp.com/attachments/653206818759376916/740451618344009800/unknown.png")
				.addField(`Command Name`, `${command.name}`, true)
				.addField(`Aliases`, `${command.aliases.join(", ")}`, true)
				.addField(`Category`, `${command.categories}`, true)
				.addField(`Guild Only`, `${command.guildOnly}`, false)
				.addField(`Description`, `${command.info}`)
				.addField(`Usage`, `\`\`\`css\n${command.usage}\`\`\``)
				.addField(`Command's Source Code`, `[Click Here](https://github.com/Dadangdut33/Misaka-10032/blob/main/modules/general/commands/${command.categories}/${command.name}.js)`, true)
				.addField(`Bot's Repository`, `[GitHub](${Repo_Link})`, true);

			message.channel.send(embed);
		}
	}
};
