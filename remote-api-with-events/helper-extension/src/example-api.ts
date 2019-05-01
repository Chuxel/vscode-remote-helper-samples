
export class ExampleApi {

    // Generic event handlers
    private eventHandlers: any = {};

    // On timer event handler
    private onTimerCallback: (value?: string) => void = () => {};
    private timerCount = 0;

    constructor() {
        // Create a simple timer event for demo purposes
        setInterval(() => {
            this.onTimerCallback(String(++this.timerCount));
        }, 1000);
    }


    // Logic for a single event handler callback
    public async onTimer(callback: (value?: string) => void): Promise<void> {
        this.onTimerCallback = callback;
        return;
    }
    
    // Logic for registering multiple event handler callbacks
    public async registerEventHandler(eventName: string, callback: (eventName: string, value?: string) => void): Promise<void> {
        this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        this.eventHandlers[eventName].push(callback);
        return;
    }
    
    // Logic for firing events
    public async fireEvent(eventName: string, value?: string): Promise<void> {
        this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        this.eventHandlers[eventName].forEach(async (callback: (eventName: string, value?: string) => void) => {
            await callback(eventName, value);
        });
    }    


}

