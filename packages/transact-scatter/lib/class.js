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
const core_1 = __importDefault(require("@scatterjs/core"));
const eosjs2_1 = __importDefault(require("@scatterjs/eosjs2"));
const eosjs_1 = require("eosjs");
const exposeScatter = () => (window.ScatterJS = core_1.default);
const consealScatter = () => (window.ScatterJS = null);
class ScatterTransactionProvider {
    constructor(config) {
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const { name, network, rpc } = this;
            exposeScatter();
            const connected = yield core_1.default.connect(name, { network });
            if (!connected) {
                consealScatter();
                throw new Error("We couldn't connect to Scatter Desktop. Please setup scatter or install it.");
            }
            this.eos = core_1.default.eos(network, eosjs_1.Api, { rpc });
            consealScatter();
        });
        this.login = () => __awaiter(this, void 0, void 0, function* () { return yield core_1.default.login(); });
        this.logout = () => __awaiter(this, void 0, void 0, function* () { return yield core_1.default.logout(); });
        const { name, network, rpc } = config;
        if (!rpc) {
            throw new Error("missing rpc in config");
        }
        core_1.default.plugins(...this.constructor.plugins.map((factory) => factory()));
        this.name = name;
        this.network = network;
        this.rpc = rpc;
    }
    get account() {
        return core_1.default.account("eos");
    }
    get api() {
        if (!this.eos) {
            throw new Error("Provider not initialized");
        }
        return this.eos;
    }
}
ScatterTransactionProvider.plugins = [() => new eosjs2_1.default()];
exports.default = ScatterTransactionProvider;
