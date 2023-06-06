#!/usr/bin/env node

import inquirer from "inquirer";

export default function createNodeApp() {
  const questions = [
    {
      type: "list",
      name: "appToInstall",
      message: "What do you want to install?",
      choices: ["Node.js + Typescript + Express"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.appToInstall) {
      case "Node.js + Typescript + Express":
        const { default: install } = await import(
          "../../commands/install/index.js"
        );
        install();
        break;
      default:
        console.log("No app selected");
    }
  });
}
