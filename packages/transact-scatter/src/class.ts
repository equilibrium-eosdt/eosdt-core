import {
  NetworkConfig,
  TransactionProvider,
  TransactionProviderConfig,
} from "@eosdt/client";

import Scatter, { Plugin } from "@scatterjs/core";
import ScatterEOS from "@scatterjs/eosjs2";
import { Api, JsonRpc } from "eosjs";

const exposeScatter = () => ((window as any).ScatterJS = Scatter);
const consealScatter = () => ((window as any).ScatterJS = null);

type PluginFactory = () => Plugin;

interface StaticAccessor {
  plugins: PluginFactory[];
}

export default class ScatterTransactionProvider implements TransactionProvider {
  protected static plugins: PluginFactory[] = [() => new ScatterEOS()];
  private eos?: Api;
  private name: string;
  private network: NetworkConfig;
  private rpc: JsonRpc;

  constructor(config: TransactionProviderConfig) {
    const { name, network, rpc } = config;

    if (!rpc) {
      throw new Error("missing rpc in config");
    }

    Scatter.plugins(
      ...((this.constructor as any) as StaticAccessor).plugins.map((factory) =>
        factory(),
      ),
    );

    this.name = name;
    this.network = network;
    this.rpc = rpc;
  }

  public get account() {
    return Scatter.account("eos");
  }

  public get api() {
    if (!this.eos) {
      throw new Error("Provider not initialized");
    }

    return this.eos;
  }

  public init = async () => {
    const { name, network, rpc } = this;
    exposeScatter();
    const connected = await Scatter.connect(name, { network });

    if (!connected) {
      consealScatter();

      throw new Error(
        "We couldn't connect to Scatter Desktop. Please setup scatter or install it.",
      );
    }

    this.eos = Scatter.eos(network, Api, { rpc });
    consealScatter();
  };

  public login = async () => await Scatter.login();
  public logout = async () => await Scatter.logout();
}
