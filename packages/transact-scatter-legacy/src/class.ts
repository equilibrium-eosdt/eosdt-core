import {
  NetworkConfig,
  TransactionProvider,
  TransactionProviderConfig,
} from "@eosdt/client";

import Scatter from "@scatterjs/core";
import ScatterEOS from "@scatterjs/eosjs";
import Eos from "eosjs";

const exposeScatter = () => ((window as any).ScatterJS = Scatter);
const consealScatter = () => ((window as any).ScatterJS = null);

export default class ScatterLegacyTransactionProvider
  implements TransactionProvider {
  private eos?: any; // TODO legacy eosjs definition
  private name: string;
  private network: NetworkConfig;

  constructor(config: TransactionProviderConfig) {
    const { name, network } = config;
    Scatter.plugins(new ScatterEOS());
    this.name = name;
    this.network = network;
  }

  public get account() {
    return Scatter.account("eos");
  }

  public get api() {
    if (!this.eos) {
      throw new Error("Provider not initialized");
    }

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
        const account = this.account;

        if (!account) {
          throw new Error("not logged in");
        }

        const { name, authority } = account;

        const opt = {
          broadcast: true,
          sign: true,
          authorization: [`${name}@${authority}`],
        };

        return await this.eos.transaction(transaction, opt);
      },
    };
  }

  public init = async () => {
    const { name, network } = this;
    exposeScatter();
    const connected = await Scatter.connect(name, { network });

    if (!connected) {
      consealScatter();

      throw new Error(
        "We couldn't connect to Scatter Desktop. Please setup scatter or install it.",
      );
    }

    this.eos = Scatter.eos(network, Eos);
    consealScatter();
  };

  public login = async () => await Scatter.login();
  public logout = async () => await Scatter.logout();
}
