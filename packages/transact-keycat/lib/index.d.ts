import { Account, TransactionProvider, TransactionProviderConfig } from "@eosdt/client";
declare class KeycatTransactionProvider implements TransactionProvider {
    private $account?;
    private keycat;
    private name;
    constructor(config: TransactionProviderConfig);
    readonly account: Account | undefined;
    readonly api: {
        transact: (transaction: any, options?: {
            broadcast?: boolean | undefined;
            sign?: boolean | undefined;
            blocksBehind?: number | undefined;
            expireSeconds?: number | undefined;
        } | undefined) => Promise<any>;
    };
    init(): Promise<void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
export default KeycatTransactionProvider;
