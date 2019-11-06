import {
  Account,
  NetworkConfig,
  TransactionProvider,
  TransactionProviderConfig,
} from "@eosdt/client";

import { Keycat } from "keycatjs";

class KeycatTransactionProvider implements TransactionProvider {
  private $account?: Account;
  private keycat: Keycat;
  private name: string;

  constructor(config: TransactionProviderConfig) {
    const {
      name,
      network: { protocol, host, port, chainId },
    } = config;

    this.name = name;

    const blockchain =
      chainId ===
      "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
        ? "eos-jungle"
        : "eos";

    this.keycat = new Keycat({
      blockchain: {
        name: blockchain,
        nodes: [`${protocol}://${host}:${port}`],
      },
    });
  }

  public get account() {
    return this.$account;
  }

  public get api() {
    if (!this.$account) {
      throw new Error("not logged in");
    }

    const { name, authority } = this.$account;

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

        return await this.keycat
          .account(this.$account!.name)
          .transact(transaction, opt);
      },
    };
  }

  public async init() {
    // no use here
  }

  public login = async () => {
    const { accountName, permission } = await this.keycat.signin();

    if (accountName) {
      this.$account = {
        name: accountName,
        blockchain: "eos",
        authority: permission,
      };
    }
  };

  public logout = async () => {
    this.$account = undefined;
  };
}

export default KeycatTransactionProvider;
