const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
var zalgo = require("to-zalgo");

module.exports = class extends Command {
	constructor() {
		super("zalgo", {
			aliases: ["No alias is set for this command"],
			categories: "text",
			info: "**z̵̭͕̖̹͙̦̠̋̑͂̂͜ͅa̴̤̖̲̣̗̗̖̠͍͉̞̳̣̥͌́ͅl̷̮̱̤̀́͐̕g̵̡̘̞̞̰͉̹̙̮̮̳̠͕̓̀̑̆ǫ̷̼̪̰̘̥̻̝̾͋́̂͆́̚͘ȋ̴̻͈͈̹͈̮͆̾͂͝f̶̛̘̮͉͎̏̈́̌̒ŷ̸̧̡̢̧̯̟̬͎̦̩̻͍͂̑͋̈́̌̈͛͒̐̏̈́̄͌̑** letter(s) using [to-zalgo](https://www.npmjs.com/package/to-zalgo)",
			usage: `${prefix}command/alias <text>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			let embed = new MessageEmbed().setDescription("P̷̢̡̭̮̝͔̰̰̥̖̺̹̂́̅̌͊̑͊̀͘͝l̶̛͉̞̤̞̳̞̗̺̺̖̫̻͔͂̏͌́͒̔̓̽͆̆͝ȩ̵̢̡̧̡̻̠̰̖͉̣̟̘͈̌̃̈́͂̋͑͠ͅả̴̰̯̦̖̣̮̠̤̺͎̪͗͛̀̆͜͜s̷̲̝̻͕̥̻̥͉͔̈̑͋̈́̋̊́ͅḛ̴̛̛̈̆̾̐̇̆̕̕ ̵̼̦͉̼͆͊̄̈́͊̅̎͂̇̾͑͜͠͝e̵̡̻̮̬̜̱̰̻̮͍̊̀̔̊̆̈̒̕ń̴̢̧̬̗̳̤͚̲̻̈́̉̏͐̈́̑̋̀̔̈́͛̆̂̚͜ţ̶̡̛͉̗̱͔̱̯̑̉͋͗̀͊̀͝ȩ̶̛̛͕̝̟̞̥̞͎̜̫̲̲͕̀̾̓̈́̀̚̕ŗ̴͍̲̭͔̮͖̪͖̜̭̗͍̐̿̋͝ͅ ̵̨̢̳͇̺̥͔̙̬̪͓̲͉̞͛͂̎̐̎͝͠ͅt̷̨̛̜̺̩̪̳̂̆̑͠ḩ̷̗̗̭̞̉͂͛̍̈̓̏̇̕ë̸̛̛͉̦̲̣́͗̅̀͆͠ ̶̢̧̛̬͚̭̱̻͋̎͐̕ţ̸̛̺̪͉͈̰͚̤̫̭͇̫̫̖̙́̒̉ë̸̡͇̠͉̭͂̈̋̔̋̽͘̕ͅx̷̧̝̰̦͔͕̬͕͉͖͌̉͆̆̀̄̉͆͂̔̚̚ͅt̴̡̛̫̜̯̞̼̰̲̙͕͚̲̫̂͂̈́̿̋͑̀̀͘̚͝ ̶̝̩̬̳͎̭̂̈́̽̄̀͝t̵̨̨̜̰͉̰̩̳͍̻͉̫͍̔̑̉̇͆̄̽̊̾͊͌͝ḩ̷̻͕͙͓͌̉̃̄̽̊̎̆̔̿͘͜a̷̧̙͎͈̦̍́͌̓͒t̵̨̩̱̳̞̭͓͎̯͖̼̂̈́̈́͋̑͛͑́̈͂̑͗̉͊͘ ̸̧̯̳͕̹̦͈͍̾̍͛͒̈͆̇ŷ̷̢̬̣̲̏͊̉͒͠o̴̥͒̒̈͆̊̄͘͝͝ư̶̮̫̗̥̗̔͆͐͛͗̾̒̌̋ ̵͔̰̣̩̘̿̓̓̀̉͂̕̚͝w̷̛̥͓̘̹͓̞͚͛̓͆̒̅̑͊̕͝ą̶̪̭̫͓̻̫̪̏̐̈́̓͒̌͛̿͋̐̚͠n̷̛̥̳̹̣̹͍̥̤̂͛̉̍͒̍̕͘͜͝t̵̡̝̳͚̝͉̑̐̽̕ ̶̛̪̭̖̞͙̰͕́̽̓̏̍̔̅͠ͅt̷͈̝̮̬̦̀̊̌͐̍ơ̶̢͔̮̤͈̪̗̘͈͇̱̣̋̎ ̵̻͌̅͑̕**z̸̛̜̎͊̎͛̌́̋̉͠ă̵̛͈̟͔̹̝̙̞̝̐͌̉̏̂̔̍̀̌͝l̷͇̟̯͎͙͍̟̥͓̦̦̱͖̘̆̋̈̓̚̕ͅg̴̢̧̹̤̰̻͖̰͛̕o̷̢̧̺̠̘̜̩̭̟͚͚͛̏̓͜͝͝i̶̢̩̮̜̠͑̑̆̃̊̈̍̀f̴̨̛̬̺͉̜̜͈̫̦̜̹̻͇͗̈̀̌̊͗̉̃͜y̶̨̲̱̲̩͚͙̪̳̯̺͕̰̌̍͆̄͌̋̐**");

			message.channel.send(embed);
		} else {
			const zalgoed = zalgo(args.join(" "));

			message.channel.send(zalgoed);
		}
	}
};
