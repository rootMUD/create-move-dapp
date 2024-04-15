#!/usr/bin/env node

import { startWorkflow } from "./src/workflow.js";
import { generateDapp } from "./src/generateDapp.js";

console.log("Welcome to the create-apt-app wizard 🔮");

async function main() {
  const selection = await startWorkflow();
  generateDapp(selection);
}

main().catch((e) => {
  console.error(e);
});