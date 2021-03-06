"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("../globals");
var button_1 = __importDefault(require("./button"));
function createForm(params) {
    var _this = this;
    var id = params.id, className = params.className, handler = params.handler, validate = params.validate;
    var fields = Array.isArray(params.fields)
        ? params.fields.reduce(function (fields, name) {
            var _a;
            return (__assign({}, fields, (_a = {}, _a[name] = { decimals: 2, label: "" }, _a)));
        }, {})
        : params.fields;
    var Form = {
        state: {
            pending: false,
            submitButton: button_1.default({
                name: globals_1.t(templateObject_1 || (templateObject_1 = __makeTemplateObject(["OK"], ["OK"]))),
                submit: true,
                className: "equil-position-manage__button",
            }),
            validate: {},
            update: {},
        },
        onInit: function (w) { return __awaiter(_this, void 0, void 0, function () {
            var el;
            var _this = this;
            return __generator(this, function (_a) {
                el = w.find();
                if (!el) {
                    throw new Error("failed to render");
                }
                w.update({
                    update: validate
                        ? Object.keys(validate).reduce(function (prev, field) {
                            var _a;
                            return (__assign({}, prev, (_a = {}, _a[field] = function (e) {
                                return validate[field](e.target.value);
                            }, _a)));
                        }, {})
                        : {},
                    validate: validate
                        ? Object.keys(validate).reduce(function (prev, field) {
                            var _a;
                            return (__assign({}, prev, (_a = {}, _a[field] = function (e) {
                                var error = validate[field](e.target.value);
                                if (error) {
                                    w.update({ error: error });
                                }
                            }, _a)));
                        }, {})
                        : {},
                    onSubmit: function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var data, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    e.preventDefault();
                                    w.update({ error: undefined, pending: true });
                                    if (e.target) {
                                        data = new FormData(e.target);
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, handler(data)];
                                case 2:
                                    _a.sent();
                                    w.update({ pending: false });
                                    return [3, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    w.update({ error: err_1.message, pending: false });
                                    return [3, 4];
                                case 4: return [2];
                            }
                        });
                    }); },
                });
                return [2];
            });
        }); },
        onUpdate: function (w, state) { return __awaiter(_this, void 0, void 0, function () {
            var el, onSubmit, _i, _a, field, input;
            return __generator(this, function (_b) {
                el = w.find();
                onSubmit = w.state.onSubmit;
                if (w.state.error && state.error) {
                    w.update({ error: undefined });
                }
                if (el && onSubmit) {
                    el.addEventListener("submit", onSubmit);
                }
                for (_i = 0, _a = Object.keys(fields); _i < _a.length; _i++) {
                    field = _a[_i];
                    input = w.find("input[name=" + field + "]");
                    if (input) {
                        if (w.state.validate[field]) {
                            input.addEventListener("change", w.state.validate[field]);
                        }
                        if (w.state.update[field]) {
                            input.addEventListener("keyup", w.state.update[field]);
                        }
                        if (state.pending && !w.state.pending && !w.state.error) {
                            input.value = "";
                        }
                    }
                }
                return [2];
            });
        }); },
        render: function (state, r) {
            return r(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n", "\n", "\n", "\n", "\n"], ["\n",
                "\n",
                "\n",
                "\n", "\n"])), state.pending
                ? "<span class=\"equil-position-manage__pending\">Loading...</span>"
                : "", Object.keys(fields)
                .map(function (name) {
                return "<div class=\"equil-position-manage__input-wrapper\">\n    " + (fields[name].label &&
                    "<label class=\"equil-position-manage__input-label\">" + fields[name].label + "</label>") + "\n    <input class=\"equil-position-manage__input " + (state.error ? "equil-position-manage__input--error" : null) + "\" placeholder=\"0.00\" type=\"number\" autocomplete=\"off\" name=\"" + name + "\" step=\"0.0001\" />\n  </div>";
            })
                .join(""), state.error
                ? "<span class=\"equil-position-manage__error\">" + state.error + "</span>"
                : "", state.submitButton);
        },
    };
    return { id: id, className: className, type: Form, element: "form" };
}
exports.default = createForm;
var templateObject_1, templateObject_2;
//# sourceMappingURL=form.js.map