"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_number_format_1 = __importDefault(require("react-number-format"));
var Input = function (_a) {
    var id = _a.id, name = _a.name, value = _a.value, onChange = _a.onChange, max = _a.max, _b = _a.maskType, maskType = _b === void 0 ? 'text' : _b, className = _a.className, rest = __rest(_a, ["id", "name", "value", "onChange", "max", "maskType", "className"]);
    var maskProps = {
        money: {
            decimalScale: 2,
            fixedDecimalScale: true,
            thousandSeparator: '.',
            decimalSeparator: ','
        },
        percent: {
            decimalSeparator: ',',
            decimalScale: 2,
            suffix: '%',
            fixedDecimalScale: true
        },
        date: {
            format: '##/##/####',
            mask: '_'
        },
        tel: {
            format: '(##) ####-####',
            mask: '_'
        },
        cel: {
            format: '(##) #####-####',
            mask: '_'
        },
        text: {}
    };
    if (maskType !== 'text' && Object.keys(maskProps).includes(maskType)) {
        return ((0, jsx_runtime_1.jsx)(react_number_format_1.default, __assign({ className: "input ".concat(className), value: value, onValueChange: onChange, maxLength: max }, maskProps[maskType], rest)));
    }
    return ((0, jsx_runtime_1.jsx)("input", __assign({ type: maskType, className: "input ".concat(className), onChange: function (e) {
            return onChange({
                value: e.target.value,
                floatValue: undefined,
                formattedValue: e.target.value
            });
        }, value: value, maxLength: max }, rest)));
};
exports.Input = Input;
