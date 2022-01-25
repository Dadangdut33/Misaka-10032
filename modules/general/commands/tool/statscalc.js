const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
var isNumber = require("isnumber");

module.exports = class extends Command {
	constructor() {
		super("statscalc", {
			aliases: ["sc", "stats"],
			categories: "tool",
			info: "Calculate the statistical of given data. Calculated data are results including sorted data, average of data, median, variation, standard deviation, & average deviation",
			usage: `${prefix}command/alias <data separated by space>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			info();
		} else {
			//Replace new line bullshit
			var newArgs = [];
			for (var i = 0; i < args.length; i++) {
				newArgs[i] = args[i].replace(/(\n)/g, " "); // coba nanti tambahin buat kalo , ;
			}

			var splitted = [];
			for (var i = 0; i < newArgs.length; i++) {
				newArgs[i] = newArgs[i].split(" "); // Convert the \s to string newArgs
			}
			splitted = newArgs.join(" "); // Make it a string by joining
			splitted = splitted.replace(/,/g, " "); // There is still a comma because it's a different array
			splitted = splitted.split(" "); // Now it's new array without new line

			// Map the numbers
			var numbersToCalculate = [];
			numbersToCalculate = numbers(splitted);
			if (numbersToCalculate == "") {
				info();
				return;
			}

			// Sum up the number
			var dataSum = sum(numbersToCalculate);

			// Avg
			var avg = mean(numbersToCalculate);

			// Median
			var med = median(numbersToCalculate);

			// Mode
			var mod = [];
			var mod = mode(numbersToCalculate);
			var daModes = [];
			var reg = /^\d+$/;

			if (!reg.test(mod)) {
				// Check if it's only 1 digit of number
				for (let item of mod) {
					daModes.push(item);
				}
				daModes = daModes.join(", ");
			} else {
				daModes = mod;
			}

			// Sample Variance
			var Svary = sampleVariance(numbersToCalculate);

			// Population Variance
			var Pvary = populationVariance(numbersToCalculate);

			// Population Standard deviation
			var Psd = populationStdev(numbersToCalculate);

			// Sample Standard deviation
			var Ssd = sampleStdev(numbersToCalculate);

			//Average deviation
			var dataAbs = 0;
			for (var i = 0; i < numbersToCalculate.length; i++) {
				dataAbs += Math.abs(numbersToCalculate[i] - avg); //Abs
			}
			var AD = dataAbs / numbersToCalculate.length;

			// Skewness scrapped from https://www.npmjs.com/package/compute-skewness
			var skew = skewness(numbersToCalculate);

			// Kurtosis Scrapped from https://www.npmjs.com/package/compute-kurtosis
			var kurt = kurtosis(numbersToCalculate);

			let embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(`Statistic Calculator`)
				.addField(`Data Given`, `${numbersToCalculate.join(`, `)}`, false)
				.addField(`Data Sorted `, `${numbersToCalculate.sort().join(`, `)}`, false)
				.addField(`Data Length`, `${numbersToCalculate.length}`, true)
				.addField(`Total`, `${dataSum}`, true)
				.addField(`Mean`, `${avg}`, true)
				.addField(`Median`, `${med}`, true)
				.addField(`Mode`, `${daModes}`, true)
				.addField(`Sample Variance`, `${Svary.toFixed(4)}`, true)
				.addField(`Population Variance`, `${Pvary.toFixed(4)}`, true)
				.addField(`Sample Standard Deviation`, `${Ssd.toFixed(4)}`, true)
				.addField(`Population Standard Deviation`, `${Psd.toFixed(4)}`, true)
				.addField(`Average Deviation`, AD.toFixed(4), true)
				.addField(`Skewness`, `${skew.toFixed(4)}`, true)
				.addField(`Kurtosis`, `${kurt.toFixed(4)}`, true)
				.setFooter(
					`Requested by ${message.author.username}`,
					message.author.displayAvatarURL({
						format: "jpg",
						size: 2048,
					})
				)
				.setTimestamp();

			message.channel.send(embed);
		}

		//Info
		function info() {
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

// Functions BELOW

function kurtosis(arr) {
	if (!Array.isArray(arr)) {
		throw new TypeError("kurtosis()::invalid input argument. Must provide an array.");
	}
	var len = arr.length,
		delta = 0,
		delta_n = 0,
		delta_n2 = 0,
		term1 = 0,
		N = 0,
		mean = 0,
		M2 = 0,
		M3 = 0,
		M4 = 0,
		g;

	for (var i = 0; i < len; i++) {
		N += 1;

		delta = arr[i] - mean;
		delta_n = delta / N;
		delta_n2 = delta_n * delta_n;

		term1 = delta * delta_n * (N - 1);

		M4 += term1 * delta_n2 * (N * N - 3 * N + 3) + 6 * delta_n2 * M2 - 4 * delta_n * M3;
		M3 += term1 * delta_n * (N - 2) - 3 * delta_n * M2;
		M2 += term1;
		mean += delta_n;
	}
	// Calculate the population excess kurtosis:
	g = (N * M4) / (M2 * M2) - 3;
	// Return the corrected sample excess kurtosis:
	return ((N - 1) / ((N - 2) * (N - 3))) * ((N + 1) * g + 6);
} // end FUNCTION kurtosis()

function skewness(arr) {
	if (!Array.isArray(arr)) {
		throw new TypeError("skewness()::invalid input argument. Must provide an array.");
	}
	var len = arr.length,
		delta = 0,
		delta_n = 0,
		term1 = 0,
		N = 0,
		mean = 0,
		M2 = 0,
		M3 = 0,
		g;

	for (var i = 0; i < len; i++) {
		N += 1;

		delta = arr[i] - mean;
		delta_n = delta / N;

		term1 = delta * delta_n * (N - 1);

		M3 += term1 * delta_n * (N - 2) - 3 * delta_n * M2;
		M2 += term1;
		mean += delta_n;
	}
	// Calculate the population skewness:
	g = (Math.sqrt(N) * M3) / Math.pow(M2, 3 / 2);

	// Return the corrected sample skewness:
	return (Math.sqrt(N * (N - 1)) * g) / (N - 2);
} // end FUNCTION skewness()

function numbers(vals) {
	var nums = [];
	if (vals == null) return nums;

	for (var i = 0; i < vals.length; i++) {
		if (isNumber(vals[i])) nums.push(+vals[i]);
	}
	return nums;
}

function nsort(vals) {
	return vals.sort(function numericSort(a, b) {
		return a - b;
	});
}

function sum(vals) {
	vals = numbers(vals);
	var total = 0;
	for (var i = 0; i < vals.length; i++) {
		total += vals[i];
	}
	return total;
}

function mean(vals) {
	vals = numbers(vals);
	if (vals.length === 0) return NaN;
	return sum(vals) / vals.length;
}

function median(vals) {
	vals = numbers(vals);
	if (vals.length === 0) return NaN;

	var half = (vals.length / 2) | 0;

	vals = nsort(vals);
	if (vals.length % 2) {
		// Odd length, true middle element
		return vals[half];
	} else {
		// Even length, average middle two elements
		return (vals[half - 1] + vals[half]) / 2.0;
	}
}

// Returns the mode of a unimodal dataset
// If the dataset is multi-modal, returns a Set containing the modes
function mode(vals) {
	vals = numbers(vals);
	if (vals.length === 0) return NaN;
	var mode = NaN;
	var dist = {};

	for (var i = 0; i < vals.length; i++) {
		var value = vals[i];
		var me = dist[value] || 0;
		me++;
		dist[value] = me;
	}

	var rank = numbers(
		Object.keys(dist).sort(function sortMembers(a, b) {
			return dist[b] - dist[a];
		})
	);
	mode = rank[0];
	if (dist[rank[1]] == dist[mode]) {
		// multi-modal
		if (rank.length == vals.length) {
			// all values are modes
			return vals;
		}
		var modes = new Set([mode]);
		var modeCount = dist[mode];
		for (var i = 1; i < rank.length; i++) {
			if (dist[rank[i]] == modeCount) {
				modes.add(rank[i]);
			} else {
				break;
			}
		}
		return modes;
	}
	return mode;
}

// This helper finds the mean of all the values, then squares the difference
// from the mean for each value and returns the resulting array.  This is the
// core of the varience functions - the difference being dividing by N or N-1.
function valuesMinusMeanSquared(vals) {
	vals = numbers(vals);
	var avg = mean(vals);
	var diffs = [];
	for (var i = 0; i < vals.length; i++) {
		diffs.push(Math.pow(vals[i] - avg, 2));
	}
	return diffs;
}

// Population Variance = average squared deviation from mean
function populationVariance(vals) {
	return mean(valuesMinusMeanSquared(vals));
}

// Sample Variance
function sampleVariance(vals) {
	var diffs = valuesMinusMeanSquared(vals);
	if (diffs.length <= 1) return NaN;

	return sum(diffs) / (diffs.length - 1);
}

// Population Standard Deviation = sqrt of population variance
function populationStdev(vals) {
	return Math.sqrt(populationVariance(vals));
}

// Sample Standard Deviation = sqrt of sample variance
function sampleStdev(vals) {
	return Math.sqrt(sampleVariance(vals));
}

function percentile(vals, ptile) {
	vals = numbers(vals);
	if (vals.length === 0 || ptile == null || ptile < 0) return NaN;

	// Fudge anything over 100 to 1.0
	if (ptile > 1) ptile = 1;
	vals = nsort(vals);
	var i = vals.length * ptile - 0.5;
	if ((i | 0) === i) return vals[i];
	// interpolated percentile -- using Estimation method
	var int_part = i | 0;
	var fract = i - int_part;
	return (1 - fract) * vals[int_part] + fract * vals[Math.min(int_part + 1, vals.length - 1)];
}

function histogram(vals, bins) {
	if (vals == null) {
		return null;
	}
	vals = nsort(numbers(vals));
	if (vals.length === 0) {
		return null;
	}
	if (bins == null) {
		// pick bins by simple method: Math.sqrt(n)
		bins = Math.sqrt(vals.length);
	}
	bins = Math.round(bins);
	if (bins < 1) {
		bins = 1;
	}

	var min = vals[0];
	var max = vals[vals.length - 1];
	if (min === max) {
		// fudge for non-variant data
		min = min - 0.5;
		max = max + 0.5;
	}

	var range = max - min;
	// make the bins slightly larger by expanding the range about 10%
	// this helps with dumb floating point stuff
	var binWidth = (range + range * 0.05) / bins;
	var midpoint = (min + max) / 2;
	// even bin count, midpoint makes an edge
	var leftEdge = midpoint - binWidth * Math.floor(bins / 2);
	if (bins % 2 !== 0) {
		// odd bin count, center middle bin on midpoint
		var leftEdge = midpoint - binWidth / 2 - binWidth * Math.floor(bins / 2);
	}

	var hist = {
		values: Array(bins).fill(0),
		bins: bins,
		binWidth: binWidth,
		binLimits: [leftEdge, leftEdge + binWidth * bins],
	};

	var binIndex = 0;
	for (var i = 0; i < vals.length; i++) {
		while (vals[i] > (binIndex + 1) * binWidth + leftEdge) {
			binIndex++;
		}
		hist.values[binIndex]++;
	}

	return hist;
}
