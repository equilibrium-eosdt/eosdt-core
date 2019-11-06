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
const keycatjs_1 = require("keycatjs");
class KeycatTransactionProvider {
    constructor(config) {
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            const { accountName, permission } = yield this.keycat.signin();
            if (accountName) {
                this.$account = {
                    name: accountName,
                    blockchain: "eos",
                    authority: permission,
                };
            }
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            this.$account = undefined;
        });
        const { name, network: { protocol, host, port, chainId }, } = config;
        this.name = name;
        const blockchain = chainId ===
            "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
            ? "eos-jungle"
            : "eos";
        this.keycat = new keycatjs_1.Keycat({
            blockchain: {
                name: blockchain,
                nodes: [`${protocol}://${host}:${port}`],
            },
        });
    }
    get account() {
        return this.$account;
    }
    get api() {
        if (!this.$account) {
            throw new Error("not logged in");
        }
        const { name, authority } = this.$account;
        return {
            transact: (transaction, options) => __awaiter(this, void 0, void 0, function* () {
                const opt = Object.assign({ blocksBehind: 3, expireSeconds: 30 }, options);
                return yield this.keycat
                    .account(this.$account.name)
                    .transact(transaction, opt);
            }),
        };
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // no use here
        });
    }
}
exports.default = KeycatTransactionProvider;
