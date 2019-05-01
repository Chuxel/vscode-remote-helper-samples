import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    // Register the private echo command
    const echoCommand = vscode.commands.registerCommand('_helper-extension.echo',
        (msg: string) => {
            vscode.window.showInformationMessage(`Main extension said, "${msg}"`);
        }
    );
    context.subscriptions.push(echoCommand);
}