import * as vscode from 'vscode';

export async function echo(msg: string): Promise<void> {
    await vscode.window.showInformationMessage(`Main extension said, "${msg}"`);
}
 
export async function setEchoTimer(msg: string, delay: number): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await echo(msg);
            resolve();
        }, delay);
    });
}
