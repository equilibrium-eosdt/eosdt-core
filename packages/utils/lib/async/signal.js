"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Signal {
    constructor() {
        this.finished = false;
        this.init = () => {
            if (!this.finished) {
                throw new Error("trying to reinit signal in use");
            }
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                this.finished = false;
            });
        };
        this.wait = () => this.promise;
        this.emit = (v) => {
            if (this.finished) {
                throw new Error("Signal already finished");
            }
            this.finished = true;
            this.resolve(v);
        };
        this.cancel = (e) => {
            if (this.finished) {
                throw new Error("Signal already finished");
            }
            this.reject(e);
        };
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    get done() {
        return this.finished;
    }
}
exports.default = Signal;
