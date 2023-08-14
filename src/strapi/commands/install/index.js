#!/usr/bin/env node

import inquirer from 'inquirer';
import execCommand from '../../../utils/execCommand.js';
import { removeTrailingSlash } from '../../../utils/strings.js';
import addScriptToPackageJson from '../../../utils/addScriptToPackageJson.js';
import saveAttributesToPackageJson from '../../../utils/saveAttributesToPackageJson.js';

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'Path where to create the project?',
    default: '.',
  },
  {
    type: 'input',
    name: 'name',
    message: 'App name (eg. my-strapi-app)?',
    default: 'my-strapi-app',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description?',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author?',
    default: 'Palmabit',
  },
];

export default async function install() {
  console.log('Creating a new Strapi project with TypeScript...');

  inquirer.prompt(questions)
    .then(async (answers) => {
      const { name, description, author } = answers;

      // path is relative to the palmabit-cli root directory!
      const path = removeTrailingSlash(answers.path);

      if (name || author || description) {
        // Install Strapi
        await execCommand(`mkdir -p ${path}`);
        await execCommand(`npx create-strapi-app@latest ${path} --quickstart --no-run --typescript`);
        // Copy files from templates
        await execCommand(`cp -r ./src/strapi/templates/. ${path}`);

        const attributes = {
          name,
          description,
          author,
          'lint-staged': {
            "*.{js,jsx,ts,tsx}": [
              "prettier --write",
              "eslint --fix",
              "git add"
            ],
            "*.{html,css,less,ejs,json,md}": [
              "prettier --write",
              "git add"
            ]
          }
        };

        saveAttributesToPackageJson({ path, attributes });

        // Install libraries
        await execCommand(`yarn add --cwd ${path} -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`);
        await execCommand(`yarn add --cwd ${path} -D eslint-plugin-react eslint-config-prettier eslint-plugin-prettier eslint-plugin-import prettier`);
        await execCommand(`yarn add --cwd ${path} -D husky lint-staged`);
        // Install plugins
        await execCommand(`yarn add --cwd ${path} @palmabit/strapi-app-version`);

        // Add scripts to package.json
        await addScriptToPackageJson('lint', "eslint './src/**/*.{js,jsx,ts,tsx}'", path);
        await addScriptToPackageJson('lint:fix', "eslint './src/**/*.{js,jsx,ts,tsx}' --fix", path);
        await addScriptToPackageJson('format', "prettier --write './src/**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc", path);
      }

      console.log('All done!');
      console.log(`Run "yarn run build && yarn run develop" or "npm run build && npm run develop" commands`)
    })
    .catch((error) => {
      console.log('Error', error);
    });
};
