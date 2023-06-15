#!/usr/bin/env node

import inquirer from 'inquirer';
import execCommand from '../../../utils/execCommand.js';
import { removeTrailingSlash } from '../../../utils/strings.js';
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
    message: 'App name?',
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
  {
    type: 'list',
    name: 'eslint',
    message: 'Eslint, Rome or none?',
    choices: ['Eslint', 'Rome', 'none'],
  },
];

function getBranchFromEslintAnswer(answer) {
  switch (answer) {
    case 'Eslint':
      return 'eslint';
    case 'Rome':
      return 'rome';
    default:
      return 'master';
  }
}

export default async function install() {
  console.log('Creating a new Node.js project with TypeScript...');
  
  inquirer.prompt(questions)
    .then(async (answers) => {
      const path = removeTrailingSlash(answers.path);
      const branch = getBranchFromEslintAnswer(answers.eslint);
      
      await execCommand(`git clone git@github.com:drubetti/TypeScript-Babel-Express-Starter.git ${path} -b ${branch}`);
      console.log('Project created successfully!');

      const { name, description, author, license } = answers;

      if (name || author || description || license) {
        saveAttributesToPackageJson({ path, name, description, author, license });
      }

      console.log('All done!');
    })
    .catch((error) => {
      console.log('Error', error);
    });
};
