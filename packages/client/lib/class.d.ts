import { JsonRpc } from "eosjs";
import { Account, NetworkPool, TransactionProviderConstructor } from "./types";
interface Config {
    name: string;
    networks: NetworkPool;
}
export default class Client {
    private Provider;
    private provider;
    private name;
    private networks;
    private pool;
    private poolIndex;
    private initCount;
    private updateHandler?;
    constructor(config: Config);
    private readonly id;
    private readonly network;
    onUpdate: (id: string) => void;
    readonly poolLength: number;
    readonly account: Account | undefined;
    readonly api: {
        transact: (transaction: any, options?: {
            broadcast?: boolean | undefined;
            sign?: boolean | undefined;
            blocksBehind?: number | undefined;
            expireSeconds?: number | undefined;
        } | undefined) => Promise<{
            transaction: string;
            block: number;
        }>;
    };
    readonly rpc: JsonRpc;
    next: () => Promise<void>;
    init: (Provider: TransactionProviderConstructor) => Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
export {};
