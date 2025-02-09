import { Client } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import WordleMatch from "./WordleMatch";
import Insert from "./SupabaseHandler";

const client = new Client({});

client.once("ready", () => {
	console.log("Client ready");
});

// make login qr
client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("message_create", async (message) => {
	const contact = await message.getContact();
	const contactName = contact.name ?? "NONE";
	const targetContactName = "sofieski";

	if (contactName === targetContactName) {
		WordleMatch(message.body)
			.then((result) => {
				console.log("Successfully matched Wordle info from body: ", result);
				Insert(result);
			})
			.catch((failedInput) => {
				console.log(
					"Failed to match Wordle info, will not upload. Match candidate: ",
					failedInput,
				);
			});
	}
});

client.initialize();
