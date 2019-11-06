"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function parseLocationHash() {
    var hash = window.location.hash.slice(1);
    var raw = JSON.parse(new Buffer(hash, "base64").toString());
    var accountName = raw.accountName || undefined;
    var networks = raw.networks;
    var refId = raw.refId;
    var theme = raw.theme;
    if (accountName && typeof accountName !== "string") {
        throw new Error("accountName parameter is invalid");
    }
    if (!Array.isArray(networks)) {
        throw new Error("networks parameter is invalid");
    }
    return { accountName: accountName, networks: networks, refId: refId, theme: theme };
}
function watchLocationHashChange(fn) {
    var prevHash = window.location.hash;
    setInterval(function () {
        if (prevHash !== window.location.hash) {
            prevHash = window.location.hash;
            fn();
        }
    }, 200);
}
function onWidgetLoad(Equilibrium, options, top) {
    var _this = this;
    Equilibrium.init(options.accountName, options.networks, function (tx, opt) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            top.postMessage(JSON.stringify({ type: "transaction", tx: tx, opt: opt }), "*");
            return [2, { transaction_id: "" }];
        });
    }); }, { refId: options.refId, theme: options.theme });
}
function onWidgetReady(Equilibrium, target) {
    Equilibrium.Widgets.Position(target);
}
window.addEventListener("equilibrium:loaded", function () {
    try {
        var options = parseLocationHash();
        if (window.top) {
            onWidgetLoad(window.Equilibrium, options, window.top);
            watchLocationHashChange(function () {
                try {
                    var options_1 = parseLocationHash();
                    onWidgetLoad(window.Equilibrium, options_1, window.top);
                }
                catch (e) {
                    document.body.innerHTML = "<p style=\"color: red;\">" + e.message + "</p>";
                }
            });
        }
        else {
            throw new Error("Should be in iFrame");
        }
    }
    catch (e) {
        document.body.innerHTML = "<p style=\"color: red;\">" + e.message + "</p>";
    }
});
window.addEventListener("equilibrium:ready", function () {
    try {
        var target = document.querySelector("#root");
        if (!target) {
            throw new Error("no root element");
        }
        onWidgetReady(window.Equilibrium, target);
    }
    catch (e) {
        document.body.innerHTML = "<p style=\"color: red;\">" + e.message + "</p>";
    }
});
//# sourceMappingURL=iframe.js.map