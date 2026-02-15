export interface WarpAgentConfig {
    privateKey: string;
    network?: 'mainnet' | 'testnet';
}
export declare class WarpAgent {
    private client;
    constructor(config: WarpAgentConfig);
    fetch(url: string, options?: any): Promise<any>;
}
