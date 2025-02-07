export function ProcessString(
	body: string,
	tokens: string[] = [" ", "\t", "\n"],
) {
	let procBody = body;
	for (const token of tokens) {
		procBody = procBody.split(`${token}`).join("");
	}

	return procBody;
}

export interface WordleInfo {
	wordle_number: number;
	tries: number;
	grid: string;
}

export default function WordleMatch(body: string): Promise<WordleInfo> {
	return new Promise((resolve, reject) => {
		// remove tabs and newlines
		const pBody = ProcessString(body, ["\t", "\n"]);

		console.log("Cleaned body: ", pBody);

		// is wordle pattern in body?
		const wordleBodyPattern = /[\s\S]+?(Wordle)\ +(\d+,\d+)\ +(\d+)\/6*/gm;
		if (wordleBodyPattern.test(pBody)) {
			// split wordle info, cleaning split tokens of whitespace
			const split = pBody.split(wordleBodyPattern);
			const formalSplit: string[] = split.map((item) => {
				return ProcessString(item);
			});

			console.log("Matched wordle info: ", formalSplit);
			// Example: ["", "Wordle", "1,328", "2", "🟩🟨🟨⬜⬜🟩🟩🟩🟩🟩"]

			const [prefix, wordleLiteral, number, tries, grid] = formalSplit;

			// use junk values so typescript doesnt complain
			void prefix;
			void wordleLiteral;

			const info: WordleInfo = {
				wordle_number: Number.parseInt(number.replace(/,/g, "")), // need to manually remove commas before parsing int
				tries: Number.parseInt(tries),
				grid: grid,
			};

			resolve(info);
		}

		reject(pBody);
	});
}
