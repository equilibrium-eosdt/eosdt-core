"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eosjs_1 = require("eosjs");
const node_fetch_1 = __importDefault(require("node-fetch"));
class Client {
    constructor(config) {
        this.Provider = null;
        this.provider = null;
        this.poolIndex = 0;
        this.initCount = 0;
        this.next = () => __awaiter(this, void 0, void 0, function* () {
            this.poolIndex++;
            const { name, network, rpc, Provider } = this;
            if (Provider) {
                this.provider = new Provider({
                    name,
                    network,
                    rpc,
                });
                yield this.provider.init();
            }
            if (this.updateHandler) {
                this.updateHandler(this.id);
            }
        });
        this.init = (Provider) => __awaiter(this, void 0, void 0, function* () {
            const { name, network, rpc } = this;
            this.initCount++;
            this.Provider = Provider;
            this.provider = new Provider({ name, network, rpc });
            yield this.provider.init();
            if (this.updateHandler) {
                this.updateHandler(this.id);
            }
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.provider) {
                throw new Error("Transaction provider is not initialized");
            }
            yield this.provider.login();
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            if (this.provider) {
                yield this.provider.logout();
                this.provider = null;
                this.Provider = null;
            }
        });
        const { name, networks } = config;
        this.name = name;
        this.networks = networks;
        const rpcOpt = typeof window !== "undefined" ? undefined : { fetch: node_fetch_1.default };
        this.pool = networks.map(({ protocol, host, port }) => new eosjs_1.JsonRpc(`${protocol}://${host}:${port}`, rpcOpt));
    }
    get id() {
        return `${this.initCount}${this.poolIndex}`;
    }
    get network() {
        return this.networks[this.poolIndex % this.poolLength];
    }
    set onUpdate(handler) {
        this.updateHandler = handler;
    }
    get poolLength() {
        return this.networks.length;
    }
    get account() {
        if (!this.provider) {
            return undefined;
        }
        return this.provider.account;
    }
    get api() {
        return {
            transact: (transaction, options) => __awaiter(this, void 0, void 0, function* () {
                if (!this.provider) {
                    throw new Error("transaction provider not initialized");
                }
                const tx = yield this.provider.api.transact(transaction, options);
                if (this.provider.parseTX) {
                    return this.provider.parseTX(tx);
                }
                return {
                    transaction: tx.transaction_id,
                    block: tx.processed && tx.processed.block_num
                        ? tx.processed.block_num
                        : Infinity,
                };
            }),
        };
    }
    get rpc() {
        return this.pool[this.poolIndex % this.poolLength];
    }
}
exports.default = Client;
