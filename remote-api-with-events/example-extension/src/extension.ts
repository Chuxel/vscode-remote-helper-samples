import * as vscode from 'vscode';
import { bridgeCommandDisposable, RemoteExampleApi as ExampleApi } from 'remote-example-api';

export async function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(bridgeCommandDisposable);
    
    const api = new ExampleApi();
    api.onTimer((value?: string) => {
        vscode.window.setStatusBarMessage('Example API Timer: ' + value);
    });

    api.registerEventHandler('echo',(eventName: string, value?: string) => {
        vscode.window.showInformationMessage('Echo: ' + value);
    });

    const demoCommand = vscode.commands.registerCommand('api-with-events-extension.demo',() => {
        api.fireEvent('echo', 'Success!');
    });
    context.subscriptions.push(demoCommand);
}
