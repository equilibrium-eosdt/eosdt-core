import { Account, TransactionProviderConfig } from "@eosdt/client";
declare type AccountGetterFunction = () => Account | undefined;
declare type InitFunction = (config: TransactionProviderConfig) => Promise<void>;
declare type TransactFunction = (transaction: any, options?: {
    broadcast?: boolean;
    sign?: boolean;
    blocksBehind?: number;
    expireSeconds?: number;
}) => Promise<any>;
interface Implementation {
    account: AccountGetterFunction;
    init: InitFunction;
    transact: TransactFunction;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
declare const _default: (impl: Implementation) => {
    new (config: TransactionProviderConfig): {
        config: TransactionProviderConfig;
        impl: Implementation;
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
    };
};
export default _default;
