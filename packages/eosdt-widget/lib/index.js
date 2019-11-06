"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("@eosdt/client"));
var transact_creator_1 = __importDefault(require("@eosdt/transact-creator"));
var events_1 = require("events");
var package_json_1 = require("../package.json");
var globals_1 = require("./globals");
var position_1 = __importDefault(require("./position"));
var no_login_1 = __importDefault(require("./position/no-login"));
var styles_1 = require("./styles");
var widget_1 = require("./widget");
var CreatePosition = {
    state: {
        loggedIn: false,
    },
    onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
        var _a, events, client, name_1, loggedIn;
        return __generator(this, function (_b) {
            _a = w.ctx, events = _a.events, client = _a.client;
            events.on("account", function (state) {
                var loggedIn = state.loggedIn;
                if (w.state.loggedIn !== loggedIn) {
                    w.update({ loggedIn: loggedIn });
                }
            });
            if (!client) {
                throw new Error(globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Missing EOS client"], ["Missing EOS client"]))));
            }
            if (client.account) {
                name_1 = client.account.name;
                loggedIn = !!name_1;
                if (w.state.loggedIn !== loggedIn) {
                    w.update(!name_1 ? { loggedIn: false } : { loggedIn: true });
                }
            }
            return [2];
        });
    }); },
    render: function (state, r) {
        return r(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["",
            ""])), state.loggedIn
            ? {
                id: "position",
                className: "equil-position-manage",
                type: position_1.default,
            }
            : {
                id: "position-login",
                className: "equil-position-manage",
                type: no_login_1.default(),
            });
    },
};
var stringifyOptions = function (opts) {
    return new Buffer(JSON.stringify(opts)).toString("base64");
};
var iframeOptions = {
    accountName: undefined,
    networks: [],
};
var context = {
    baseUrl: "",
    events: new events_1.EventEmitter(),
};
var Equilibrium = {
    isReady: function () { return !!context.client; },
    init: init,
    setLocale: globals_1.setLocale,
    getContext: function () { return context; },
    Widgets: {
        Position: injectPositionWidget,
    },
};
function injectPositionWidget(el, options) {
    if (options === void 0) { options = {}; }
    if (!el) {
        return null;
    }
    if (options.iframe) {
        var url = options.iframeUrl || "https://cdn.eosdt.com/widget";
        el.innerHTML = "<iframe style=\"width: 100%; border: 0; min-height: 600px;\" src=\"" + url + "/iframe-" + package_json_1.version + ".html#" + stringifyOptions(iframeOptions) + "\"></iframe>";
        return null;
    }
    else {
        styles_1.setStyles(el, context.theme, {
            baseUrl: context.baseUrl,
            mobile: options.mobile || "responsive",
        });
        return new widget_1.Widget(el, CreatePosition, context);
    }
}
var postMessageHandler;
function init(accountName, networks, onTransaction, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var client, account, e_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    iframeOptions.accountName = accountName;
                    iframeOptions.networks = networks;
                    if (options.baseUrl) {
                        context.baseUrl = options.baseUrl;
                    }
                    if (options.theme) {
                        iframeOptions.theme = options.theme;
                        context.theme = options.theme;
                    }
                    if (options.refId) {
                        iframeOptions.refId = options.refId;
                        context.refId = options.refId;
                    }
                    if (postMessageHandler) {
                        window.removeEventListener("message", postMessageHandler);
                    }
                    postMessageHandler = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var data, data_1, tx, opt, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e.stopImmediatePropagation();
                                    data = e.data;
                                    if (!(typeof data === "string")) return [3, 5];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    data_1 = JSON.parse(e.data);
                                    if (!(data_1.type === "transaction")) return [3, 3];
                                    tx = data_1.tx, opt = data_1.opt;
                                    if (!tx) return [3, 3];
                                    return [4, onTransaction(tx, opt)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [3, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    return [3, 5];
                                case 5: return [2];
                            }
                        });
                    }); };
                    window.addEventListener("message", postMessageHandler);
                    client = new client_1.default({ name: "eosdt-widget", networks: networks });
                    context.client = client;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, client.init(transact_creator_1.default({
                            account: function () {
                                return accountName ? { name: accountName } : undefined;
                            },
                            init: function () { return Promise.resolve(); },
                            transact: onTransaction,
                            login: function () { return Promise.resolve(); },
                            logout: function () { return Promise.resolve(); },
                        }))];
                case 2:
                    _a.sent();
                    account = client.account;
                    context.events.emit("account", { loggedIn: !!account });
                    window.dispatchEvent(new Event("equilibrium:ready"));
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
exports.default = Equilibrium;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map