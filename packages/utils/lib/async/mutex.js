"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutex {
    constructor() {
        this.pending = false;
        this.queue = [];
        this.dispatchNext = () => {
            if (this.queue.length) {
                this.pending = true;
                this.queue.shift()(this.dispatchNext);
            }
            else {
                this.pending = false;
            }
        };
        this.isLocked = () => this.pending;
        this.acquire = () => {
            const ticket = new Promise((resolve) => this.queue.push(resolve));
            if (!this.pending) {
                this.dispatchNext();
            }
            return ticket;
        };
    }
}
exports.default = Mutex;
