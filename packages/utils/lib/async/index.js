"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutex_1 = __importDefault(require("./mutex"));
exports.Mutex = mutex_1.default;
const signal_1 = __importDefault(require("./signal"));
exports.Signal = signal_1.default;
__export(require("./tools"));
exports.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
