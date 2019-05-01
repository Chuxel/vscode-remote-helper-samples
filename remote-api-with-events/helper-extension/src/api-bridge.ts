import * as vscode from 'vscode';
import * as uuid from 'uuid/v4';

export class ApiBridge {

    // Map to keep track of different objects that were created
    private apiInstances: any = {};

    // Name of the API to bridge. API Event Bridge should use the same name.
    private apiName: string = '';

    // Function to use to create new API objects
    private apiFactoryFn: (() => any) = () => {};

    // Allows extension authors to pass the disposable to context.subscriptions on activation
    public bridgeCommandDisposable: vscode.Disposable;

    // Constructor expects the name of the API and a function that can create new instances of the API
    constructor(apiName: string, apiFactoryFunction: () => any) {
        // Store the factory function and API name
        this.apiFactoryFn = apiFactoryFunction;
        this.apiName = apiName;

        // Init the API bridge
        this.bridgeCommandDisposable = vscode.commands.registerCommand(
            `_remote-api.${this.apiName}.apiBridge`, 
            (...args: any[]) => {
            
            // The first argument is always the name of the function to call
            const fnName = args[0];
    
            // In the API remote proxy class, any function that includes a callback function will call the
            // ApiBridge's "bridgeEventHandler" function to wire in the appropriate callback on the other side.
            // A callback identifier is passed into this command so when the event fires, the ApiEventBridge
            // knows which callback function should be invoked on the other side.
            if (fnName === 'bridgeEventHandler') {
                // Typically there should only be one module instance interacting with the API, but
                // given there are two extension hosts (local and remote), use of the API from multiple
                // extensions could result in multiple module instances. A module identifier handles
                // this situation.
                const remoteModuleId = args[1];
                // Instance identifier of the object
                const instanceId = args[2];
                // Name of the actual registration function on the API object itself.
                const registerEventFnName = args[3];
                // Identifier the ApiEventBridge uses to trigger the correct function
                const callbackId = args[4];
                
                return this.bridgeEventHandler(
                    remoteModuleId, 
                    instanceId, 
                    registerEventFnName, 
                    callbackId, 
                    ...Array.prototype.slice.call(args,5));
            } 
    
            // If not an event function, get the instance of the object and call the specified function
            const instanceId = args[1];
            const api = this.getApiInstance(instanceId);
            return api[fnName](...Array.prototype.slice.call(args,2));
        });
    }

    // Method to generate bridged RemoteApi instances
    public getApiInstance(instanceId?: string) {
        if(instanceId) {
            // Create a new object for this instance Id if one doesn't already exist
            return this.apiInstances[instanceId] = this.apiInstances[instanceId] || this.apiFactoryFn();
        }
        // Otherwise generate instanceId and return new object.
        instanceId = uuid();
        return this.apiInstances[<string>instanceId] = this.apiFactoryFn();
    }
    
    // API bridge implementation
    private  bridgeEventHandler(remoteModuleId: string, 
        instanceId: string, 
        registerEventFnName: string, 
        callbackId: string, 
        ...args: any[]) {
        
        const api = this.getApiInstance(instanceId);
        
        // Call the API event registration function and pass in a stub callback
        // that instead executes a command on the event bridge and passes in a callback
        // identifier along with any remaining arguments.
        return api[registerEventFnName](...args, (...args: any[]) => {
            
            return vscode.commands.executeCommand(
                `_remote-api.${this.apiName}.eventBridge.${remoteModuleId}`, 
                callbackId, 
                ...args);
        });
    }    
}





