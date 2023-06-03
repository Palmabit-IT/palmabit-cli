import inquirer from 'inquirer';

const questions = [
  {
    type: 'list',
    name: 'appToInstall',
    message: 'What do you want to install?',
    choices: ['Node.js + Typescript + Express'],
  },
];

inquirer.prompt(questions).then(async (answers) => {
  switch (answers.appToInstall) {
    case 'Node.js + Typescript + Express':
      const { default: createNodeApp } = await import('./node/index.js');
      createNodeApp();
      break;
    default:
      console.log('No app selected');
  }
});
