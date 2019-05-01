import * as vscode from 'vscode';
import * as uuid from 'uuid/v4';

// Typically there should only be one module instance interacting with the API, but
// given there are two extension hosts (local and remote), use of the API from multiple
// extensions could result in multiple module instances. So, we'll pass along a moduleId.
const moduleId: string = uuid();

export class ApiEventBridge {

    // Map to persist any event handlers that are registered by callbackId
    private eventHandlers: any = {};

    // Name of the API to bridge - should match what is passed to APIBridge
    private apiName: string;

    // Allows extension authors to pass the disposable to context.subscriptions on activation
    public bridgeCommandDisposable: vscode.Disposable;

    // Initializes the callback bridge which invokes the correct event handler callback
    constructor(remoteApiName: string) {
        this.apiName = remoteApiName;

        // Register the event bridge for this module instance. The bridge expects a 
        // callback identifier that tells it which event handler callback function
        // to execute. The ApiBridge passes this identifier to this command when the
        // actual API fires the event. 
        this.bridgeCommandDisposable = vscode.commands.registerCommand(
            `_remote-api.${this.apiName}.eventBridge.${moduleId}`,
            (callbackId: string, ...args: any[]): void => {
                this.eventHandlers[callbackId](...args);
            });
    }

    // Function to bridge callbacks by generating a callbackId associated with the 
    // callback function and registering it with the apiBridge. It supports multiple 
    // event function names with a variable number of arguments. An instance identifier 
    // is used to let the API bridge know which object it the event handler should  
    // be tied to in the Helper Extension.
    public async bridgeEventHandler(
        registerEventFnName: string, 
        instanceId: string, 
        callback: (...args: any[]) => void, ...args: any[]): Promise<void> {
            
            const callbackId = uuid();
            
            this.eventHandlers[callbackId] = callback;
            
            return vscode.commands.executeCommand(
                `_remote-api.${this.apiName}.apiBridge`, 
                'bridgeEventHandler', 
                moduleId, 
                instanceId, 
                registerEventFnName, 
                callbackId, 
                ...args);
    }

    // Convenience function execute other types of commands on the ApiBridge
    public async callRemoteFunction(
        fnName: string, 
        instanceId: string, 
        ...args: any[]): Promise<any> {
        
            return vscode.commands.executeCommand(
                `_remote-api.${this.apiName}.apiBridge`, 
                fnName, 
                instanceId, 
                ...args);
    }
}
