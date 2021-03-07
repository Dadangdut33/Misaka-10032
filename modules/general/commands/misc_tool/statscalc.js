const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
    constructor() {
      super('statscalc', {
        aliases: ["sc", 'stats'],
        categories: 'tool',
        info: 'Calculate the statistical of given data. Calculated data are results including sorted data, average of data, median, variation, standard deviation, & average deviation',
        usage: `${prefix}command/alias <data separated by space>`,
        guildOnly: false,
      });
    }
  
    async run(message, args) {
      if (!args[0]){
        info();

      } else {
        //Sum Up the Number (TOTAL)
        var dataSum;
        dataSum = args.reduce(function(prev, curr){
          return (Number(prev) || 0) + (Number(curr) || 0);
        });

        //Original args
        let unsorted = [];
        unsorted = args.toString();
        let unsortedSpace;
        unsortedSpace = unsorted.replace(/,/g, `, `);

        //Finding Average
        var avg;
        avg = dataSum/args.length;

        //Change number to float to process further data
        var floatData = [];
        floatData = args.map(Number);

        //Median Function
        const median = arr => {
          const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        };
        //Store Median in med
        const med = median(floatData);

        //Proses data
        let i;
        var x = 0;
        var dataPow = 0, dataAbs = 0;
        for(i = 0; i < args.length; i++){
          x = x + (floatData[i] - avg)
          dataPow += Math.pow(floatData[i] - avg, 2); //Kuadrat
          dataAbs += Math.abs(floatData[i] - avg); //Mutlak
        }

        //Vary / Ragam
        var vary = dataPow/args.length;

        //Standard deviation / Simpangan baku
        var SD = Math.sqrt(vary);

        //Average deviation / Simpangan rata-rata
        var AD = dataAbs/args.length;

        if(!SD || !AD || !vary){
          info();
        } else {
          let embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Statistic Calculator`)
          .addField(`Data Given`, `${unsortedSpace}`, false)
          .addField(`Data Sorted `, `${args.sort().join(`, `)}`, false)
          .addField(`Data Length`, `${args.length}`, true)
          .addField(`Total`, `${dataSum.toFixed(2)}`, true)
          .addField(`Average`, `${avg.toFixed(2)}`, true)
          .addField(`Median`, `${med}`, true)
          .addField(`Variation`, `${vary.toFixed(4)}`, true)
          .addField(`Standard Deviation`, `${SD.toFixed(4)}`, true)
          .addField(`Average Deviation`, `${AD.toFixed(4)}`, true)
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ format: 'jpg', size: 2048 }))
          .setTimestamp();
  
          // console.log(SD);
          message.channel.send(embed);
        }
      }
      //Info
      function info(){
        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Please Enter The Correct Arguments`)
            .setDescription(`For more detailed info please check using the help command. Usage example :arrow_down:\`\`\`css\n${prefix}command/alias 23 21 11 33 22 1\`\`\``)
            .setFooter(message.guild.me.displayName, message.client.user.displayAvatarURL())
            .setTimestamp();
      
        message.channel.send(embed);
      }
      
    }
};



        //Fail testing
        /*console.log(args)
        console.log(x)
        console.log(dataPow)
        console.log(dataAbs)
        message.channel.send(`Original data inputted: ` + args + `\nSorted: `+ sorted + `\nsorted but with space: `+ sortedSpace + `\nLength: ` + args.length + `\nSUM: `+ dataSum + `\nAVG: ` + avg.toFixed(2) + `\nMedian: ` + med + `\nVary: ` + vary.toFixed(4) + `\nSD: ` + SD.toFixed(4) + `\nAD: ` + AD.toFixed(4));
        */

/*OLD IDEA 
        // var dataSplit = []; //Declare next array

        //Convert Args To String (become <x,y,z>)
        // var number = args.toString();

        // dataSplit = number.split(","); //Now a string without (,)
*/

        /*
        //Sort the data then store it in sorted //Sebenernya bisa ga perlu di sort kayaknya?
        let sorted;
        sorted = args.sort();

        //Display the sorted data with space after comma
        let sortedSpace;
        sortedSpace = `${Array.from(sorted).join(`, `)}`;
        */
