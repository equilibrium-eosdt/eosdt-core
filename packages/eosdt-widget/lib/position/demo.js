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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("../globals");
function Demo(deps) {
    var _this = this;
    return {
        state: {
            baseUrl: "",
        },
        onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
            var baseUrl;
            return __generator(this, function (_a) {
                baseUrl = w.ctx.baseUrl;
                w.update({
                    baseUrl: baseUrl,
                });
                setInterval(function () { return w.update(); }, 60000);
                return [2];
            });
        }); },
        render: function (state, r) {
            var getRates = deps.getRates;
            var baseUrl = state.baseUrl;
            var rates = getRates && getRates();
            console.info(state);
            var balanceToNumber = function (balance) {
                if (balance === undefined) {
                    balance = "";
                }
                var x = balance.match(/[0-9,\.]+/g);
                if (x === null) {
                    return 0;
                }
                return Number(x[0]);
            };
            var eosUsdRate;
            var nutUsdRate;
            var demoEOS = 20;
            var demoNUT = 7;
            var demoEOStoUSD;
            var demoNUTtoUSD;
            if (rates.length) {
                nutUsdRate = (balanceToNumber(rates[1].rate) * 100).toFixed(2);
                eosUsdRate = balanceToNumber(rates[0].rate).toFixed(2);
                demoEOStoUSD = (balanceToNumber(rates[0].rate) * 100 * demoEOS).toFixed(2);
                demoNUTtoUSD = (balanceToNumber(rates[1].rate) * 100 * demoNUT).toFixed(2);
            }
            return r(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"", "public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join us in Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"create-position-3\">\n            <form class=\"create-position-4 equil-position-manage__form\">\n\n              <div class=\"equil-position-manage__input-wrapper\">\n                <label class=\"equil-position-manage__input-label\">", "</label>\n                <input class=\"equil-position-manage__input null\" placeholder=\"0.00\" type=\"number\" autocomplete=\"off\" name=\"deposit\" step=\"0.0001\">\n              </div>\n              <div class=\"equil-position-manage__input-wrapper\">\n                <label class=\"equil-position-manage__input-label\">", "</label>\n                <input class=\"equil-position-manage__input null\" placeholder=\"0.00\" type=\"number\" autocomplete=\"off\" name=\"generate\" step=\"0.0001\">\n              </div>\n\n              <button class=\"equil-position-manage__button\" disabled>", "</button>\n            </form>\n          </div>\n        </div>\n        <div class=\"equil-position-parameters equil-position-parameters--empty\">\n          <h2 class=\"equil-position-manage__parametersTitle\">", "</h2>\n            <span class=\"equil-position-parameters__title\">\n            ", "\n            </span>\n        </div>\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"equil-user-balances\">\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOS</span>\n                  <span>", "</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$", "</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>NUT</span>\n                  <span>", "</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$", "</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOSDT</span>\n                  <span>0</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0</span>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"rates-5 equil-rates\">\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"", "public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-rates__values\">\n                  <span>EOS</span>\n                  <span>$", "</span>\n              </div>\n            </div>\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"", "public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-rates__values\">\n                  <span>NUT</span>\n                  <span>$", "</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      "], ["\n      <div class=\"equil-position-manage__header\">\n        <a\n          class=\"equil-position-manage__logo\"\n          href=\"https://eosdt.com/\"\n          target=\"_blank\"\n        >\n          <img src=\"", "public/img/logo.svg\" />\n        </a>\n        <a\n          class=\"equil-position-manage__telegram\"\n          href=\"https://t.me/equilibrium_eosdt_official\"\n          target=\"_blank\"\n        >Join us in Telegram</a>\n      </div>\n      <div class=\"equil-position-manage__wrapper\">\n        <div class=\"equil-position-actions\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"create-position-3\">\n            <form class=\"create-position-4 equil-position-manage__form\">\n\n              <div class=\"equil-position-manage__input-wrapper\">\n                <label class=\"equil-position-manage__input-label\">", "</label>\n                <input class=\"equil-position-manage__input null\" placeholder=\"0.00\" type=\"number\" autocomplete=\"off\" name=\"deposit\" step=\"0.0001\">\n              </div>\n              <div class=\"equil-position-manage__input-wrapper\">\n                <label class=\"equil-position-manage__input-label\">", "</label>\n                <input class=\"equil-position-manage__input null\" placeholder=\"0.00\" type=\"number\" autocomplete=\"off\" name=\"generate\" step=\"0.0001\">\n              </div>\n\n              <button class=\"equil-position-manage__button\" disabled>", "</button>\n            </form>\n          </div>\n        </div>\n        <div class=\"equil-position-parameters equil-position-parameters--empty\">\n          <h2 class=\"equil-position-manage__parametersTitle\">", "</h2>\n            <span class=\"equil-position-parameters__title\">\n            ", "\n            </span>\n        </div>\n      </div>\n      <div class=\"equil-position-manage__balanceAndPrice\">\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"equil-user-balances\">\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOS</span>\n                  <span>", "</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$", "</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>NUT</span>\n                  <span>", "</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$", "</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"equil-user-balances__item\">\n              <img class=\"equil-user-balances__img\" src=\"", "public/img/EOSDT.svg\" alt=\"EOSDT\" />\n              <div class=\"equil-user-balances__values\">\n                <div>\n                  <span>EOSDT</span>\n                  <span>0</span>\n                </div>\n                <div class=\"equil-user-balances__USDvalue\">\n                  <span>USD</span>\n                  <span>$0</span>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <div class=\"equil-position-manage__wrapper\">\n          <h2 class=\"equil-position-manage__title\">\n            ", "\n          </h2>\n          <div class=\"rates-5 equil-rates\">\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"", "public/img/EOS.svg\" alt=\"EOS\" />\n              <div class=\"equil-rates__values\">\n                  <span>EOS</span>\n                  <span>$", "</span>\n              </div>\n            </div>\n            <div class=\"equil-rates__item\">\n              <img class=\"equil-rates__img\" src=\"", "public/img/NUT.svg\" alt=\"NUT\" />\n              <div class=\"equil-rates__values\">\n                  <span>NUT</span>\n                  <span>$", "</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      "])), baseUrl, globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Create position"], ["Create position"]))), globals_1.t(templateObject_2 || (templateObject_2 = __makeTemplateObject(["I want to deposit EOS"], ["I want to deposit EOS"]))), globals_1.t(templateObject_3 || (templateObject_3 = __makeTemplateObject(["And generate EOSDT"], ["And generate EOSDT"]))), globals_1.t(templateObject_4 || (templateObject_4 = __makeTemplateObject(["OK"], ["OK"]))), globals_1.t(templateObject_5 || (templateObject_5 = __makeTemplateObject(["You don't have any positions yet"], ["You don't have any positions yet"]))), globals_1.t(templateObject_6 || (templateObject_6 = __makeTemplateObject(["Deposit collateral and generate <br/>EOSDT to get started"], ["Deposit collateral and generate <br/>EOSDT to get started"]))), globals_1.t(templateObject_7 || (templateObject_7 = __makeTemplateObject(["Balance"], ["Balance"]))), baseUrl, demoEOS, demoEOStoUSD || "0", baseUrl, demoNUT, demoNUTtoUSD || "0", baseUrl, globals_1.t(templateObject_8 || (templateObject_8 = __makeTemplateObject(["Price"], ["Price"]))), baseUrl, eosUsdRate || "0", baseUrl, nutUsdRate || "0");
        },
    };
}
exports.default = Demo;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=demo.js.map