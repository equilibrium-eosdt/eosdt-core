import {
  Account,
  NetworkConfig,
  TransactionProvider,
  TransactionProviderConfig,
} from "@eosdt/client";

type AccountGetterFunction = () => Account | undefined;

type InitFunction = (config: TransactionProviderConfig) => Promise<void>;

type TransactFunction = (
  transaction: any,
  options?: {
    broadcast?: boolean;
    sign?: boolean;
    blocksBehind?: number;
    expireSeconds?: number;
  },
) => Promise<any>;

interface Implementation {
  account: AccountGetterFunction;
  init: InitFunction;
  transact: TransactFunction;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export default (impl: Implementation) =>
  class CustomTransactionProvider implements TransactionProvider {
    private config: TransactionProviderConfig;
    private impl: Implementation;

    constructor(config: TransactionProviderConfig) {
      this.config = config;
      this.impl = impl;
    }

    public get account() {
      return this.impl.account();
    }

    public get api() {
      if (!this.account) {
        throw new Error("not logged in");
      }

      const { name, authority } = this.account;

      return {
        transact: async (
          transaction: any,
          options?: {
            broadcast?: boolean;
            sign?: boolean;
            blocksBehind?: number;
            expireSeconds?: number;
          },
        ) => {
          const opt = { blocksBehind: 3, expireSeconds: 30, ...options };

          return await this.impl.transact(transaction, opt);
        },
      };
    }

    public async init() {
      await this.impl.init(this.config);
    }

    public login = async () => {
      await this.impl.login();
    };

    public logout = async () => {
      await this.impl.logout();
    };
  };
