const { MessageEmbed } = require("discord.js");
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
  constructor(){ 
    super('gcharacter', {
      categories: "genshin",
      aliases: ["char", "chara", "gc", "gchar"],
      info: "Gives information about character farming info in genshin impact",
      usage: `${prefix}command/alias <name> or [lvlup] or [list]`,
      guildOnly: true,
    });
  }
    
  async run (message, args){
    args[0] = lowerCase();

    if(!args[0]){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Please enter the name of character that you want to check!")
      .setDescription("For character list you can type in command/alias list. **Example:** ```css\n!!gchar list```")
      .setFooter(message.guild.me.displayName)
      .setTimestamp();

      message.channel.send(embed);
    } else 
    if (args[0] == "list"){ //Yg belum ada build -> lisa 
      list();
    } else 
    if (args[0] == "lvlup" || args[0] == "lvl" ){
      lvlUp();
    } else 
    if(args[0] == "traveller" || args[0] == "mc" || args[0] == "lumine" || args[0] == "ying" || args[0] == "hotaru" || args[0] == "aether" || args[0] == "kong" || args[0] == "sora"){
      mc();
      info();
    } else
    if (args[0] == "albedo"){
      albedo();
      calbedo();
      info();
    } else 
    if (args[0] == "amber"){
      amber();
      camber();
      info();
    } else 
    if (args[0] == "barbara"){
      barbara();
      cbarbara();
      info();
    } else 
    if (args[0] == "beidou"){
      beidou();
      cbeidou();
      info();
    } else 
    if (args[0] == "bennet"){
      bennet();
      cbennet();
      info();
    } else 
    if (args[0] == "chongyun"){
      chongyun();
      cchongyun();
      info();
    } else 
    if (args[0] == "diluc"){
      diluc();
      cdiluc();
      info();
    } else 
    if (args[0] == "diona"){
      diona();
      cdiona();
      info();
    } else 
    if (args[0] == "fischl"){
      fischl();
      cfischl();
      info();
    } else 
    if (args[0] == "jean"){
      jean();
      cjean();
      info();
    } else 
    if (args[0] == "kaeya"){
      kaeya();
      ckaeya();
      info();
    } else 
    if (args[0] == "keqing"){
      keqing();
      ckeqing();
      info();
    } else 
    if (args[0] == "klee"){
      klee();
      cklee();
      info();
    } else 
    if (args[0] == "lisa"){
      lisa();
      clisa();
      info();
    } else 
    if (args[0] == "mona"){
      mona();
      cmona();
      info();
    } else 
    if (args[0] == "ningguang"){
      ningguang();
      cningguang();
      info();
    } else 
    if (args[0] == "noelle"){
      noelle();
      cnoelle();
      info();
    } else 
    if (args[0] == "qiqi"){
      qiqi();
      cqiqi();
      info();
    } else 
    if (args[0] == "razor"){
      razor();
      crazor();
      info();
    } else 
    if (args[0] == "sucrose"){
      sucrose();
      csucrose();
      info();
    } else 
    if (args[0] == "childe" || args[0] == "tartaglia"){
      childe();
      cchilde();
      info();
    } else 
    if (args[0] == "venti"){
      venti();
      cventi();
      info();
    } else 
    if (args[0] == "xingqiu"){
      xingqiu();
      cxingqiu();
      info();
    } else 
    if (args[0] == "xiangling"){
      xiangling();
      cxiangling();
      info();
    } else 
    if (args[0] == "xinyan" ){
      xinyan();
      cxinyan();
      info();
    } else 
    if (args[0] == "zhongli" ){
      zhongli();
      czhongli();
      info();
    } else    
    if (args[0] == "ganyu" ){
      ganyu();
      cganyu();
      info();
    } else    
    if (args[0] == "xiao" ){
      xiao();
      cxiao();
      info();
    }
    
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function lowerCase(){
      if (!args[0]){
        return false;
      } else {
        return args[0].toLowerCase();
      }
    }

    function list(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`${message.guild.me.displayName}`, `${message.client.user.displayAvatarURL()}`)
      .setTitle(`Showing Full Genshin Impact Character List`)
      .setDescription(`There are currently over 29 playable character in genshin impact, each of them (aside from traveller) has their own unique element. There are 6 types of element in genshin impact. Currently Anemo has 5 playable character, Cryo has 5, Electro has 5, Geo has 5, Hydro has 4, and Pyro has 6. `)
      .addFields( {name: '❯\u2000\Anemo Character:', value: "- Jean\n- Sucrose\n- Venti\n- Xiao", inline: true},
                  {name: '❯\u2000\Cryo Character:', value: "- Chongyun\n- Diona\n- Kaeya\n- Qiqi\n- Ganyu", inline: true})
      .addFields( {name: '❯\u2000\Electro Character:', value: "- Beidou\n- Fischl\n- Keqing\n-Lisa\n-Razor", inline: true},
                  {name: '❯\u2000\Geo Character:', value: "- Albedo\n- Ningguang\n- Noelle\n- Zhongli", inline: true})
      .addFields( {name: '❯\u2000\Hydro Character:', value: "- Barbara\n- Childe/Tartaglia\n- Xingqiu\n- Mona", inline: true},
                  {name: '❯\u2000\Pyro Character:', value: "- Amber\n- Bennet\n- Diluc\n- Klee\n- Xiangling\n- Xinyan", inline: true})      
      .addField('❯\u2000\Adaptive Element:', "- Traveller (Currently can use Anemo/Geo)")
      .addField(`❯\u2000\Upcoming Character:`, "- Ayaka [Cryo]\n- Hu tao [Pyro]")
      .setFooter("Genshin Character List Patch 1.3")
      .setTimestamp();

      message.channel.send(embed);
    }
    
    function lvlUp(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(":arrow_down: Materials and mora needed for lvl up")
      .setImage('https://pbs.twimg.com/media/EriB3vTVkAYs0HD.jpg:large');
      message.channel.send(embed);
    }

    function info(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(":arrow_down: Materials and Mora Needed For Leveling")
      .setDescription("For full character list type list in command```css\n!!gchar list```")
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/799595215521316924/EriB3vTVkAYs0HD.jpg');
      message.channel.send(embed);
    }

    //ADAPTIVE
    function mc(){
      let embed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Traveller ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/7/71/Character_Traveler_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201125074010`)
      .setDescription(`Traveller is the main character of Genshin impact, they use sword and currently they can change their element to Geo and Anemo`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of everything?? (Traveller use all the book from genshin impact), Scroll, & Dvalin's Sigh", true)
      .addField('❯\u2000\Character Ascension Material:', "Brilliant Diamond (Get from AR level up), Windwheel Aster, Mask", true)
      .addField('❯\u2000\Day To Farm Talent Material:', "Everyday? (Traveller use all book so you can check each book for their farming days)")
      .addField('❯\u2000\World boss to gain material', "- Dvalin -> Dvalin's Sigh")
      .addField('❯\u2000\Special Passive:', "-")
      .setImage('https://static.wikia.nocookie.net/gensin-impact/images/c/cb/Character_Traveler_Introduction.png/revision/latest/scale-to-width-down/1000?cb=20201113080536')
      .setFooter("Info On Traveller ☆☆☆☆☆", 'https://static.wikia.nocookie.net/gensin-impact/images/7/71/Character_Traveler_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201125074010`')
      .setTimestamp();

      message.channel.send(embed);
    }

    //GEO D69940
    function albedo(){
      let embed = new MessageEmbed()
      .setColor('D69940')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/0/00/Character_Albedo_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201217053650`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star male character that uses sword and has geo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Ballad, Scroll, & Tusk of Monoceros Caeli", true)
      .addField('❯\u2000\Character Ascension Material:', "Topaz, Basalt Pillar, Cecillia, & Scroll",true)
      .addField('❯\u2000\World boss to gain material:', "- Childe Domain -> Tusk of Monocerson Caeli\n- Geo Hypostasis -> Topaz & Basalt Pilar")
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "Has 10% chance to receive double product when used for weapon ascension material crafting")
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/798822916417650738/unknown.png')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, 'https://static.wikia.nocookie.net/gensin-impact/images/0/00/Character_Albedo_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201217053650')
      .setTimestamp();

      message.channel.send(embed);
    }

    function ningguang(){
      let book = "Prosperity";
      let bossMat = "Spirit Locket of Boreas";
      let asc3 = "Glaze Lily";
      let asc4 = "Sergeant's Insignia";
      let geoBoss = "Geo Hypostasis -> Topaz & Basalt Pilar";
      let geoMat = "Topaz, Basalt Pilar";

      let embed = new MessageEmbed()
      .setColor('D69940')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/2/2b/Character_Ningguang_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150133`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses catalyst as a weapon and has geo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${geoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${geoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Displays the location of nearby ore veins (Iron Ore, White Iron Ore, Crystal Ore, Magical Crystal Ore, and Starsilver) on the mini-map.")
      .setImage('https://i.imgur.com/Mvu6qqM.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/2/2b/Character_Ningguang_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150133")
      .setTimestamp();

      message.channel.send(embed);
    } 

    function noelle(){
      let book = "Resistance";
      let bossMat = "Dvalin's Claw";
      let asc3 = "Glaze Lily";
      let asc4 = "Mask";
      let geoBoss = "Geo Hypostasis -> Topaz & Basalt Pilar";
      let geoMat = "Topaz, Basalt Pilar";

      let embed = new MessageEmbed()
      .setColor('D69940')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/a/ab/Character_Noelle_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150127`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses claymore as a weapon and has geo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${geoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Dvalin -> ${bossMat}\n- ${geoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on a DEF-boosting dish, Noelle has a 12% chance to obtain double the product.")
      .setImage('https://i.imgur.com/8mV9R8a.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/a/ab/Character_Noelle_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150127")
      .setTimestamp();

      message.channel.send(embed);
    } 

    function zhongli(){
      let book = "Gold";
      let bossMat = "Tusk of Monoceros Caeli";
      let asc3 = "Cor Lapis";
      let asc4 = "Slime Secretions";
      let geoBoss = "Geo Hypostasis -> Topaz & Basalt Pilar";
      let geoMat = "Topaz, Basalt Pilar";

      let embed = new MessageEmbed()
      .setColor('D69940')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/c/c2/Character_Zhongli_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201129065141`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star male character that uses polearm as a weapon and has geo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${geoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Childe Domain -> ${bossMat}\n- ${geoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "Refunds 15% of the ores used when crafting Polearm-type weapons.")
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/794971521285881896/zhongli.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/c/c2/Character_Zhongli_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201129065141")
      .setTimestamp();

      message.channel.send(embed);
    }

    //GEO CARD
    function calbedo(){
      let embed = new MessageEmbed()
      .setColor('D69940')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795253110431023104/unknown.png');
      
      message.channel.send(embed);
    }

    function cningguang(){
      let embed = new MessageEmbed()
      .setColor('D69940')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795260890147979294/unknown.png');
      
      message.channel.send(embed);
    } 

    function cnoelle(){
      let embed = new MessageEmbed()
      .setColor('D69940')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/806442929337139200/072273bbf93c515c80238f74ca796220_7058001202501810698.png');
      
      message.channel.send(embed);
    } 


    function czhongli(){
      let embed = new MessageEmbed()
      .setColor('D69940')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795260840672362496/unknown.png');
      
      message.channel.send(embed);
    } 

    //PYRO BC2628
    function amber(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150352`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses bow as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Freedom, Arrowhead, & Dvalin's Sigh", true)
      .addField('❯\u2000\Character Ascension Material:', "Everflame Seed, Agate Fragment, Small Lamp Grass, & Arrowhead",true)
      .addField('❯\u2000\World boss to gain material', "- Dvalin ->  Dvalin's Sigh\n- Pyro Regisvine -> Agate Fragment & Everflame Seed")
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases gliding Stamina consumption for your own party members by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://i.imgur.com/YlT78zM.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, 'https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150352')
      .setTimestamp();

      message.channel.send(embed);
    }

    function bennet(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/7/7b/Character_Bennett_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150335`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star male character that uses sword as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Resistance, Treasure Hoarder Insignia, & Dvalin's Plume", true)
      .addField('❯\u2000\Character Ascension Material:', "Agate Fragment, Everflame Seed, Windwheel Aster, & Insignia",true)
      .addField('❯\u2000\World boss to gain material:', "- Dvalin -> Dvalin's Plume\n- Pyro Regisvine -> Agate Fragment & Everflame Seed")
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When dispatched on an expedition in Mondstadt, time consumed is reduced by 25%.")
      .setImage('https://i.imgur.com/mLlK2G0.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/7/7b/Character_Bennett_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150335")
      .setTimestamp();

      message.channel.send(embed);
    }

    function diluc(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/0/02/Character_Diluc_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150303`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star male character that uses catalyst as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Resistance, Sergeant's Insignia, & Dvalin's Plume", true)
      .addField('❯\u2000\Character Ascension Material:', "Agate Fragment, Everflame Seed, Small Lamp Grass, & Insignia",true)
      .addField('❯\u2000\World boss to gain material:', "- Dvalin -> Dvalin's Plume\n- Pyro Regisvine -> Agate Fragment & Everflame Seed")
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "Refunds 15% of the ores used when crafting Claymore-type weapons.")
      .setImage('https://i.imgur.com/yL5GZSx.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/0/02/Character_Diluc_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150303")
      .setTimestamp();

      message.channel.send(embed);
    }   

    function klee(){
      let book = "Freedom";
      let bossMat = "Ring of Boreas";
      let asc3 = "Philanemo Mushroom";
      let asc4 = "Scroll";
      let pyroBoss = "Pyro Regisvine -> Agate Fragment & Everflame Seed";
      let pyroMat = "Agate Fragment, Everflame Seed"

      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/c/c3/Character_Klee_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150211`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses catalyst as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${pyroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${pyroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Displays the location of nearby resources unique to Mondstadt on the mini-map.")
      .setImage('https://i.imgur.com/7DSrpN5.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/c/c3/Character_Klee_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150211")
      .setTimestamp();

      message.channel.send(embed);
    } 

    function xiangling(){
      let book = "Diligence";
      let bossMat = "Dvalin's Claw";
      let asc3 = "Jueyun Chili";
      let asc4 = "Slime Secretions";
      let pyroBoss = "Pyro Regisvine -> Agate Fragment & Everflame Seed";
      let pyroMat = "Agate Fragment, Everflame Seed"

      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/a/a0/Character_Xiangling_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145949`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses polearm as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${pyroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Dvalin -> ${bossMat}\n- ${pyroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on an ATK-boosting dish, Xiangling has a 12% chance to receive double the product.")
      .setImage('https://i.imgur.com/PPaJisI.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/a/a0/Character_Xiangling_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145949")
      .setTimestamp();

      message.channel.send(embed);
    }

    function xinyan(){
      let book = "Gold";
      let bossMat = "Tusk of Monoceros Caeli";
      let asc3 = "Violetgrass";
      let asc4 = "Treasure Hoarder Insignia";
      let pyroBoss = "Pyro Regisvine -> Agate Fragment & Everflame Seed";
      let pyroMat = "Agate Fragment, Everflame Seed"

      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/9/9d/Character_Xinyan_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201129065150`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses claymore as a weapon and has pyro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${pyroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Childe Domain -> ${bossMat}\n- ${pyroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on an DEF-boosting dish, Xinyan has a 12% chance to obtain double the product.")
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/794971522032074772/xinyan.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/9/9d/Character_Xinyan_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201129065150")
      .setTimestamp();

      message.channel.send(embed);
    }

    //PYRO CARD
    function camber(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/813271143322484746/Eur67qrXAAYAagr.png');
      
      message.channel.send(embed);
    }

    function cbennet(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795265178357858324/unknown.png');
      
      message.channel.send(embed);
    }

    function cdiluc(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795265036926582824/unknown.png');
      
      message.channel.send(embed);
    }

    function cklee(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795265074745835590/unknown.png');
      
      message.channel.send(embed);
    }

    function cxiangling(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795265111631331328/unknown.png');
      
      message.channel.send(embed);
    }

    function cxinyan(){
      let embed = new MessageEmbed()
      .setColor('BC2628')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/806442901432958993/8d10c6784b158bc95e0aa60918217a34_5455745203648940891.png');
      
      message.channel.send(embed);
    }

    //HYDRO 228FBA
    function barbara(){
      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/7/72/Character_Barbara_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150346`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses catalyst as a weapon and has hydro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Freedom, Scroll, & Ring of Boreas", true)
      .addField('❯\u2000\Character Ascension Material:', "Lazurite Fragment, Cleansing Heart, Philanemo Mushroom, & Scroll",true)
      .addField('❯\u2000\World boss to gain material:', "- Wolf Boss -> Ring of Boreas\n- Oceanids -> Lazurite Fragment & Cleansing Heart")
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on a dish with restorative effects, Barbara has a 12% chance to obtain double the product.")
      .setImage('https://i.imgur.com/k3cwW5t.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, 'https://static.wikia.nocookie.net/gensin-impact/images/7/72/Character_Barbara_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150346')
      .setTimestamp();

      message.channel.send(embed);
    }

    function childe(){
      let book = "Freedom";
      let bossMat = "Shard of a Foul Legacy";
      let asc3 = "Starconch";
      let asc4 = "Sergeant's Insignia";
      let hydroBoss = "Oceanids -> Lazurite Fragment & Cleansing Heart";
      let hydroMat = "Lazurite Fragment, Cleansing Heart";

      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setAuthor(`Tartaglia ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/5/53/Character_Tartaglia_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145931`)
      .setDescription(`Tartaglia is a 5 star male character that uses bow as a weapon and has hydro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${hydroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Childe Domain -> ${bossMat}\n- ${hydroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Increases your own party members' Normal Attack Level by 1.")
      .setImage('https://i.imgur.com/12xarDw.jpg')
      .setFooter(`Info On Tartaglia ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/5/53/Character_Tartaglia_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145931")
      .setTimestamp();

      message.channel.send(embed);
    }

    function xingqiu(){
      let book = "Gold";
      let bossMat = "Tail of Boreas";
      let asc3 = "Silk Flower";
      let asc4 = "Mask";
      let hydroBoss = "Oceanids -> Lazurite Fragment & Cleansing Heart";

      let hydroMat = "Lazurite Fragment, Cleansing Heart";

      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Character_Xingqiu_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145941`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star male character that uses sword as a weapon and has hydro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${hydroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${hydroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "When Xingqiu crafts Character Talent Materials, he has a 25% chance to refund a portion of the crafting materials used.")
      .setImage('https://i.imgur.com/mDy82LL.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/4/4a/Character_Xingqiu_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118145941")
      .setTimestamp();

      message.channel.send(embed);
    }

    function mona(){
      let book = "Resistance";
      let bossMat = "Ring of Boreas";
      let asc3 = "Philanemo Mushroom";
      let asc4 = "Energy Nectar";
      let hydroBoss = "Oceanids -> Lazurite Fragment & Cleansing Heart";
      let hydroMat = "Lazurite Fragment, Cleansing Heart";

      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/a/a0/Character_Mona_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150200`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses catalyst as a weapon and has hydro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${hydroMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${hydroBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When Mona crafts Weapon Ascension Materials, she has a 25% chance to refund a portion of the crafting materials used.")
      .setImage('https://i.imgur.com/AMWoxaW.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/a/a0/Character_Mona_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150200")
      .setTimestamp();

      message.channel.send(embed);
    } 

    //HYDRO CARD 
    function cbarbara(){
      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/806442946886893588/7cf06de305f0d3278d19c483a3c5e71c_1198049698265899605.png');
      
      message.channel.send(embed);
    }
    
    function cchilde(){
      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setTitle(`:arrow_down: Tips for Tartaglia ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795261942935322644/unknown.png');
      
      message.channel.send(embed);
    } 
    
    function cxingqiu(){
      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795262198195683328/unknown.png');
      
      message.channel.send(embed);
    } 

    function cmona(){
      let embed = new MessageEmbed()
      .setColor('228FBA')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795253159072759818/unknown.png');
      
      message.channel.send(embed);
    } 

    //CRYO 49C6F8
    function chongyun(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/6/68/Character_Chongyun_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150317`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star male character that uses claymore as a weapon and has cryo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Diligence, Mask, & Dvalin's Sigh", true)
      .addField('❯\u2000\Character Ascension Material:', "Jade Fragment, Hoarfrost Core, Cor Lapis, & Mask",true)
      .addField('❯\u2000\World boss to gain material:', "- Dvalin -> Dvalin's Sigh\n- Cryo Regisvine -> Jade Fragment, Hoarfrost Core")
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When dispatched on an expedition in Liyue, time consumed is reduced by 25%.")
      .setImage('https://i.imgur.com/badLybw.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/6/68/Character_Chongyun_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150317")
      .setTimestamp();

      message.channel.send(embed);
    } 

    function diona(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/b/b9/Character_Diona_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150258`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses bow as a weapon and has cryo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Freedom, Arrowhead, & Shard of a Foul Legacy", true)
      .addField('❯\u2000\Character Ascension Material:', "Jade Fragment, Hoarfrost Core, Calla Lily, & Arrowhead",true)
      .addField('❯\u2000\World boss to gain material:', "- Childe Domain -> Shard of a Foul Legacy\n- Cryo Regisvine -> Jade Fragment & Hoarfrost Core")
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on a dish with restorative effects, Diona has a 12% chance to obtain double the product.")
      .setImage('https://i.imgur.com/sOK29K9.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/b/b9/Character_Diona_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150258")
      .setTimestamp();

      message.channel.send(embed);
    }    

    function kaeya(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/3/33/Character_Kaeya_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150221`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star male character that uses sword as a weapon and has cryo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Ballad, Treasure Hoarder Insignia, & Spirit Locket of Boreas", true)
      .addField('❯\u2000\Character Ascension Material:', "Jade Fragment, Hoarfrost Core, Calla Lily, & Insignia",true)
      .addField('❯\u2000\World boss to gain material:', "- Wolf Boss -> Spirit Locket of Boreas\n- Cryo Regisvine -> Jade Fragment & Hoarfrost Core")
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases sprinting Stamina consumption of your characters in the party by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://i.imgur.com/9aEGaSW.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/3/33/Character_Kaeya_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150221")
      .setTimestamp();

      message.channel.send(embed);
    }  

    function qiqi(){
      let book = "Prosperity";
      let bossMat = "Tail of Boreas";
      let asc3 = "Violetgrass";
      let asc4 = "Scroll";
      let cryoBoss = "Cryo Regisvine -> Jade Fragment & Hoarfrost Core";
      let cryoMat = "Jade Fragment, Hoarfrost Core";

      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/d/d5/Character_Qiqi_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150121`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses sword as a weapon and has cryo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${cryoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${cryoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Displays the location of nearby resources unique to Liyue on the mini-map.")
      .setImage('https://i.imgur.com/eJDVtyf.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/d/d5/Character_Qiqi_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150121")
      .setTimestamp();

      message.channel.send(embed);
    }
    
    function ganyu(){
      let book = "Diligence";
      let bossMat = "Shadow of the Warrior";
      let asc3 = "Qinxin";
      let asc4 = "Nectar";
      let cryoBoss = "Cryo Regisvine -> Jade Fragment & Hoarfrost Core";
      let cryoMat = "Jade Fragment, Hoarfrost Core";

      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/0/0a/Character_Ganyu_Thumb.png/revision/latest/scale-to-width-down/50?cb=20210106060102`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses bow as a weapon and has cryo element in genshin impact.`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${cryoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Childe -> ${bossMat}\n- ${cryoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Refunds 15% of the ores used when crafting Bow-type weapons.")
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/798823182185529384/unknown.png')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/0/0a/Character_Ganyu_Thumb.png/revision/latest/scale-to-width-down/50?cb=20210106060102")
      .setTimestamp();

      message.channel.send(embed);
    } 

    //CRYO CARD 
    function cchongyun(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795253047423926282/unknown.png');
      
      message.channel.send(embed);
    } 

    function cdiona(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795260563461505034/unknown.png');
      
      message.channel.send(embed);
    }

    function ckaeya(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/798043469859389461/ErVRuSrXUAYx3It.png');
      
      message.channel.send(embed);
    }

    function cqiqi(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795252990109810728/unknown.png');
      
      message.channel.send(embed);
    }

    function cganyu(){
      let embed = new MessageEmbed()
      .setColor('49C6F8')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/798827617754808330/Erj5ZXCWMAIzz0T.png');
      
      message.channel.send(embed);
    }

    //ELECTRO 6D58A0
    function beidou(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/6/61/Character_Beidou_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150340`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses claymore as a weapon and has electro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Gold, Treasure Hoarder Insignia, & Dvalin's Sigh", true)
      .addField('❯\u2000\Character Ascension Material:', "Amethist Fragment, Lightning prism, Noctilucous Jade, & Insignia",true)
      .addField('❯\u2000\World boss to gain material:', "- Dvalin -> Dvalin's Sigh\n- Electro Hypostasis -> Amethist Fragment & Lightning prism")
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases swimming Stamina consumption of your characters in the party by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://i.imgur.com/MZIXPuc.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/6/61/Character_Beidou_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150340")
      .setTimestamp();

      message.channel.send(embed);
    }

    function fischl(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/1/14/Character_Fischl_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150308`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses bow as a weapon and has electro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Ballad, Arrowhead, & Spirit Locket of Boreas", true)
      .addField('❯\u2000\Character Ascension Material:', "Amethist Fragment, Lightning prism, Small Lamp Grass, & Arrowhead",true)
      .addField('❯\u2000\World boss to gain material:', "- Wolf Boss -> Spirit Locket of Boreas\n- Electro Hypostasis -> Amethist Fragment & Lightning prism")
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "When dispatched on an expedition in Mondstadt, the time consumed is reduced by 25%.")
      .setImage('https://i.imgur.com/qN2MPtE.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/1/14/Character_Fischl_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150308")
      .setTimestamp();

      message.channel.send(embed);
    }    

    function keqing(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/0/06/Character_Keqing_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150215`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses sword as a weapon and has electro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Prosperity, Nectar, & Ring of Boreas", true)
      .addField('❯\u2000\Character Ascension Material:', "Amethyst Fragment, Lightning Prism, Cor Lapis, & Nectar",true)
      .addField('❯\u2000\World boss to gain material:', "- Wolf Boss -> Ring of Boreas\n- Electro Hypostasis -> Amethist Fragment & Lightning prism")
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "When dispatched on an expedition in Liyue, time consumed is reduced by 25%.")
      .setImage('https://i.imgur.com/MYuRtKI.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/0/06/Character_Keqing_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150215")
      .setTimestamp();

      message.channel.send(embed);
    }   

    function lisa(){
      let book = "Ballad";
      let bossMat = "Dvalin's Claw";
      let asc3 = "Valberry";
      let asc4 = "Slime Secretions";
      let elecBoss = "Electro Hypostasis -> Amethist Fragment & Lightning prism";
      let elecMat = "Amethist Fragment, Lightning prism";

      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/5/51/Character_Lisa_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150206`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses catalyst as a weapon and has electro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${elecMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Dvalin -> ${bossMat}\n- ${elecBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "When Lisa crafts a potion, she has a 20% chance to refund a portion of the crafting materials used.")
      .setImage('https://i.imgur.com/hfc5lWg.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/5/51/Character_Lisa_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150206")
      .setTimestamp();

      message.channel.send(embed);
    }    

    function razor(){
      let book = "Resistance";
      let bossMat = "Dvalin's Claw";
      let asc3 = "Wolfhook";
      let asc4 = "Mask";
      let elecBoss = "Electro Hypostasis -> Amethist Fragment & Lightning prism";
      let elecMat = "Amethist Fragment, Lightning prism";

      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/1/1d/Character_Razor_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150040`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star male character that uses claymore as a weapon and has electro element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${elecMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Dvalin -> ${bossMat}\n- ${elecBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases sprinting Stamina consumption of your characters in the party by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://i.imgur.com/DSzvtgi.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/1/1d/Character_Razor_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150040")
      .setTimestamp();

      message.channel.send(embed);
    } 

    //ELECTRO CARD
    function cbeidou(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263285854601238/unknown.png');
      
      message.channel.send(embed);
    } 

    function cfischl(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263182905933824/unknown.png');
      
      message.channel.send(embed);
    } 

    function ckeqing(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263236656201728/unknown.png');
      
      message.channel.send(embed);
    } 

    function clisa(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/810152740230922290/EuDGHnsWgAUGG1E.png');
      
      message.channel.send(embed);
    } 

    function crazor(){
      let embed = new MessageEmbed()
      .setColor('6D58A0')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795253212109996062/unknown.png');
      
      message.channel.send(embed);
    } 

    //ANEMO 32A48F
    function jean(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/8/89/Character_Jean_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150252`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star female character that uses sword as a weapon and has anemo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of Resistance, Mask, & Dvalin's Plume", true)
      .addField('❯\u2000\Character Ascension Material:', "Turquoise Chunk, Hurricane Seed, Dandelion Seed, & Mask",true)
      .addField('❯\u2000\World boss to gain material:', "- Dvalin - Dvalin's Plume\n- Anemo Hypostasis -> Turquoise Chunk & Hurricane Seed")
      .addField('❯\u2000\Day To Farm Talent Material:', "Tuesday - Friday - Sunday")
      .addField('❯\u2000\Special Passive', "When a Perfect Cooking is achieved on a dish with restorative effects, Jean has a 12% chance to obtain double the product.")
      .setImage('https://i.imgur.com/5Ap0dmA.jpeg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/8/89/Character_Jean_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150252")
      .setTimestamp();

      message.channel.send(embed);
    }    

    function sucrose(){
      let book = "Freedom";
      let bossMat = "Spirit Locket of Boreas";
      let asc3 = "Windwheel Aster";
      let asc4 = "Nectar";
      let anemoBoss = "Anemo Hypostasis -> Turquoise Chunk & Hurricane Seed";
      let anemoMat = "Turquoise Chunk, Hurricane Seed";

      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/6/61/Character_Sucrose_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150116`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 4 star female character that uses catalyst as a weapon and has anemo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${anemoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${anemoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "When Sucrose crafts Character and Weapon Enhancement Materials, she has a 10% chance to obtain double the product.")
      .setImage('https://i.imgur.com/aQCaKeu.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/6/61/Character_Sucrose_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150116")
      .setTimestamp();

      message.channel.send(embed);
    }
    
    function venti(){
      let book = "Ballad";
      let bossMat = "Tail of Boreas";
      let asc3 = "Cecilia";
      let asc4 = "Slime Secretions";
      let anemoBoss = "Anemo Hypostasis -> Turquoise Chunk & Hurricane Seed";
      let anemoMat = "Turquoise Chunk, Hurricane Seed";

      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/8/8d/Character_Venti_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150028`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star male character that uses bow as a weapon and has anemo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', `Book of ${book}, ${asc4}, & ${bossMat}`, true)
      .addField('❯\u2000\Character Ascension Material:', `${anemoMat}, ${asc3}, & ${asc4}`,true)
      .addField('❯\u2000\World boss to gain material:', `- Wolf Boss -> ${bossMat}\n- ${anemoBoss}`)
      .addField('❯\u2000\Day To Farm Talent Material:', "Wednesday - Saturday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases gliding Stamina consumption for your own party members by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://i.imgur.com/o18dC79.jpg')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/8/8d/Character_Venti_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201118150028")
      .setTimestamp();

      message.channel.send(embed);
    }

    function xiao(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setAuthor(`${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, `https://static.wikia.nocookie.net/gensin-impact/images/b/b9/Character_Xiao_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201212182332`)
      .setDescription(`${capitalizeFirstLetter(args[0])} is a 5 star male character that uses polearm as a weapon and has anemo element in genshin impact`)
      .addField('❯\u2000\Talent Leveling Material:', "Book of prosperity, Slime secretions, & Shadow of the warrior", true)
      .addField('❯\u2000\Character Ascension Material:', "Turquoise Chunk, Junevile Jade, Qinxin, & Slime secretions",true)
      .addField('❯\u2000\World boss to gain material:', "- Childe - Shadow of the warrior\n- Anemo Hypostasis -> Turquoise Chunk & Hurricane Seed\n-Primo Geovishap -> Junevile Jade")
      .addField('❯\u2000\Day To Farm Talent Material:', "Monday - Thursday - Sunday")
      .addField('❯\u2000\Special Passive', "Decreases climbing Stamina consumption for your own party members by 20%. Not stackable with Passive Talents that provide the exact same effects.")
      .setImage('https://cdn.discordapp.com/attachments/799595012005822484/806792670633525278/unknown.png')
      .setFooter(`Info On ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`, "https://static.wikia.nocookie.net/gensin-impact/images/b/b9/Character_Xiao_Thumb.png/revision/latest/scale-to-width-down/50?cb=20201212182332")
      .setTimestamp();

      message.channel.send(embed);
    }

    //ANEMO CARD
    function cjean(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263686495305728/unknown.png');
      
      message.channel.send(embed);
    } 

    function csucrose(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263781747294218/unknown.png');
      
      message.channel.send(embed);
    } 

    function cventi(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/795263738533904394/unknown.png');
      
      message.channel.send(embed);
    } 

    function cxiao(){
      let embed = new MessageEmbed()
      .setColor('32A48F')
      .setTitle(`:arrow_down: Tips for ${capitalizeFirstLetter(args[0])} ☆☆☆☆☆`)
      .setImage('https://cdn.discordapp.com/attachments/653206818759376916/806786196348862470/EtUpocpWgAov3gN.png');
      
      message.channel.send(embed);
    } 
  }
}