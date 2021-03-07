const { Random } = require("../../../../local_dependencies/indexrandom.js");
const random = new Random();
const { Command } = require('../../../../handler');
const { prefix } = require("../../../../config");

module.exports = class extends Command {
  constructor(){ 
    super('kitsune', {
      categories: "anime-misc",
      aliases: ["No alias is set for this command"],
      info: "Post random kitsune girl image using [Neko-love API](https://neko-love.xyz/)",
      usage: `${prefix}command`,
      guildOnly: false,
    });
  }
  
  async run (message, args) {  
      const msg = await message.channel.send(`Loading...`);

      let data = await random.getKitsune().catch(e => {
        console.log(e);
        msg.edit(`Can't reached API, try again later!`);
        return; 
      });

      if(!data){
        msg.edit(`Can't reached API, try again later!`);
        return; 
      }

      msg.delete();
      return message.channel.send(data);
  }
}