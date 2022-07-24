#! /usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";

let playerName;

// async function
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who wants to be a millionaire");
  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgBlue("How to play?")}
    I'm a process that runs on your computer
    If you guess wrong I get ${chalk.red("KILLED")}
    So you better ace the quiz, and keep me alive
  `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What's your name?",
    default() {
      return "Player";
    },
  });

  playerName = answer.player_name;
}

await welcome();
await askName();
await question1();
await winner();

async function question1() {
  const answers = await inquirer.prompt({
    name: "querstion_1",
    type: "list",
    message: "JavaScript was created in 10days then release  on\n",
    choices: [
      "May 23rd, 1995",
      "May 23rd, 1996",
      "May 23rd, 1997",
      "May 23rd, 1998",
    ],
  });
  return handleAnswer(answers.querstion_1 == "May 23rd, 1995");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's the right answer.`,
    });
  } else {
    spinner.error({ text: ` Game over, you suck at this!!` });
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `Congrats! ${playerName}, you won \n $1,000,000`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// Share it with npx
// add "bin":"./index.js" in package .json
// run npm login for this you'll have to have a npm account npm account
// type username
// run npm publish to spit out your useless module
