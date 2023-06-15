#!/usr/bin/env node

import inquirer from "inquirer";

export default function nodeCommands() {
  const questions = [
    {
      type: "list",
      name: "nextAction",
      message: "What do you want to do?",
      choices: ["Install Strapi project"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.nextAction) {
      case "Install Strapi project":
        const { default: createStrapiApp } = await import("./programs/createStrapiApp/index.js");
        createStrapiApp();
        break;
      default:
        console.log("No app selected");
    }
  });
}
