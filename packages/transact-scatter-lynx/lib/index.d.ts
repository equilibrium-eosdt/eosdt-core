import Provider from "@eosdt/transact-scatter";
import ScatterEOS from "@scatterjs/eosjs2";
export default class ScatterLynxTransactionProvider extends Provider {
    protected static plugins: (() => ScatterEOS)[];
}
