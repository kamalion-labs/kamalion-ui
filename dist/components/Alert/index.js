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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var types = {
    danger: { bg: 'bg-[#f17573]', text: 'text-white' },
    warning: { bg: 'bg-[#f8d053]', text: 'text-white' },
    success: { bg: 'bg-[#10cfbd]', text: 'text-white' },
    info: { bg: 'bg-[#48b0f7]', text: 'text-white' }
};
var Alert = function (_a) {
    var children = _a.children, className = _a.className, type = _a.type;
    var _b = types[type], bg = _b.bg, text = _b.text;
    if (!children)
        return null;
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: "my-2 w-full rounded-md px-4 py-2 ".concat(bg, " ").concat(text, " ").concat(className) }, { children: children }));
};
exports.Alert = Alert;
