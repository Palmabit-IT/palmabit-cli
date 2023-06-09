#!/usr/bin/env node

import fs from 'fs';
import inquirer from 'inquirer';
import execCommand from '../../../utils/execCommand.js';
import { removeTrailingSlash } from '../../../utils/strings.js';

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
        // Leggi il file package.json
        const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));

        // Modifica le proprietà se sono state specificate
        if (name) {
          packageJson.name = name;
        }
        if (description) {
          packageJson.description = description;
        }
        if (author) {
          packageJson.author = author;
        }
        if (license) {
          packageJson.license = license;
        }

        packageJson.version = '0.1.0';
        delete packageJson.repository;

        // Scrivi le modifiche nel file package.json
        fs.writeFileSync(`${path}/package.json`, JSON.stringify(packageJson, null, 2));
      }

      console.log('All done!');
    })
    .catch((error) => {
      console.log('Error', error);
    });
};
