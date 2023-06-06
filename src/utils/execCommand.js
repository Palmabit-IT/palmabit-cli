#!/usr/bin/env node

import { spawn } from "child_process";

export default function execCommand(command) {
  const [first, ...others] = command.split(" ");
  const cmd = spawn(first, [...others]);

  return new Promise((resolve, reject) => {
    cmd.stdout.setEncoding("utf8");
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);

    let output = "";
    cmd.stdout.on("data", (data) => {
      output += data;
    });
    
    cmd.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(`Failed with code ${code}.`);
      }
    });
  });
}
