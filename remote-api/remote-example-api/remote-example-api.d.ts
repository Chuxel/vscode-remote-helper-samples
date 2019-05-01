declare module 'remote-example-api' {

    export function echo(msg: string): Promise<void>;
 
    export function setEchoTimer(msg: string, delay: number): Promise<void>;

}
