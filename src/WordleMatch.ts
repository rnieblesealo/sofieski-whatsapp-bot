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

export default function WordleMatch(body: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // remove tabs and newlines
    const pBody = ProcessString(body, ["\t", "\n"]);

    console.log("Cleaned body: ", pBody);

    // is wordle pattern in body?
    const wordleBodyPattern = /[\s\S]+?(Wordle)\ +(\d+,\d+)\ +(\d+)\/6*/gm;
    if (wordleBodyPattern.test(pBody)) {
      // split wordle info, cleaning split tokens of whitespace
      const split = pBody.split(wordleBodyPattern);
      const formalSplit = split.map((item) => {
        return ProcessString(item);
      });

      console.log("Matched wordle info: ", formalSplit);

      resolve(formalSplit);
    }

    reject(pBody);
  });
}
