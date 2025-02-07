// TODO: fix test case complaining about this module import; doesnt stop us but would still be great!
import WordleMatch from "../src/WordleMatch";
import { WordleInfo } from "../src/WordleMatch";

const testInputs = [
	`
    Wordle 1,328 2/6

    🟩🟨🟨⬜⬜
    🟩🟩🟩🟩🟩
  `,
	`
    Wordle 12,000 0/6

    🟩🟨🟨⬜⬜
    🟩🟩🟩🟩🟩
  `,
	`
    Wordle 1,000 1/6

    🟩🟩🟩🟩🟩
  `,
	`
    xxxAAAAWordle 1,200 2/6

    ⬜⬜
  `,
	`
    Wordle 1,328 3/6

    🟩🟩🟩🟩🟩
  `,
];

const testOutputs: WordleInfo[] = [
	{
		wordle_number: 1328,
		tries: 2,
		grid: "gyywwggggg",
	},
	{
		wordle_number: 12000,
		tries: 0,
		grid: "gyywwggggg",
	},
	{
		wordle_number: 1000,
		tries: 1,
		grid: "ggggg",
	},
	{
		wordle_number: 1200,
		tries: 2,
		grid: "ww",
	},
	{
		wordle_number: 1328,
		tries: 3,
		grid: "ggggg",
	},
];

describe("WordleMatch function", () => {
	// test each input test case against output
	for (let i = 0; i < testInputs.length; ++i) {
		test(`Input ${testInputs[i]} must produce output ${JSON.stringify(testOutputs[i])}`, async () => {
			return WordleMatch(testInputs[i])
				.then((result) => {
					console.log("Obtained:", result);
					expect(result).toMatchObject(testOutputs[i]);
				})
				.catch((error) => {
					throw new Error(
						`No pattern was matched; this shouldn't happen! Match candidate: ${error}`,
					);
				});
		});
	}
});
