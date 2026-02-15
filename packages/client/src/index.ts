import { wrapAxiosWithPayment, privateKeyToAccount } from 'x402-stacks';
import axios, { AxiosInstance } from 'axios';

export interface WarpAgentConfig {
    privateKey: string;
    network?: 'mainnet' | 'testnet';
}

export class WarpAgent {
    private client: AxiosInstance;

    constructor(config: WarpAgentConfig) {
        const account = privateKeyToAccount(config.privateKey);
        this.client = wrapAxiosWithPayment(axios.create(), account);
    }

    async fetch(url: string, options?: any) {
        const response = await this.client.get(url, options);
        return response.data;
    }
}
