import * as vscode from 'vscode';
import { ApiEventBridge } from './api-event-bridge';
import * as uuid from 'uuid/v4';

// Create a bridge for the ExampleApi class
const apiEventBridge = new ApiEventBridge('ExampleApi');

// Allows extension authors to pass the disposable to context.subscriptions on activation
export const bridgeCommandDisposable = apiEventBridge.bridgeCommandDisposable;

export class RemoteExampleApi {

    // Used to uniquely identify this object
    private instanceId = uuid();

    // Use the event bridge to wire in an onTimer event handler
    public async onTimer(callback: (value?: string) => void): Promise<void> {
        return apiEventBridge.bridgeEventHandler('onTimer', this.instanceId, callback);
    }

    // Use the event bridge to wire in custom event handlers
    public async registerEventHandler(eventName: string, callback: (eventName: string, value?: string) => void): Promise<void> {
        return apiEventBridge.bridgeEventHandler('registerEventHandler', this.instanceId, callback, eventName);
    }
    
    // All other methods pass across a moduleId and instanceId along with their normal parameters.
    // This particular function fires custom events.
    public async fireEvent(eventName: string, value?: string): Promise<void> {
        return apiEventBridge.callRemoteFunction('fireEvent', this.instanceId, eventName, value);
    }
}

