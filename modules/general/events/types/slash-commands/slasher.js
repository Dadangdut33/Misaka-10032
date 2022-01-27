const { prefix } = require("../../../../../config");

module.exports = (client) => {
	client.ws.on("INTERACTION_CREATE", async (interaction) => {
		const command = interaction.data.name.toLowerCase();
		const args = interaction.data.options;

		if (command == "prefix") {
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: `Bot prefix is \`${prefix}\``,
					},
				},
			});
		}
	});

	console.log("Module: Slash Commands Module Loaded");
};
