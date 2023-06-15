#!/usr/bin/env node

import inquirer from "inquirer";
import listBuilds from "../../commands/listBuilds/index.js";
import execCommand from "../../../utils/execCommand.js";
import extractFilenameAndExtension from "../../../utils/extractFilenameAndExtension.js";
import downloadBuild from "../../commands/downloadBuild/index.js";
import isValidDirectoryPath from "../../../utils/isValidDirectoryPath.js";
import path from 'path'

export default function downloadDevelopmentBuild() {
  const questions = [
    {
      type: "list",
      name: "device",
      message: "For what device do you want to download the build?",
      choices: ["Android Device/Emulator", "iOS Simulator", "iOS Device"],
    },
    {
      type: "input",
      name: "path",
      message: "Where do you want to download the build?",
      default: "./build",
      validate: (input) => isValidDirectoryPath(input) || "Invalid path",
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    const config = {
      path: path.resolve(answers.path)
    };

    switch (answers.device) {
      case "Android Device/Emulator":
        config.platform = "android";
        config.profile = "development";
        break;
      case "iOS Simulator":
        config.platform = "ios";
        config.profile = "development-simulator";
        break;
      case "iOS Device":
        config.platform = "ios";
        config.profile = "development";
        break;
      default:
        console.log("No platform selected");
        return;
    }

    downloadLatestBuild(config);
  });
}

async function downloadLatestBuild(config) {
  const { platform, profile, path } = config;

  const [latestBuild] = await listBuilds({ platform, profile });

  if (!latestBuild) {
    console.log("No builds found");
    return;
  }

  const { artifacts: { buildUrl } = {} } = latestBuild;

  await downloadBuild({
    buildUrl,
    basePath: `${path}/${config.platform}`,
    filePrefix: "development-",
  });
}
