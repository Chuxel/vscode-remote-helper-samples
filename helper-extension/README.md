# Basic Helper Extension

When building an extension that supports [VS Code Remote Development](https://aka.ms/vscode-remote), you may run into cases where you have code in a [Workspace Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that relies on a local, non-VS Code provided API, module, or runtime. In others you may have a [UI Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that makes use of many local APIs and has a few features that need to interact directly with the workspace files. To get this kind of "split" functionality working, you can create a "Helper" Extension that encapsulates the needed functionality and exposes a set of private VS Code commands. Your primary main Workspace or UI Extension can then execute these commands and VS Code will automatically handle routing them to wherever your Helper extension happens to be running. This example illustrates a basic version of this pattern.

See the [VS Code Remote Extension Guide](https://aka.ms/vscode-remote/developing-extensions) for more information. You may also find the [Proxying a Existing Basic API](../remote-api) and/or the advanced [Proxying an Existing APIs Class w/Events](../remote-api-with-events) samples useful.

## Contents

- `helper-extension` - UI Helper Extension that exposes an "echo" command.
- `main-extension` - Main Workspace Extension that uses the "echo" command.

## Running the example

### Install needed tools

1. If this is your first time using a development container, please follow the [getting started steps](https://aka.ms/vscode-remote/containers/getting-started).
  
2. Install [Node.js](https://nodejs.org/en/). This sample was tested with v8.15.0.

3. Install the VS Code Extension CLI: `npm install -g vsce`
  
4. Install [yarn](https://yarnpkg.com/en/)

### Set up the project

1. Open a terminal / command prompt **LOCALLY** and run:
    - macOS / Linux: `./dependencies.sh`
    - Windows: `dependencies.cmd`

2. Restart / reload VS Code if it is currently open.

### Try it out!

1. Check out what happens when running in a container:
    1. Start VS Code and use the **Remote-Containers: Open Folder in Container...** command and select this folder.
    2. Once the you are connected to the container, use **File > Open Workspace...** to open the `*.code-workspace` file (from inside the container).
    3. Start debugging the `main-extension` using the **Run Main Extension** launch configuration (F5).
    4. Ctrl/Cmd+Shift+P and run the **Main Extension: Echo** command

2. Stop debugging and check out the local scenario to illustrate backwards compatibility:
    1. **File > Open Workspace...**, but this time open the `*.code-workspace` file in this folder LOCALLY.
    2. Start debugging the `main-extension` using the **Run Main Extension** launch configuration (F5).
    3. Ctrl/Cmd+Shift+P and run the **Main Extension: Echo** command