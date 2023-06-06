#!/usr/bin/env node

import inquirer from "inquirer";
import listBuilds from "../../commands/listBuilds/index.js";
import execCommand from "../../../utils/execCommand.js";
import extractFilenameAndExtension from "../../../utils/extractFilenameAndExtension.js";

export default function installDevelopmentBuild() {
  const questions = [
    {
      type: "list",
      name: "device",
      message: "On what device do you want to install?",
      choices: ["Android Device/Emulator", "iOS Simulator", "iOS Device"],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    switch (answers.device) {
      case "Android Device/Emulator":
        downloadLatestBuild({
          platform: "android",
          profile: "development",
        });
        break;
      case "iOS Simulator":
        downloadLatestBuild({
          platform: "ios",
          profile: "development-simulator",
        });
        break;
      case "iOS Device":
        downloadLatestBuild({
          platform: "ios",
          profile: "development",
        });
        break;
      default:
        console.log("No platform selected");
    }
  });
}

async function downloadLatestBuild(config) {
  const [latestBuild] = await listBuilds(config);

  if (!latestBuild) {
    console.log("No builds found");
    return;
  }

  const { artifacts: { buildUrl } = {} } = latestBuild;

  const { filename, extension } = extractFilenameAndExtension(buildUrl);
  const basePath = `./build/${config.platform}`;
  const downloadPath = `.${basePath}/${filename}${extension}`;

  await execCommand(`curl --create-dirs -o ${downloadPath} -L ${buildUrl}`);

  if (extension === ".gz") {
    await execCommand(`tar -xzvf ${downloadPath} -C ${basePath}`);
    await execCommand(`rm ${downloadPath}`);
  }
}
