#!/usr/bin/env node

import { program } from 'commander';
import install from './commands/install/index.js';

export default function createNodeApp() {
  program
    .description('Create a new Node.js project')
    .action(install);

  program.parse(process.argv);
}
