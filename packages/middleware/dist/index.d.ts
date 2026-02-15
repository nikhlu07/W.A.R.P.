export interface WarpGateConfig {
    recipient: string;
    price: number | ((req: any) => number);
    network?: 'mainnet' | 'testnet';
    facilitatorUrl?: string;
}
export declare function warpGate(config: WarpGateConfig): (req: any, res: any, next: any) => any;
