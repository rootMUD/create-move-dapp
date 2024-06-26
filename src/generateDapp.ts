import { green, bold } from "kolorist";
import path from "path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

import { Selections } from "./types.js";
import { copy, runCommand } from "./helpers.js";

export const generateDapp = async (selection: Selections) => {
  const projectName = selection.projectName || "my-rootmud-dapp";

  // internal template directory path
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../templates",
    selection.template
  );
  // internal template directory files
  const files = fs.readdirSync(templateDir);

  // current working directory
  const cwd = process.cwd();

  // target directory - current directory + chosen project name
  const targetDirectory = path.join(cwd, projectName);

  // make target directory if not exist
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
  }

  // write to file
  const write = (file: string, content?: string) => {
    // file to copy to target directory
    const targetPath = path.join(targetDirectory, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  // loop over template files and write to target directory
  // TODO - why does it include .DS_Store?
  for (const file of files.filter((f) => f !== ".DS_Store")) {
    write(file);
  }

  // cd into target directory
  process.chdir(targetDirectory);

  // generate root package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );
  // set package name to chosen project name
  pkg.name = projectName;

  // add npm scripts
  pkg.scripts["start"] = `${selection.packageManager} run dev`;

  write("package.json", JSON.stringify(pkg, null, 2) + "\n");

  // copy .env
  copy('.env.local', '.env');

  // install dependencies
  const installRootDepsCommand = `${selection.packageManager} install`;
  runCommand(installRootDepsCommand);

  console.log(
    green("Installing dependencies, might take a couple of minutes...")
  );

  // Log next steps
  console.log(
    bold(`\nSuccess! You're ready to start building your ${projectName} dapp.`)
  );

  console.log(bold("\nNext steps:") + "\n");
  console.log(
    green(`1. run [cd ${projectName}] to your dapp directory.`) + "\n"
  );
  console.log(
    green(`2. run [${selection.packageManager} start] to run your dapp.`) + "\n"
  );
};