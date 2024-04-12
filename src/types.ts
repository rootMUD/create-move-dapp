import prompts from "prompts";

// constants.ts

export type Result = prompts.Answers<
  "projectName" | "template" | "packageManager"
>;

export type Template = "movedid";

export type PackageManager = "npm" | "pnpm" | "yarn";

export type Selections = {
  projectName: string;
  template: Template;
  packageManager: PackageManager;
  environment: string;
};