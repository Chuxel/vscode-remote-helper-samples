import * as vscode from 'vscode';

// Use identical signature to echo in the original example-api module
export async function echo(msg: string): Promise<void> {
    // Then just execute the private "call" command on the Helper Extension
    await vscode.commands.executeCommand('_remote-api.call','echo', msg);
 }
 
// The same thing again, but this time for a different function with more arguments
export async function setEchoTimer(msg: string, delay: number): Promise<void> {
    await vscode.commands.executeCommand('_remote-api.call','setEchoTimer', msg, delay);
}