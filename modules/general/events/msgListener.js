// const haiku = require("haiku-detect"); Now forked onto local dependencies for manual calibration
const { MessageEmbed } = require('discord.js');
const randomRes = require('./bot-response');
const { prefix } = require("../../../config");
const haiku = require('../../../local_dependencies/haikus-detector');
const { capitalizeFirstLetter } = require('../../../local_dependencies/functions');

module.exports = client => {
  const listenToMessage = message => { // The function 
    const gehFilter = /\bgay\b|\bgayy\b|\bgayyy\b|\bgeh\b|\bgehh\b|\bgei\b|\bgeii\b|\bgeiii\b|\bgey\b|\bgeyy\b|\bgeyyy\b/i;
    // const regexTagHaiku = /([<@0-9>])/gi; // Not used cause no need, message.mentions.members.first() is the same
    const regexEmojiHaiku = /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g;
    

    if(!message.content.startsWith(prefix) && message.channel.type !== "dm"){ // Prefix to prevent listening to commands, the dm to prevent listening to dm so no error happen 
      if(gehFilter.test(message.content)){
        var x = Math.floor(Math.random() * randomRes().resGehLen);
        
        message.channel.send(randomRes(x).resGeh);
      } 

      // Mention, Emoji, Link
      if(!message.mentions.members.first() // Mention member
         && !message.mentions.channels.first() // Mention channel
         && !regexEmojiHaiku.test(message.content) // Emoji
         && !new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(message.content) // Links
         ){ // To Prevent Error
          if(!message.content.startsWith("||") && !message.content.endsWith("||") && !message.author.bot){ // Make sure it's not a spoiler and not a bot
            if(haiku.detect(message.content)){
              var haikuGet = [];
              var toHaikued = message.content.replace(/(\n)/g, ""); // Remove new line

              haikuGet = haiku.format(toHaikued);
              if (haikuGet[0] !== undefined) {
                for(var i = 0; i < haikuGet.length; i++){
                  haikuGet[i] = capitalizeFirstLetter(haikuGet[i])
                } 
  
                let embed = new MessageEmbed()
                .setDescription(`*${haikuGet.join("\n\n").replace(/[\*\`\"]/g, "")}*\n\n- ${message.author.username}\n__　　　　　　　　　　　　　__\n[ᴴᵃᶦᵏᵘ](https://en.wikipedia.org/wiki/Haiku) ᵈᵉᵗᵉᶜᵗᵉᵈ ⁻ ˢᵒᵐᵉᵗᶦᵐᵉˢ ˢᵘᶜᶜᵉˢˢᶠᵘᶫᶫʸ`)
                .setColor(`RANDOM`)
                // .setFooter(``) ―
        
                message.channel.send(embed)
              }
            }
          }
      } 
    }
  } // End of it

  client.on(`message`, (message) => listenToMessage(message)) // Listen

  console.log(`Module: msgListener Loaded | Loaded from local modules | Now seeking for haiku and geh content...`);
}