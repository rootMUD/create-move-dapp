/** workflow object containing all the text for the different prompt options */
export const workflowOptions = {
  projectName: {
    type: "text",
    name: "projectName",
    message: "Enter a new project name",
    initial: "my-rootmud-app",
  },
  template: {
    type: "select",
    name: "template",
    message: "Choose how to start",
    choices: [
      {
        title: "Default",
        value: "default",
        description:
          "Default template",
      },
      {
        title: "MoveDID",
        value: "movedid",
        description:
          "MoveDID template",
      },
    ],
    initial: 0,
  },
  packageManager: {
    type: "select",
    name: "packageManager",
    message: "Choose your package manager",
    choices: [
      { title: "yarn", value: "yarn" },
      { title: "pnpm", value: "pnpm" },
    ],
    initial: 0,
  },
};