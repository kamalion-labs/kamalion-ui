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
exports.Modal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Modal = function (_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "fixed top-0 left-0 flex h-screen w-full flex-col items-center bg-slate-900 bg-opacity-75" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-[#F8FAFB] text-[#1D1E52]; relative mt-10 h-auto w-[400px] rounded-md p-5 shadow-lg" }, { children: children })) })));
};
exports.Modal = Modal;
