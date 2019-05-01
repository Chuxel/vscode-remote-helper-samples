import * as vscode from 'vscode';
import { ApiBridge } from './api-bridge';
import { ExampleApi } from './example-api';

export async function activate(context: vscode.ExtensionContext) {

    // For the most part, the ApiBridge object itself doesn't need to be used, 
    // once it is created. However, it is a good idea to add the ApiBridge's
    // command disposable into context.subscriptions so it can be cleaned up.
    const remoteApiBridge = new ApiBridge(ExampleApi.name, () => new ExampleApi());
    context.subscriptions.push(remoteApiBridge.bridgeCommandDisposable);
}
