#!/usr/bin/env node

import inquirer from "inquirer";

export default function nodeCommands() {
  const questions = [
    {
      type: "list",
      name: "nextAction",
      message: "What do you want to do?",
      choices: ["Install project"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.nextAction) {
      case "Install project":
        const { default: createNodeApp } = await import("./programs/createNodeApp/index.js");
        createNodeApp();
        break;
      default:
        console.log("No app selected");
    }
  });
}
