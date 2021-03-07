const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
const punycode = require('punycode');

module.exports = class extends Command {
    constructor() {
      super('fancy', {
        aliases: ['No alias is set for this command'],
        categories: 'text',
        info: '*\"𝒻𝒶𝓃𝒸𝓎\"* letter(s)',
        usage: `${prefix}command/alias <text>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
        if(!args[0]) {
            let embed = new MessageEmbed()
            .setDescription(("Please enter the text that you want to") + ` *\"𝒻𝒶𝓃𝒸𝒾𝒻𝓎𝓈\"*`);
                        
            message.channel.send(embed);
        } else {
            var fancied = fancy(args.join(" "));

            if (fancied == ""){
                fancied = "Invalid text inputted"
            }

            message.channel.send(fancied);
        }
    }
};


var map = {
    " ": " ",
    "⅋": "&",
    "%": ["%"],
    "０": ["0"],
    "１": ["1"],
    "２": ["2"],
    "３": ["3"],
    "４": ["4"],
    "５": ["5"],
    "６": ["6"],
    "７": ["7"],
    "８": ["8"],
    "９": ["9"],
    "＜": ["<"],
    "＞": [">"],
    "【": ["["],
    "】": ["]"],
    "✩": ["*"],
    "(": ["("],
    ")": [")"],
    "𝓪": ["a", "A"],
    "𝒷": ["b", "B"],
    "𝓬": ["c", "C"],
    "𝒹": ["d", "D"],
    "𝒆": ["e", "E"],
    "𝒻": ["f", "F"],
    "𝓰": ["g", "G"],
    "𝒽": ["h", "H"],
    "𝒾": ["i", "I"],
    "𝒿": ["j", "J"],
    "𝓀": ["k", "K"],
    "𝓁": ["l", "L"],
    "𝓂": ["m", "M"],
    "𝓃": ["n", "N"],
    "𝑜": ["o", "O"],
    "𝓅": ["p", "P"],
    "𝓆": ["q", "Q"],
    "𝓇": ["r", "R"],
    "𝓈": ["s", "S"],
    "𝓉": ["t", "T"],
    "𝓊": ["u", "U"],
    "𝓋": ["v", "V"],
    "𝓌": ["w", "W"],
    "𝓍": ["x", "X"],
    "𝓎": ["y", "Y"],
    "𝓏": ["z", "Z"],
    ";": [";"],
    ":": [":"],
    "'": ["'"],
    "\"": ["\""],
    "\\": ["\\"],
    "/": ["/"],
    "|": ["|"],
    "=": ["="],
    "+": ["+"],
    "-": ["-"],
    "_": ["_"],
    "^": ["^"],
    "!": ["!"],
    "`": ["`"],
    ".": ["."],
    ",": [","]
};

function fancy(characterString) {
    var fanciedString = "";
    var punycodeArray = punycode.ucs2.decode(characterString);
    for (var i = 0; i < punycodeArray.length; i++) {
        var key = getKeyByValue(map, punycodeArray[i]);
        
        if (key == isNaN) key = punycodeArray[i];
        fanciedString += key;
    }

    return fanciedString;
}

function getKeyByValue(object, value) {
    var foundKey = "";
    Object.keys(object).find(key => {
        for (i in object[key]) {
            if (punycode.ucs2.decode(object[key][i]).toString().normalize() === value.toString().normalize()) {
                //console.log(`key: ${key}\tPunycode i: ${punycode.ucs2.decode(object[key][i])}\tValue: ${value} isEqual?: ${punycode.ucs2.decode(object[key][i]).toString().normalize() === value.toString().normalize()}`);
                foundKey = key;
            }
        }
    });
    return foundKey;
}