# Proxying an existing API - API Class w/Events

When building an extension that supports [VS Code Remote Development](https://aka.ms/vscode-remote), you may run into cases where you have code in a [Workspace Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that relies on a local, non-VS Code provided API, module, or runtime. In others you may have a [UI Extension](https://aka.ms/vscode-remote/developing-extensions/architecture) that makes use of many local APIs and has a few features that need to interact directly with the workspace files.

You can accommodate some of these scenarios using a [Helper Extension](../helper-extension), but you may have an existing node module that is used in too many places to convert. If you are only using async functions on the module (or these functions return a promise), you can create a **proxy module** that provides a **drop-in replacement** when combined with a **Helper Extension**. A more difficult situation arises if you need run an API in a UI / Workspace extension that has an event that needs to be handled on the other side. These bi-directional APIs often also use objects instead of straight modules which further complicates things. To resolve these challenges, you can use a pattern that establishes an **API Bridge** command on in a Helper Extension and an **Event Bridge** in your main extension that handles the execution of event callbacks.

This example covers a pattern for doing exactly that.

See the [VS Code Remote Development Extension Guide](https://aka.ms/vscode-remote/developing-extensions) for more information. You may also find the [Proxying a Existing Basic API](../remote-api) and/or the [Helper Extension](../helper-extension) sampes useful.

## Contents

- `helper-extension` - UI Helper Extension that exposes the `ExampleApi` class via an `ApiBridge` - complete with support for remote event handlers.
- `remote-example-api` - A drop-in replacement node module with a `RemoteExampleApi` class that mirrors `ExampleApi`'s function signatures and uses an `ApiEventBridge` in the module to bridge event callbacks fired by the Helper Extension.
- `example-extension` - An example Workspace Extension that uses the `RemoteExampleApi` class as a drop-in replacement for  `ExampleApi`.

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
    5. Note the echo tost and a status bar item that steadily increases time. The time update is triggered by an event from the helper extension.

2. Stop debugging and check out the local scenario to illustrate backwards compatibility:
    1. **File > Open Workspace...**, but this time open the `*.code-workspace` file in this folder LOCALLY.
    2. Start debugging the `example-extension` using the **Run Example Extension** launch configuration (F5).
    3. Ctrl/Cmd+Shift+P and run the **Remote API Example: Demo** command
    4. Note the echo tost and a status bar item that steadily increases time. The time update is triggered by an event from the helper extension.
