import { Account, TransactionProviderConfig } from "@eosdt/client";
import { Api } from "eosjs";
declare const _default: (account: Account, privateKeys: string[]) => {
    new (config: TransactionProviderConfig): {
        readonly api: Api;
        loggedOut: boolean;
        readonly account: Account | undefined;
        init(): Promise<void>;
        login: () => Promise<void>;
        logout: () => Promise<void>;
    };
};
export default _default;
