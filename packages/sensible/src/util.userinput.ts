import readline from "readline";

const argumentsWithoutFlags = process.argv.filter((a) => !a.startsWith("--"));

export const ask = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  return new Promise((resolve) => {
    rl.question(question, (input) => {
      resolve(input);
      rl.close();
    });
  });
};

export const getArgumentOrAsk = async (
  argumentPosition: number,
  question: string,
  isNonInteractive?: boolean
): Promise<string> => {
  let argument = argumentsWithoutFlags[argumentPosition + 1];
  if (argument && argument.length > 0) return argument;

  if (isNonInteractive) {
    return "";
  }

  return ask(question);
};

export const askOk = async (question: string): Promise<boolean> => {
  const answer = await ask(question);
  return ["yes", "y", ""].includes(answer);
};
