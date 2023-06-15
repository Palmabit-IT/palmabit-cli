#!/usr/bin/env node

import inquirer from "inquirer";

export default function createStrapiApp() {
  const questions = [
    {
      type: "list",
      name: "appToInstall",
      message: "What do you want to install?",
      choices: ["Strapi + Typescript"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.appToInstall) {
      case "Strapi + Typescript":
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
