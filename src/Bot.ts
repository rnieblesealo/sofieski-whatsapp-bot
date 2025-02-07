import { Client } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";

const client = new Client({});

client.once("ready", () => {
	console.log("Client ready");
});

// make login qr
client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

function ProcessString(body: string, tokens: string[] = [" ", "\t", "\n"]) {
	// WARN: this is prob hacky but o well!

	let procBody = body;
	for (const token of tokens) {
		procBody = procBody.split(`${token}`).join("");
	}

	return procBody;
}

function ProcessBody(body: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		// remove tabs and newlines
		const pBody = ProcessString(body, ["\t", "\n"]);

		// is wordle pattern in body?
		const wordleBodyPattern = /[\s\S]+?(Wordle)\ +(\d+,\d+)\ +(\d+)\/6*/gm;
		if (wordleBodyPattern.test(pBody)) {
			// split wordle info, cleaning split tokens of whitespace
			const split = pBody.split(wordleBodyPattern);
			const formalSplit = split.map((item) => {
				return ProcessString(item);
			});

			resolve(formalSplit);
		}

		reject([]);
	});
}

client.on("message_create", async (message) => {
	const contact = await message.getContact();
	const contactName = contact.name ?? "NONE";
	const targetContactName = "Rafael Niebles";

	if (contactName === targetContactName) {
		ProcessBody(message.body)
			.then((result) => {
				console.log("Matched Wordle info, tokens: ", result);
			})
			.catch(() => {
				console.log("Failed to match Wordle info :(");
			});
	}
});

function Test() {
	const input = `
    Wordle 1,328 2/6

    🟩🟨🟨⬜⬜
    🟩🟩🟩🟩🟩
  `;

	ProcessBody(input)
		.then((result) => {
			console.log("Matched Wordle info, tokens: ", result);
		})
		.catch(() => {
			console.log("Failed to match Wordle info :(");
		});
}

Test();
