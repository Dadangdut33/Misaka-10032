const { MessageEmbed } = require("discord.js");
const { promptMessage } = require('../../../../local_dependencies/functions.js');
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const chooseArr = ["🗻", "✂", "📰"];

module.exports = class extends Command {
    constructor() {
        super('rps', {
            categories: "fun",
            aliases: ["No alias is set for this command"],
            info: "Rock Paper Scissors game. React to one of the emojis to play the game",
            usage: `${prefix}rps`,
            guildOnly: true,
        });
    }
    
    async run(message, args) {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setDescription("Add a reaction to one of these emojis to play the game!")

        const m = await message.channel.send(embed); // Send embed in await
        const reacted = await promptMessage(m, message.author, 50, chooseArr); // Get emojis reaction 
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)]; // Get bot reaction
        const result = await getResult(reacted, botChoice); // Get result from emojis and bot
        await m.reactions.removeAll(); // Remove emotes

        if (reacted == undefined) { // If no reaction after timeout
            embed
                .setTitle(`Game Aborted!`)
                .setDescription(`User did not choose any emojis, so the game is aborted`)

            m.edit(embed)
            return // return it so it ends
        } // If reaction, then pass

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed)

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                return "You won!";
            } else if (me === clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
    }
}

// const newEmbed = new MessageEmbed()
//     .addField(result, `${reacted} vs ${botChoice}`)
//     .setFooter(message.author.username, message.author.displayAvatarURL())

// await message.channel.send(newEmbed)