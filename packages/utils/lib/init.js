"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForDocumentLoad = () => new Promise((resolve) => {
    if (window.document.readyState === "complete") {
        resolve();
    }
    else {
        window.addEventListener("load", () => setTimeout(() => resolve(), 100));
    }
});
exports.waitForLynx = (ms) => {
    let fn;
    return Promise.race([
        new Promise((resolve) => {
            fn = resolve;
            window.addEventListener("lynxMobileLoaded", fn);
        }),
        new Promise((_, reject) => setTimeout(() => {
            if (fn) {
                window.removeEventListener("lynxMobileLoaded", fn);
            }
            reject(new Error(`Timeout[${ms} ms] ran out for lynx`));
        }, ms)),
    ]);
};
