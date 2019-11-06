import { JsonRpc } from "eosjs";
import f from "node-fetch";

import {
  Account,
  NetworkPool,
  TransactionProvider,
  TransactionProviderConstructor,
} from "./types";

interface Config {
  name: string;
  networks: NetworkPool;
}

export default class Client {
  private Provider: TransactionProviderConstructor | null = null;
  private provider: TransactionProvider | null = null;
  private name: string;
  private networks: NetworkPool;
  private pool: JsonRpc[];
  private poolIndex: number = 0;
  private initCount: number = 0;
  private updateHandler?: (id: string) => void;

  constructor(config: Config) {
    const { name, networks } = config;
    this.name = name;
    this.networks = networks;
    const rpcOpt =
      typeof window !== "undefined" ? undefined : { fetch: f as any };

    this.pool = networks.map(
      ({ protocol, host, port }) =>
        new JsonRpc(`${protocol}://${host}:${port}`, rpcOpt),
    );
  }

  private get id() {
    return `${this.initCount}${this.poolIndex}`;
  }

  private get network() {
    return this.networks[this.poolIndex % this.poolLength];
  }

  public set onUpdate(handler: (id: string) => void) {
    this.updateHandler = handler;
  }

  public get poolLength() {
    return this.networks.length;
  }

  public get account(): Account | undefined {
    if (!this.provider) {
      return undefined;
    }

    return this.provider.account;
  }

  public get api() {
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
        if (!this.provider) {
          throw new Error("transaction provider not initialized");
        }

        const tx = await this.provider.api.transact(transaction, options);

        if (this.provider.parseTX) {
          return this.provider.parseTX(tx);
        }

        return {
          transaction: tx.transaction_id as string,
          block:
            tx.processed && tx.processed.block_num
              ? (tx.processed.block_num as number)
              : Infinity,
        };
      },
    };
  }

  public get rpc() {
    return this.pool[this.poolIndex % this.poolLength];
  }

  public next = async () => {
    this.poolIndex++;
    const { name, network, rpc, Provider } = this;

    if (Provider) {
      this.provider = new Provider({
        name,
        network,
        rpc,
      });

      await this.provider.init();
    }

    if (this.updateHandler) {
      this.updateHandler(this.id);
    }
  };

  public init = async (Provider: TransactionProviderConstructor) => {
    const { name, network, rpc } = this;
    this.initCount++;
    this.Provider = Provider;
    this.provider = new Provider({ name, network, rpc });
    await this.provider.init();

    if (this.updateHandler) {
      this.updateHandler(this.id);
    }
  };

  public login = async () => {
    if (!this.provider) {
      throw new Error("Transaction provider is not initialized");
    }

    await this.provider.login();
  };

  public logout = async () => {
    if (this.provider) {
      await this.provider.logout();
      this.provider = null;
      this.Provider = null;
    }
  };
}
