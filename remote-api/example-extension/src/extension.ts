import * as vscode from 'vscode';
import * as exampleApi from 'remote-example-api';

export async function activate(context: vscode.ExtensionContext) {

    const demoCommand = vscode.commands.registerCommand('api-extension.demo',() => {
        exampleApi.echo('Hello! I will ping you again in 10 seconds.');
        exampleApi.setEchoTimer('Hello Again!', 10000)
    });
    context.subscriptions.push(demoCommand);

}
