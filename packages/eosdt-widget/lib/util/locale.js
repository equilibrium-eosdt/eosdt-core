"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocaleTemplateFunction = function (params) { return function (parts) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var key = parts.join("${...}");
    if (params.extract) {
        params.extract.set(key, parts);
    }
    var localeParts = parts;
    if (params.locale && params.locale.has(key)) {
        localeParts = params.locale.get(key);
    }
    return localeParts.reduce(function (str, part, i) {
        if (!args[i]) {
            return "" + str + part;
        }
        return "" + str + part + args[i];
    }, "");
}; };
//# sourceMappingURL=locale.js.map