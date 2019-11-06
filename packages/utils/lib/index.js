"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./async"));
__export(require("./init"));
function debugMessage(...args) {
    if (process.env.NODE_ENV === "development") {
        for (const arg of args) {
            console.info(typeof arg === "string" ? arg : JSON.stringify(arg, null, 2));
        }
    }
}
exports.debugMessage = debugMessage;
