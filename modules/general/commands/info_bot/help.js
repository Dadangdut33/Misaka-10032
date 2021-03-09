const { MessageEmbed } = require('discord.js');
const Path = require('path');
const { Command } = require('../../../../handler');
const Utils = require('../../../../Utils.js');
const { prefix, build } = require("../../../../config");

module.exports = class extends Command {
  constructor({
    commandHandler
  }) {
    super('help', {
      aliases: ["h"],
      categories: 'info-bot',
      info: 'Get all commands or one specific command info.',
      usage: `${prefix}help [command] or ${prefix}alias [command]`,
      guildOnly: true,
    });

    this.commandHandler = commandHandler;
  }

  async run(message, args) {
    args[0] = lowerCase();

    function lowerCase() {
      if (!args[0]) {
        return false;
      } else {
        return args[0].toLowerCase();
      }
    }

    const prefix = this.commandHandler.prefix;

    if (!args[0]) {
      //Counter
      var infoBotSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "info-bot")
        .map(([, command]) => `${command.name}`)}`;
      const infoBotCount = infoBotSize.split(`,`);

      var funSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "fun")
        .map(([, command]) => `${command.name}`)}`;
      const funCount = funSize.split(`,`);

      var genshinSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "genshin")
        .map(([, command]) => `${command.name}`)}`;
      const genshinCount = genshinSize.split(`,`);

      var animeSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "anime")
        .map(([, command]) => `${command.name}`)}`;
      const animeCount = animeSize.split(`,`);

      var moderationSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "moderation")
        .map(([, command]) => `${command.name}`)}`;
      const moderationCount = moderationSize.split(`,`);

      var musicSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "music")
        .map(([, command]) => `${command.name}`)}`;
      const musicCount = musicSize.split(`,`);

      var toolSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "tool")
        .map(([, command]) => `${command.name}`)}`;
      const toolCount = toolSize.split(`,`);

      var actionSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "action")
        .map(([, command]) => `${command.name}`)}`;
      const actionCount = actionSize.split(`,`);

      var changelogSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "changelog")
        .map(([, command]) => `${command.name}`)}`;
      const changelogCount = changelogSize.split(`,`);

      var textSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "text")
        .map(([, command]) => `${command.name}`)}`;
      const textCount = textSize.split(`,`);

      var animeMiscSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "anime-misc")
        .map(([, command]) => `${command.name}`)}`;
      const animeMiscCount = animeMiscSize.split(`,`);

      var infoMiscSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "info-misc")
        .map(([, command]) => `${command.name}`)}`;
      const infoMiscCount = infoMiscSize.split(`,`);

      var infoServerSize = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "info-server")
        .map(([, command]) => `${command.name}`)}`;
      const infoServerCount = infoServerSize.split(`,`);

      var total = infoBotCount.length + funCount.length + genshinCount.length + animeCount.length + moderationCount.length +
        musicCount.length + toolCount.length + actionCount.length + changelogCount.length + textCount.length +
        animeMiscCount.length + infoMiscCount.length + infoServerCount.length;

      //Show Commands
      let infoBot = `${Array.from(this.commandHandler.commands)
      .filter(([, command]) => command.categories == "info-bot")
      .map(([, command]) => `\`${command.name}\``)
      .join(` `)}`;

      let fun = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "fun")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let genshin = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "genshin")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let anime = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "anime")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let moderation = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "moderation")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let music = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "music")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let tool = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "tool")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;
        
      let action = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "action")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let changelog = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "changelog")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let text = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "text")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let animeMisc = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "anime-misc")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let infoMisc = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "info-misc")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      let infoServer = `${Array.from(this.commandHandler.commands)
        .filter(([, command]) => command.categories == "info-server")
        .map(([, command]) => `\`${command.name}\``)
        .join(` `)}`;

      const embed = new MessageEmbed()
        .setTitle('Showing Full Command List!')
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
          format: 'jpg',
          size: 2048
        }))
        .setTimestamp()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL({ format: 'jpg', size: 2048 })}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/653206818759376916/795497635812343848/Kirino_Question.png')
        .setDescription(`These are the available commands for ${message.guild.me.displayName}#7471‎‏‏‎ Version \`${build}\`\nThe bot currently has \`${total} commands in total\`\nThe bot's prefix is: \`${prefix}\`\nFor more details use \`\`\`css\n${prefix}help <command> or ${prefix}h <command>\`\`\``, )
        .addFields({
          name: `**Info-Bot** [${infoBotCount.length}]`,
          value: `${infoBot}`,
          inline: false
        }, {
          name: `**Info-Server** [${infoServerCount.length}]`,
          value: `${infoServer}`,
          inline: false
        }, {
          name: `**Info-Misc** [${infoMiscCount.length}]`,
          value: `${infoMisc}`,
          inline: false
        }, {
          name: `**Text** [${textCount.length}]`,
          value: `${text}`,
          inline: false
        }, {
          name: `**Fun** [${funCount.length}]`,
          value: `${fun}`,
          inline: false
        }, {
          name: `**Action** [${actionCount.length}]`,
          value: `${action}`,
          inline: false
        }, {
          name: `**Anime** [${animeCount.length}]`,
          value: `${anime}`,
          inline: false
        }, {
          name: `**Anime-Misc** [${animeMiscCount.length}]`,
          value: `${animeMisc}`,
          inline: false
        }, {
          name: `**Genshin** [${genshinCount.length}]`,
          value: `${genshin}`,
          inline: false
        }, {
          name: `**Tool/Utility** [${toolCount.length}]`,
          value: `${tool}`,
          inline: false
        }, {
          name: `**Moderation** [${moderationCount.length}]`,
          value: `${moderation}`,
          inline: false
        }, {
          name: `**Music** [${musicCount.length}]`,
          value: `${music}`,
          inline: false
        }, {
          name: `**Changelog** [${changelogCount.length}]`,
          value: `You can check the bot's change over the time by using ${changelog}`,
          inline: false
        });

      message.channel.send(embed);

    } else {
      let command = this.commandHandler.commands.get(args[0]);

      if (!command) {
        command = this.commandHandler.aliases.get(args[0]);
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle('Something went wrong!')
          .setDescription('Invalid command provided, please try again!')
          .setTimestamp();

        message.channel.send(embed);
        return;
      }

      const path = Path.relative(
        process.cwd(),
        `${__dirname}/${command.name}.js`,
      ).replace(/\\+/g, '/');

      const embed = new MessageEmbed()
        .setTitle(`Details For \`${command.name}\` Command!`)
        .setFooter(`Parameters: <> = required, [] = optional`)
        .setTimestamp()
        .setColor("RANDOM")
        .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/653206818759376916/740451618344009800/unknown.png')
        .addField(`Command Name`, `${command.name}`, true)
        .addField(`Aliases`, `${command.aliases.join(', ')}`, true)
        .addField(`Category`, `${command.categories}`, true)
        .addField(`Guild Only`, `${command.guildOnly}`, false)
        .addField(`Description`, `${command.info}`)
        .addField(`Usage`, `\`\`\`css\n${command.usage}\`\`\``)


      message.channel.send(embed);
    }
  }
};


// description = `**Command Name:** ${command.name}\n**Aliases:** ${command.aliases.join(', ')}\n**Category:** ${command.categories}\n**Description:** ${command.info}n**Usage:** \`\`\`css\n${command.usage}\`\`\`\`;
// .setDescription(`${description}`,);
// OLD .setDescription(`These are the available commands for ${message.guild.me.displayName}\nThe bot's prefix is: \`${prefix}\`\n${description}\n\n \ntes ${desc2}\nFor more details use \`\`\`css\n${prefix}help <command> or ${prefix}h <command>\`\`\``, );
/* OLD
description = `**Commands:**
${Array.from(this.commandHandler.commands)  
  .map(
      ([, command]) => `\`${command.name}\``,
    )
  .join(', ')}`;
*/

/*Other way to count
var counterInfo = 0, i;
  for  (i = 0; i < infoCount.length; i++){
  if(infoCount[i] !== undefined){
    counterInfo++;
  }
}  
*/