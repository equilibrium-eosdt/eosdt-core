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
exports.default = (impl) => class CustomTransactionProvider {
    constructor(config) {
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            yield this.impl.login();
        });
        this.logout = () => __awaiter(this, void 0, void 0, function* () {
            yield this.impl.logout();
        });
        this.config = config;
        this.impl = impl;
    }
    get account() {
        return this.impl.account();
    }
    get api() {
        if (!this.account) {
            throw new Error("not logged in");
        }
        const { name, authority } = this.account;
        return {
            transact: (transaction, options) => __awaiter(this, void 0, void 0, function* () {
                const opt = Object.assign({ blocksBehind: 3, expireSeconds: 30 }, options);
                return yield this.impl.transact(transaction, opt);
            }),
        };
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.impl.init(this.config);
        });
    }
};
