const { MessageEmbed } = require("discord.js");
const { Command } = require("../../../../handler");
const { prefix } = require("../../../../config");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = class extends Command {
	constructor() {
		super("ytdl", {
			aliases: ["No alias is set for this command"],
			categories: "tool",
			info: "Get download links of mp3/mp4 files of a yt link via [yt-download.org](https://www.yt2mp3.ws/developers/)",
			usage: `${prefix}command/alias <video link>`,
			guildOnly: false,
		});
	}

	async run(message, args) {
		if (!args[0]) {
			return message.channel.send("Error! Please provide a valid youtube video URL.");
		}

		var normalID = args.join(" ").match(/v=([a-zA-Z0-9\_\-]+)&?/gi);
		var embedID = args.join(" ").match(/embed\/([a-zA-Z0-9\_\-]+)&?/gi);
		var shareID = args.join(" ").match(/.be\/([a-zA-Z0-9\_\-]+)&?/gi);

		var theID;
		if (normalID !== null) {
			theID = normalID[0].replace(/v=/, "");
		}

		if (embedID !== null) {
			theID = embedID[0].replace(/embed\//, "");
		}

		if (shareID !== null) {
			theID = shareID[0].replace(/\.be\//, "");
		}

		if (!theID) {
			return message.channel.send("Error! Please provide a valid youtube video URL.");
		}

		const msg = await message.channel.send(`Please wait... Video ID: \`${theID.replace(/&/, "")}\``);

		// let link = `https://www.yt-download.org/api/widget/mp3/${theID.replace(/&/, "")}`; // MP3
		// let link2 = `https://www.yt-download.org/api/widget/videos/${theID.replace(/&/, "")}` // MP4
		// let link3 = `https://www.yt-download.org/api/widget/merged/${theID.replace(/&/, "")}` // Webm/MKV

		let link = `https://www.yt-download.org/file/mp3/${theID.replace(/&/, "")}`; // MP3
		let link2 = `https://www.yt-download.org/file/mp4/${theID.replace(/&/, "")}`; // MP4
		let link3 = `https://www.yt-download.org/file/merged/${theID.replace(/&/, "")}`; // Webm/MKV

		msg.edit(`**Loading Finished**`);
		msg.delete({
			timeout: 5000,
		});

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
			.setTitle(`Link Info`)
			.setDescription(`**Video ID:** \`${theID.replace(/&/, "")}\`\n**Original Link:**\n${args.join(" ")}`)
			.addField(`Link to Downloads`, `[Get MP3 Links](${link}) | [Get MP4 Links](${link2}) | [Get WEBM/MKV Links](${link3})`, false)
			.setFooter(`Via yt-download.org`)
			.setColor("FF0000")
			.setTimestamp();

		return message.channel.send(embed);

		/* Its impossible to get the direct link because it turns out the site is ip oriented
        //Fetching the HTML using axios
        const dataMp3 = await axios.get(link);
        const dataMP4 = await axios.get(link2);
        const dataMKV = await axios.get(link3);

        //Using cheerio to load the HTML fetched
        axios.all([dataMp3, dataMP4, dataMKV]).then(axios.spread(async (...responses) => {
            // const responseOne = responses[0]
            // const responseTwo = responses[1]
            // const responesThree = responses[2]

            // console.log(responses[0])
            let loaded = [];
            for (var i = 0; i < 3; i++){
                loaded.push(await cheerio.load(responses[i].data))
            }
    
            // Match the link only but still with href
            var hrefLink = loaded[0].html().match(/href=(["'])(.*?)\1/g);
    
            // console.log(hrefLink)
            if(hrefLink[1] == null) {
                msg.delete();
                message.channel.send("Error! Please provide a valid youtube url.");
                return;
            }

            // Now matches only the link
            var linkOnly = hrefLink.join("").match(/"[^"]*"/gus);
    
            // All the MP3 links
            // The 0 is the stylesheet href
            // console.log(linkOnly)
            // var mp3_320KBPS = linkOnly[1].replace(/\"/g, "");
            // var mp3_256KBPS = linkOnly[2].replace(/\"/g, "");
            // var mp3_192KBPS = linkOnly[3].replace(/\"/g, "");
            // var mp3_128KBPS = linkOnly[4].replace(/\"/g, "");

            var mp3_320KBPS = linkOnly[3].replace(/\"/g, "");
            var mp3_256KBPS = linkOnly[4].replace(/\"/g, "");
            var mp3_192KBPS = linkOnly[5].replace(/\"/g, "");
            var mp3_128KBPS = linkOnly[6].replace(/\"/g, "");
    
            // Mp4
            var mp4Href = loaded[1].html().match(/href=(["'])(.*?)\1/g);
            var Mp4linkOnly = mp4Href.join("").match(/"[^"]*"/gus);
            // console.log(Mp4linkOnly);
            var onlyMp4 = Mp4linkOnly[3].replace(/\"/g, "");
    
            // Mkv
            var mkvHref = loaded[2].html().match(/href=(["'])(.*?)\1/g);
            var mvk_WebmLinkOnly = mkvHref.join("").match(/"[^"]*"/gus);
            // console.log(mvk_WebmLinkOnly);

            msg.edit(`**Loading Finished**`);
            msg.delete({
                timeout: 5000
            });
    
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTitle(`Link Info`)
                .setDescription(`**Video ID:** \`${theID.replace(/&/, "")}\`\n**Original Link:**\n${args.join(" ")}`)
                .addField(`MP3`, `[320 Kbps](${mp3_320KBPS}) | [256Kbps](${mp3_256KBPS}) | [192Kbps](${mp3_192KBPS}) | [128Kbps](${mp3_128KBPS}) | [More Options](${link})`, false)
                .addField(`MP4`, `[Quality 1](${onlyMp4}) | [More Options](${link2})`, false)
                .addField(`Webm/Mkv`, `[Quality 1](${mvk_WebmLinkOnly[3].replace(/\"/g, "")}) | [Quality 2](${mvk_WebmLinkOnly[4].replace(/\"/g, "")}) | [Quality 3](${mvk_WebmLinkOnly[5].replace(/\"/g, "")}) | [Quality 4](${mvk_WebmLinkOnly[6].replace(/\"/g, "")}) | [More Options](${link3})`, false)
                .addField(`Notes`, `1. You can click more options to check the quality details of the video\n2. If token invalid, you can just click more options too, to download it directly from the website`)
                .setFooter(`Via yt-download.org • Direct Download Link`)
                .setColor('FF0000')
                .setTimestamp();
                
            return message.channel.send(embed);
        }));*/
	}
};
