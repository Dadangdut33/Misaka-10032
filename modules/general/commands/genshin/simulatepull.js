const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");
var Chance = require('chance');
var chance = new Chance();

module.exports = class extends Command {
  constructor(){ 
    super('simulatepull', {
      categories: "genshin",
      aliases: ["simpull"],
      info: "Simulate gaccha pull of promotional character in genshin impact, Limit of 200\n\nData used for the rate are based from [genshin wiki](https://genshin-impact.fandom.com/wiki/Wishes)\n\n**Notes**: Data is not saved, so pity works only on the pull done",
      usage: `${prefix}command/alias <single/ten> <amount of pull>\`\`\`**Notes**\`\`\`The single/ten is the pull type`,
      guildOnly: true,
    });
  }

    async run (message, args){
        if(!args[0]){
          info();
          return
        } else 
        if(args[0] == "single"){
          if(isNaN(args[1])){
            info();
            return
          }
          if(args[1] > 200){
            info();
            return
          }


          var fiveStar;
          var fourStar;
          var threeStar;
          var get = [];
          var chances;
          var x = false;
          var y = false;
          var pity4 = 0;
          var pity5 = 0;

          var pity4Inside = 1;
          var pity5Inside = 1;

          // fiveStar = chance.bool({likelihood: 0.6});
          // fourStar = chance.bool({likelihood: 5.1});
          // threeStar = chance.bool({likelihood: 94.3});

          for(var i = 1; i <= parseInt(args[1]); i++){
            chances = chance.integer({ min: 0, max: 100 })

            // if(i %10 == 0){ // Reset pity after 10
            //   pity4 = false;
            // }
            // console.log(pity4)

            if(pity5 == 89){ // pity b5 for the 90th pull y is for the pity
              y = true;
            }

            if(pity4 == 9){ // pity b4 for every 10 pull x is for the pity
              x = true;
            }

            if(chances <= 0.6 || y === true){ //0.6%
              fiveStar = chance.bool();
              if (fiveStar == true){
                get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character from banner`
              } else if (fiveStar == false){
                if(pity5Inside%2 == 0){
                  get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character from banner`
                  pity5Inside = 1;
                } else {
                  get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character but not from banner`
                  pity5Inside++;
                }
              }

              y = false; //After get pity, make it 0 again
              pity5 = 0; // If b5 get, then pity reset
            } else
            if (chances <= 5.1 || x === true){ //5.1%
              fourStar = chance.bool();

              if (fourStar == true){
                get[i] = `${i} -> ☆☆☆☆ (4 Stars) Character from Banner`
              } else if (fourStar == false){
                if(pity4Inside %2 == 0){
                  get[i] = `${i} -> ☆☆☆☆ (4 Stars) Character from Banner`;
                  pity4Inside = 1;
                } else {
                  get[i] = `${i} -> ☆☆☆☆ (4 Stars) Weapon`
                  pity4Inside++;
                }                
              }

              x = false; //After get pity, make it 0 again
              pity4 = 0; // If b4 get, then pity reset
            } else { //94.3%
              get[i] = `${i} -> ☆☆☆ (3 Stars) Weapon`
            }

            pity5++; //Count pity
            pity4++; //Count pity
            // console.log("pity 4:"+ pity4);
          }
          // console.log(get.length);

          if (get.length < 61){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          } 

          if(get.length > 60 && get.length < 90){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 89).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 89 && get.length < 110){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 109 && get.length < 132){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 131 && get.length < 196){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
  
            message.channel.send(embed);

            let embed2 = new MessageEmbed()
            .setDescription(get.slice(131, 195).join("\n"))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed2);
          }
          if(get.length > 131 && get.length < 202){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
  
            message.channel.send(embed);

            let embed2 = new MessageEmbed()
            .setDescription(get.slice(131, 195).join("\n"))
            .addField(`Cont`, get.slice(195, 201).join("\n"))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed2);
          }

        } else 
        if(args[0] == "ten"){
          if(isNaN(args[1])){
            info();
            return
          }
          if(args[1] > 20){
            info();
            return
          }


          var fiveStar;
          var fourStar;
          var threeStar;
          var get = [];
          var chances;
          var x = false;
          var y = false;
          var pity4 = 0;
          var pity5 = 0;

          var pity4Inside = 1;
          var pity5Inside = 1;

          // fiveStar = chance.bool({likelihood: 0.6});
          // fourStar = chance.bool({likelihood: 5.1});
          // threeStar = chance.bool({likelihood: 94.3});

          for(var i = 1; i <= parseInt(args[1] * 10); i++){
            chances = chance.integer({ min: 0, max: 100 })

            // if(i %10 == 0){ // Reset pity after 10
            //   pity4 = false;
            // }
            // console.log(pity4)

            if(pity5 == 89){ // pity b5 for the 90th pull y is for the pity
              y = true;
            }

            if(pity4 == 9){ // pity b4 for every 10 pull x is for the pity
              x = true;
            }

            if(chances <= 0.6 || y === true){ //0.6%
              fiveStar = chance.bool();
              if (fiveStar == true){
                get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character from banner`
              } else if (fiveStar == false){
                if(pity5Inside%2 == 0){
                  get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character from banner`
                  pity5Inside = 1;
                } else {
                  get[i] = `${i} -> ☆☆☆☆☆ (5 Stars) Character but not from banner`
                  pity5Inside++;
                }
              }

              y = false; //After get pity, make it 0 again
              pity5 = 0; // If b5 get, then pity reset
            } else
            if (chances <= 5.1 || x === true){ //5.1%
              fourStar = chance.bool();

              if (fourStar == true){
                get[i] = `${i} -> ☆☆☆☆ (4 Stars) Character from Banner`
              } else if (fourStar == false){
                if(pity4Inside %2 == 0){
                  get[i] = `${i} -> ☆☆☆☆ (4 Stars) Character from Banner`;
                  pity4Inside = 1;
                } else {
                  get[i] = `${i} -> ☆☆☆☆ (4 Stars) Weapon`
                  pity4Inside++;
                }                
              }

              x = false; //After get pity, make it 0 again
              pity4 = 0; // If b4 get, then pity reset
            } else { //94.3%
              get[i] = `${i} -> ☆☆☆ (3 Stars) Weapon`
            }

            pity5++; //Count pity
            pity4++; //Count pity
            // console.log("pity 4:"+ pity4);
          }
          // console.log(get.length);

          if (get.length < 61){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          } 

          if(get.length > 60 && get.length < 90){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 89).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 89 && get.length < 110){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Ten Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 109 && get.length < 132){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed);
          }

          if(get.length > 131 && get.length < 196){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
  
            message.channel.send(embed);

            let embed2 = new MessageEmbed()
            .setDescription(get.slice(131, 195).join("\n"))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed2);
          }
          if(get.length > 131 && get.length < 202){
            let embed = new MessageEmbed()
            .setTitle(`Simulate Single Pull of ${args[1]} Times in Promotional Character Banner`)
            .setDescription(get.slice(0, 60).join("\n"))
            .addField(`Cont.`, get.slice(60, 90).join("\n"))
            .addField(`Cont.`, get.slice(90, 110).join("\n"))
            .addField(`Cont.`, get.slice(110, 131).join("\n"))
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
  
            message.channel.send(embed);

            let embed2 = new MessageEmbed()
            .setDescription(get.slice(131, 195).join("\n"))
            .addField(`Cont`, get.slice(195, 201).join("\n"))
            .setFooter(`Pull Simulator (Please report if the pull seems wrong)`)
  
            return message.channel.send(embed2);
          }

        }

        function info() {
          let embed = new MessageEmbed()
          .setTitle(`Invalid Arguments Provided`)
          .setDescription(`Please input correct arguments. **Limit** of the simulator is **__200 pulls__**,  example of a correct way to use it: :arrow_down:\`\`\`${prefix}simpull single 4\`\`\``)
        
          message.channel.send(embed);
        }
    }
}

