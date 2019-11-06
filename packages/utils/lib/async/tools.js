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
exports.RETRY_EXCEED = "RETRY_EXCEED";
exports.TIMEOUT_EXCEED = "TIMEOUT_EXCEED";
function withTimeout(fn, timeout) {
    return (...args) => {
        return Promise.race([
            fn(...args),
            new Promise((_, reject) => setTimeout(() => reject(new Error(exports.TIMEOUT_EXCEED)), timeout)),
        ]);
    };
}
exports.withTimeout = withTimeout;
function withRetry(fn, num, exceptions = [exports.TIMEOUT_EXCEED]) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < num; ++i) {
            try {
                return yield fn(...args);
            }
            catch (e) {
                if (exceptions.indexOf(e.message) < 0) {
                    throw e;
                }
            }
        }
        throw new Error(exports.RETRY_EXCEED);
    });
}
exports.withRetry = withRetry;
