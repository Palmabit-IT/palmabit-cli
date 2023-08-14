#!/usr/bin/env node

import { program } from "commander";
import nodeCommands from "./node/index.js";
import expoCommands from "./expo/index.js";
import strapiCommands from "./strapi/index.js";

program.name("palmabit-cli").description("A palmabit cli").version("0.0.1");

program.command("expo").description("Expo tools and utilities").action(expoCommands);
program.command("node").description("Node tools and utilities").action(nodeCommands);
program.command("strapi").description("Strapi tools and utilities").action(strapiCommands);

program.parse(process.argv);
