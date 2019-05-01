declare module 'remote-example-api' {

    export const bridgeCommandDisposable: any;
    
    export class RemoteExampleApi {

        public onTimer(callback: (value?: string) => void): Promise<void>;

        public registerEventHandler(eventName: string, callback: (eventName: string, value?: string) => void): Promise<void>;

        public fireEvent(eventName: string, value?: string): Promise<void>;

    }

}
