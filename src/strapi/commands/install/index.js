#!/usr/bin/env node

import inquirer from 'inquirer';
import execCommand from '../../../utils/execCommand.js';
import saveAttributesToPackageJson from '../../../utils/saveAttributesToPackageJson.js';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'App name (eg. my-strapi-app)?',
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
  {
    type: 'input',
    name: 'license',
    message: 'License?',
    default: 'MIT',
  },
];

export default async function install() {
  console.log('Creating a new Strapi project with TypeScript...');

  inquirer.prompt(questions)
    .then(async (answers) => {
      const { name, description, author, license } = answers;

      if (name || author || description || license) {
        await execCommand(`npx create-strapi-app@latest ${name} --quickstart --typescript`);
        await execCommand('npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev');
        await execCommand('npm install eslint-plugin-react eslint-config-prettier eslint-plugin-prettier eslint-plugin-import prettier --save-dev');
        await execCommand('npm install husky lint-staged --save-dev');

        saveAttributesToPackageJson({ name, description, author, license });
      }

      console.log('All done!');
    })
    .catch((error) => {
      console.log('Error', error);
    });
};
