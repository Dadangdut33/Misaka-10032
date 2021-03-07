const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');

module.exports = class extends Command {
  constructor() {
    super('announce', {
      aliases: ["No alias is set for this command"],
      categories: 'moderation',
      info: 'Announce stuff but with more feature using embed. Only usable by admin and mods. Leave the not desired optional empty but don\'t erase the quote',
      usage: `${prefix}announce \"title with quotes\" \"description with quotes\" \"image URL with quotes\" \"field title with quotes)\" \"field content with quotes\"\`\`\`**Notes**\`\`\`css\nImage URL is optional leave it as empty quotes if not used\`\`\`\`\`\`css\nField title is optional but field value is a must -> IF you insert field title\`\`\`\`\`\`css\nYou can subtitute quotes by using single quotes inside the announcement`,
      guildOnly: true,
    });
  }

  async run(message, args) {
        message.delete();
    
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You don't have the required permissions to use this command.").then(msg => msg.delete({timeout:5000}));
        
        if (args.length < 1)
            return message.reply("Nothing to say?").then(msg => msg.delete({timeout: 5000}));

        if (args.length > 0){    
            var regex = /(["])(?:(?=(\\?))\2.)*?\1/g; 
            var msg = [];

            msg = args.toString().match(regex);

            if(!msg){
                return message.channel.send(`**Invalid Arguments Provided!** Please check the help commands if unsure ${message.author}`).then(msg => msg.delete({timeout: 5000}))
            }

            for (var i = 0; i < msg.length; i++){
                msg[i] = msg[i].replace(/,/g, " ");
            }

            for (var i = 0; i < msg.length; i++){
                msg[i] = msg[i].replace(/"/g, "");
            }


            //Embed Color
            const roleColor = message.guild.roles.highest.name;
            
            // Creating and sending embed...
            var embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setTitle(msg[0])
            .setColor(roleColor === "#000000" ? "#ffffff" : roleColor)
            .setDescription(msg[1]);
    
            //Check Image
            if (validURL(msg[2])) {
                if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg|tiff|bmp|[\?size=0-9])$/gi.test(msg[2])){ //Check if it's an image or not
                    embed.setImage(msg[2])
                }
            }
    
            //Check field title & content
            if ((!msg[3] && !msg[4]) || (msg[3] !== "" || msg[4] !== "")) {
                if (msg[3] !== "" && msg[4] != ""){
                    embed.addField(msg[3], msg[4]);
                } 
            } 

            //Send embed 
            message.channel.send(embed).catch(err => {
                return message.channel.send("Invalid form").then(msg => msg.delete({timeout: 10000}))
            });
            
        }

        function validURL(str) { //Check if it's a valid url or not
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
              '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
        }
    }
}

/* OLD METHOD
//Ambil args
            const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
            
            //Regex
            let match;
            while (match = regex.exec(args.join(' '))) msg.push(match[2]);

            //Embed Color
            const roleColor = message.guild.roles.highest.name;
            
            // Creating and sending embed...
            var embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setTitle(msg[0])
            .setColor(roleColor === "#000000" ? "#ffffff" : roleColor)
            .setDescription(msg[1]);
    
            //Check Image
            if (msg[2] !== undefined){
                var img = msg[2].toString();
                
                //Embed only if it's a link
                if (img.includes(`:`, `/`)) {
                    embed.setImage(msg[2])
                }
            }
    
            //Check field title & content
            if (msg[3] !== undefined && msg[4] !== undefined) {
                embed.addField(msg[3], msg[4]);
            } 

            //Send embed 
            message.channel.send(embed);
*/