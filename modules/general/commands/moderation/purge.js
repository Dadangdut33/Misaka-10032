const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../../../config");
const { Command } = require('../../../../handler');

module.exports = class extends Command {
    constructor() {
        super('purge', {
            aliases: ["del", "delete"],
            categories: 'moderation',
            info: 'Batch delete tagged user\'s message [Limit 100] and only limited to message up to [14 days], only usable by admin and mods',
            usage: `${prefix}command/alias <user> <amount>`,
            guildOnly: true,
        });
    }

    async run(message, args) {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("You don't have the required permissions to use this command.").then(msg => msg.delete({
                timeout: 5000
            }));
        }

        if (!args[0]) {
            return message.channel.send("Please tag the profile of the message's sender").then(msg => msg.delete({
                timeout: 5000
            }));
        } else {
            //Declare User
            let user = message.mentions.members.first();
            
            //Check User
            if(!user){ 
                let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Invalid user tag!`)
                    
                return message.channel.send(embed).then(msg => msg.delete({
                    timeout: 5000
                }));
            }

            //Amount
            const amount = parseInt(args[1]);

            //Check Amount
            if (isNaN(amount) || amount < 1) {
                let embed = new MessageEmbed()
                    .setColor('#000000')
                    .setDescription(`Please specify a valid amount of message that you want to delete!`)
                    
                return message.channel.send(embed).then(msg => msg.delete({
                    timeout: 5000
                }));
            }

            message.channel.messages.fetch({
                limit: 100,
            }).then((messages) => {
                if (user) {
                    const filterBy = user ? user.id : Client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }

                message.channel.bulkDelete(messages).catch(error => {
                    
                    if (error){
                        // console.log(error.stack);
                        // i = false;
                        let embed = new MessageEmbed()
                        .setColor('#000000')
                        .setDescription(`You can only bulk delete messages that are under 14 days old`)

                        return message.channel.send(embed).then(msg => msg.delete({
                            timeout: 10000
                        }));
                    } else {
                        let embed = new MessageEmbed()
                        .setColor('#000000')
                        .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
                        .setDescription(`Deleted ${amount} of ${user} messages`)
                        .setTimestamp();
    
                        return message.channel.send(embed)
                    }
                });
            });
        }
    }
}
