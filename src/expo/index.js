#!/usr/bin/env node

import inquirer from "inquirer";
import downloadDevelopmentBuild from "./programs/downloadDevelopmentBuild/index.js";

export default function expoCommands() {
  const questions = [
    {
      type: "list",
      name: "nextAction",
      message: "What do you want to do?",
      choices: ["Download development build"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.nextAction) {
      case "Download development build":
        downloadDevelopmentBuild();
        break;
      default:
        console.log("No app selected");
    }
  });
}
