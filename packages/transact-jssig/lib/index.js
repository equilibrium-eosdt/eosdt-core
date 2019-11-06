"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eosjs_1 = require("eosjs");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const text_encoding_1 = require("text-encoding");
exports.default = (account, privateKeys) => class JSSigTransactionProvider {
    constructor(config) {
        this.loggedOut = false;
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            // no actual use here
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            this.loggedOut = true;
        });
        const { rpc } = config;
        const signatureProvider = new eosjs_jssig_1.JsSignatureProvider(privateKeys);
        const textDecoder = new text_encoding_1.TextDecoder();
        const textEncoder = new text_encoding_1.TextEncoder();
        this.api = new eosjs_1.Api({
            rpc,
            signatureProvider,
            textDecoder,
            textEncoder,
        });
    }
    get account() {
        return !this.loggedOut ? account : undefined;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // no actual use here
        });
    }
};
