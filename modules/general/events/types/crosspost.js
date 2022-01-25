const Moment = require("moment-timezone");

module.exports = (client) => {
	var time = Moment.tz("Asia/Jakarta").format("HH:mm:ss");
	client.on(`message`, (message) => {
		const { channel } = message;

		if (channel.type === "news") {
			// crosspost automatically
			message.crosspost();
			console.log(`News Published at ${time}`);
		}
	});

	console.log(`Module: msgListener Loaded | Loaded from local modules | Now seeking for haiku and geh content...`);
};
