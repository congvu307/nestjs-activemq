import { Options } from "./options.interface";
export declare class ActiveMQHandler {
    private client;
    private options;
    constructor(options: Options);
    init(): Promise<unknown>;
    sendMessage(messageToPublish: any, queue: string): void;
    subscribe(queue: any, callback: any): void;
    cleanup(): void;
}
