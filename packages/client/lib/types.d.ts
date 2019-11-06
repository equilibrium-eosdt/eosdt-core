import { JsonRpc } from "eosjs";
export interface Account {
    blockchain: string;
    name: string;
    authority: string;
}
export interface NetworkConfig {
    blockchain: string;
    protocol: string;
    host: string;
    port: number;
    chainId: string;
}
export declare type NetworkPool = NetworkConfig[];
export interface TransactionProviderConfig {
    name: string;
    network: NetworkConfig;
    rpc: JsonRpc;
}
export interface EosApi {
    transact(transaction: any, options?: {
        broadcast?: boolean;
        sign?: boolean;
        blocksBehind?: number;
        expireSeconds?: number;
    }): Promise<any>;
}
export interface TransactionProvider {
    parseTX?: (tx: any) => {
        transaction: string;
        block: number;
    };
    init: () => Promise<void>;
    account: Account | undefined;
    api: EosApi;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
export declare type TransactionProviderConstructor = new (config: TransactionProviderConfig) => TransactionProvider;
