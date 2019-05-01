# Proxying an existing API - Basic

When building an extension that supports [VS Code Remote Development](https://aka.ms/vscode-remote), you may run into cases where you have code in a [Workspace Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that relies on a local, non-VS Code provided API, module, or runtime. In others you may have a [UI Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that makes use of many local APIs and has a few features that need to interact directly with the workspace files.

You can accommodate some of these scenarios using a [Helper Extension](../helper-extension), but you may have an existing node module that is used in too many places to convert. If you are only using async functions on the module (or these functions return a promise), you can create a **proxy module** that provides a **drop-in replacement** when combined with a **Helper Extension**. This example covers a pattern for doing exactly that.

See the [VS Code Remote Extension Guide](https://aka.ms/vscode-remote/developing-extensions) for more information. You may also find the more advanced [Proxying an Existing APIs Class w/Events](../remote-api-with-events) and/or the less complex [Helper Extension](../helper-extension) samples useful.

## Contents

- `helper-extension` - UI Helper Extension that exposes the `example-api` module via an single, flexible command.
- `remote-example-api` - A drop-in replacement node module that mirrors a primary `example-api`'s function signatures, but uses the Helper Extensions' command to execute them.
- `example-extension` - An example Workspace Extension that uses the `remote-example-api` module as a drop-in replacement for the `example-api` module.

## Running the example

### Install needed tools

1. If this is your first time using a development container, please follow the [getting started steps](https://aka.ms/vscode-remote/containers/getting-started).
  
2. Install [Node.js](https://nodejs.org/en/). This sample was tested with v8.15.0.

3. Install the VS Code Extension CLI: `npm install -g vsce`
  
4. Install [yarn](https://yarnpkg.com/en/).

### Set up the project

1. Open a terminal / command prompt **LOCALLY** and run:
    - macOS / Linux: `./dependencies.sh`
    - Windows: `dependencies.cmd`

2. Restart / reload VS Code if it is currently open.

### Try it out!

1. Check out what happens when running in a container:
    1. Start VS Code and use the **Remote-Containers: Open Folder in Container...** command and select this folder.
    2. Once the you are connected to the container, use **File > Open Workspace...** to open the `*.code-workspace` file (from inside the container).
    3. Start debugging the `example-extension` using the **Run Example Extension** launch configuration (F5).
    4. Ctrl/Cmd+Shift+P and run the **Remote API Example: Demo** command

2. Stop debugging and check out the local scenario to illustrate backwards compatibility:
    1. **File > Open Workspace...**, but this time open the `*.code-workspace` file in this folder LOCALLY.
    2. Start debugging the `example-extension` using the **Run Example Extension** launch configuration (F5).
    3. Ctrl/Cmd+Shift+P and run the **Remote API Example: Demo** command
