// TODO: fix test case complaining about this module import; doesnt stop us but would still be great!
import WordleMatch from "../src/WordleMatch";

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

const testOutputs = [
  ["", "Wordle", "1,328", "2", "🟩🟨🟨⬜⬜🟩🟩🟩🟩🟩"],
  ["", "Wordle", "12,000", "0", "🟩🟨🟨⬜⬜🟩🟩🟩🟩🟩"],
  ["", "Wordle", "1,000", "1", "🟩🟩🟩🟩🟩"],
  ["", "Wordle", "1,200", "2", "⬜⬜"],
  ["", "Wordle", "1,328", "3", "🟩🟩🟩🟩🟩"],
];

describe("WordleMatch function", () => {
  // test each input test case against output
  for (let i = 0; i < testInputs.length; ++i) {
    test(`Input ${testInputs[i]} must match output ${testOutputs[i]}`, async () => {
      return WordleMatch(testInputs[i])
        .then((result) => {
          expect(result).toEqual(testOutputs[i]);
        })
        .catch((error) => {
          throw new Error(
            `No pattern was matched; this shouldn't happen! Match candidate: ${error}`,
          );
        });
    });
  }
});
