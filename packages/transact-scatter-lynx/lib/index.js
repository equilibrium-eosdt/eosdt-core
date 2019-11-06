"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transact_scatter_1 = __importDefault(require("@eosdt/transact-scatter"));
const eosjs2_1 = __importDefault(require("@scatterjs/eosjs2"));
const lynx_1 = __importDefault(require("@scatterjs/lynx"));
const eosjs_1 = require("eosjs");
class ScatterLynxTransactionProvider extends transact_scatter_1.default {
}
ScatterLynxTransactionProvider.plugins = [() => new eosjs2_1.default(), () => new lynx_1.default({ Api: eosjs_1.Api, JsonRpc: eosjs_1.JsonRpc })];
exports.default = ScatterLynxTransactionProvider;
