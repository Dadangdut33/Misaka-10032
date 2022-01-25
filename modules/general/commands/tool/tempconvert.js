const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");

module.exports = class extends Command {
	constructor() {
		super("tempconvert", {
			aliases: ["tempc", "tc"],
			categories: "tool",
			info: "Convert temperature provided into Celcius (C), Fahrenheit (F), Reamur (R), and Kelvin (K)",
			usage: `${prefix}command/alias <c/f/r/k> <temperature in number>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		args[0] = lowerCase();

		function lowerCase() {
			if (!args[0]) {
				return false;
			} else {
				return args[0].toLowerCase();
			}
		}

		if (!args[0] || !args[1]) {
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`Please Enter The Correct Arguments`)
				.setDescription(
					`For more detailed info please check using the help command. Arguments provided should be like :arrow_down:\`\`\`css\n${prefix}command/alias <type of temperature that you want to convert> <temperature in number>\`\`\``
				)
				.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
				.setTimestamp();

			message.channel.send(embed);
		} else if (args[0] == "c" || args[0] == "celcius") {
			if (isNaN(args[1])) {
				let embed = new MessageEmbed().setDescription(`Invalid number Provided!`);

				return message.channel.send(embed);
			}

			var temp = parseFloat(args[1]);
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`${temp}° Celcius Converted To`)
				.addField(`Fahrenheit`, `${celciusToFahrenheit(temp).toFixed(2)}.°F`, true)
				.addField(`Reamur`, `${celciusToReamur(temp).toFixed(2)}°R`, true)
				.addField(`Kelvin`, `${celciusToKelvin(temp).toFixed(2)}K`, true)
				.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
				.setTimestamp();

			return message.channel.send(embed);
		} else if (args[0] == "f" || args[0] == "fahrenheit") {
			if (isNaN(args[1])) {
				let embed = new MessageEmbed().setDescription(`Invalid number Provided!`);

				return message.channel.send(embed);
			}

			var temp = parseFloat(args[1]);
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`${temp}° Fahrenheit Converted To`)
				.addField(`Celcius`, `${fahrenheitToCelcius(temp).toFixed(2)}°C`, true)
				.addField(`Reamur`, `${fahrenheitToReamur(temp).toFixed(2)}°R`, true)
				.addField(`Kelvin`, `${fahrenheitToKelvin(temp).toFixed(2)}K`, true)
				.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
				.setTimestamp();

			return message.channel.send(embed);
		} else if (args[0] == "r" || args[0] == "reamur") {
			if (isNaN(args[1])) {
				let embed = new MessageEmbed().setDescription(`Invalid number Provided!`);

				return message.channel.send(embed);
			}

			var temp = parseFloat(args[1]);
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`${temp}° Reamur Converted To`)
				.addField(`Celcius`, `${reamurToCelcius(temp).toFixed(2)}°C`, true)
				.addField(`Fahrenheit`, `${reamurToFahrenheit(temp).toFixed(2)}°F`, true)
				.addField(`Kelvin`, `${reamurToKelvin(temp).toFixed(2)}K`, true)
				.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
				.setTimestamp();

			return message.channel.send(embed);
		} else if (args[0] == "k" || args[0] == "kelvin") {
			if (isNaN(args[1])) {
				let embed = new MessageEmbed().setDescription(`Invalid number Provided!`);

				return message.channel.send(embed);
			}

			var temp = parseFloat(args[1]);
			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`${temp} Kelvin Converted To`)
				.addField(`Celcius`, `${kelvinToCelcius(temp).toFixed(2)}°C`, true)
				.addField(`Fahrenheit`, `${kelvinToFahrenheit(temp).toFixed(2)}°F`, true)
				.addField(`Reamur`, `${kelvinToReamur(temp).toFixed(2)}°R`, true)
				.setFooter(message.client.user.username, message.client.user.displayAvatarURL())
				.setTimestamp();

			return message.channel.send(embed);
		}
	}
};

//Celcius
function celciusToFahrenheit(c) {
	var f;
	f = (c * 9) / 5 + 32;
	return f;
}

function celciusToReamur(c) {
	var r;
	r = (c * 4) / 5;
	return r;
}

function celciusToKelvin(c) {
	var k;
	k = c + 273.16;
	return k;
}

//Fahrenheit
function fahrenheitToCelcius(f) {
	var c;
	c = ((f - 32) * 5) / 9;
	return c;
}

function fahrenheitToReamur(f) {
	var r;
	r = ((f - 32) * 4) / 9;
	return r;
}

function fahrenheitToKelvin(f) {
	var k;
	k = ((f - 32) * 5) / 9 + 273.16;
	return k;
}

//Reamur
function reamurToCelcius(r) {
	var c;
	c = (r * 5) / 4;
	return c;
}

function reamurToFahrenheit(r) {
	var f;
	f = (r * 9) / 4 + 32;
	return f;
}

function reamurToKelvin(r) {
	var k;
	k = (r * 5) / 4 + 273.16;
	return k;
}

//Kelvin
function kelvinToCelcius(k) {
	var c;
	c = k - 273.16;
	return c;
}

function kelvinToFahrenheit(k) {
	var f;
	f = ((k - 273.16) * 9) / 5 + 32;
	return f;
}

function kelvinToReamur(k) {
	var r;
	r = ((k - 273.16) * 4) / 5;
	return r;
}
