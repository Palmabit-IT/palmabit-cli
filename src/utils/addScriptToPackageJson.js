import fs from 'fs/promises';
import { join } from 'path'

export default async function addScriptToPackageJson(scriptName, command, path) {
  const packageJsonPath = join(path, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath));

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  packageJson.scripts[scriptName] = command;

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`Added script "${scriptName}" to package.json`);
};
