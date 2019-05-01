import * as vscode from 'vscode';
import * as exampleApi from './example-api';

export async function activate(context: vscode.ExtensionContext) {
    // First arg is API function name, all of the function's expected arguments then follow it.
    const callCommand = vscode.commands.registerCommand('_remote-api.call', (...args: any[]) => {
            const fnName = args[0];
            const fnArgs = Array.prototype.slice.call(args, 1);

            // Call the remoteApi function by name
            return (<any>exampleApi)[fnName](...fnArgs);
        }
    );
    context.subscriptions.push(callCommand);
}