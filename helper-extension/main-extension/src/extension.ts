import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Execute the helper extension echo command
    const echoCommand = vscode.commands.registerCommand('main-extension.echo', () => {
        vscode.commands.executeCommand('_helper-extension.echo', 'Hello!');
    });
    context.subscriptions.push(echoCommand);
}