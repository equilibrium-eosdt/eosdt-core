/// <reference path="../src/scatterjs.d.ts" />
import { TransactionProvider, TransactionProviderConfig } from "@eosdt/client";
export default class ScatterLegacyTransactionProvider implements TransactionProvider {
    private eos?;
    private name;
    private network;
    constructor(config: TransactionProviderConfig);
    readonly account: import("@scatterjs/core").Account | undefined;
    readonly api: {
        transact: (transaction: any, options?: {
            broadcast?: boolean | undefined;
            sign?: boolean | undefined;
            blocksBehind?: number | undefined;
            expireSeconds?: number | undefined;
        } | undefined) => Promise<any>;
    };
    init: () => Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
