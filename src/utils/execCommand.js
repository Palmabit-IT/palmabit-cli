#!/usr/bin/env node

import { spawn } from 'child_process';

export default function execCommand(command) {
  const [first, ...others] = command.split(' ');
  const cmd = spawn(first, [...others], { stdio: [process.stdin, process.stdout, process.stderr] });

  return new Promise((resolve, reject) => {
    cmd.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Failed with code ${code}.`);
      }
    });
  });
};
