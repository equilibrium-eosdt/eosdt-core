import Provider from "@eosdt/transact-scatter";
import ScatterEOS from "@scatterjs/eosjs2";
import ScatterLynx from "@scatterjs/lynx";
import { Api, JsonRpc } from "eosjs";

export default class ScatterLynxTransactionProvider extends Provider {
  protected static plugins = [() => new ScatterEOS(), () => new ScatterLynx({ Api, JsonRpc })];
}
