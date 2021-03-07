const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const GraphemeSplitter = require('grapheme-splitter');
var splitter = new GraphemeSplitter();

module.exports = class extends Command {
    constructor() {
      super('emojify', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: ':regional_indicator_e: :regional_indicator_m: :regional_indicator_o: :regional_indicator_j: :regional_indicator_i: :regional_indicator_f: :regional_indicator_y: letter(s)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(("Please enter the text that you want to") + ` :regional_indicator_e: :regional_indicator_m: :regional_indicator_o: :regional_indicator_j: :regional_indicator_i: :regional_indicator_f: :regional_indicator_y:`);
                        
            message.channel.send(embed);
        } else {
            /*var letter = [ OLD IDEA THAT I WASTED TIME ON
                "a", "A","b", "B", "c", "C", "d", "D", 
                "e", "E", "f", "F", "g", "G", "h", "H",
                "i", "I", "j", "J", "k", "K", "l", "L",
                "m", "M", "n", "N", "o", "O", "p", "P",
                "q", "Q", "r", "R", "s", "S", "t", "T",
                "u", "U", "v", "V", "w", "W", "x", "X",
                "y", "Y", "z", "Z",
            ]*/

            var stringArgs = args.join(" "); 

            var splitted = splitter.splitGraphemes(stringArgs);

            var stored = [];

            var regExp = /^[a-zA-Z]+$/;

            for (var i = 0; i < splitted.length; i++){
                
                if(regExp.test(splitted[i])){
                    stored[i] = emojify(splitted[i]);
                } else {
                    stored[i] = splitted[i];
                }
            }
           
            // console.log(splitted);

            // console.log(stored);

            message.channel.send(stored.join(" ")).catch(error => {
                let embed = new MessageEmbed()
                .setTitle('An error occured')
                .setDescription(error)
                .addField('TL;DR', 'Text can\'t be longer than 2000 characters')
                
                message.channel.send(embed)
            })
        }
    }
};

function emojify(input){
    var emojified = `:regional_indicator_${input}:`

    return emojified;
}