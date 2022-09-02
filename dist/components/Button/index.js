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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.Button = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var Button = function (_a) {
    var children = _a.children, onClick = _a.onClick, icon = _a.icon, className = _a.className, _b = _a.type, type = _b === void 0 ? 'primary' : _b, _c = _a.usesLoader, usesLoader = _c === void 0 ? false : _c, _d = _a.loadingText, loadingText = _d === void 0 ? 'Loading...' : _d;
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setLoading = _e[1];
    var colors = {
        primary: { background: 'bg-[#6D6EF0]', text: 'text-white', border: '' },
        secondary: { background: 'bg-white', text: 'text-sky-500', border: 'border-sky-500' },
        danger: { background: 'bg-[#f17573]', text: 'text-white', border: '' },
        warn: { background: 'bg-[#f8d053]', text: 'text-white', border: '' },
        info: { background: 'bg-[#48b0f7]', text: 'text-white', border: '' },
        success: { background: 'bg-[#10cfbd]', text: 'text-white', border: '' }
    };
    var _f = colors[type], background = _f.background, border = _f.border, text = _f.text;
    var handleOnClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (usesLoader)
                        setLoading(true);
                    return [4 /*yield*/, onClick()];
                case 1:
                    _a.sent();
                    if (usesLoader)
                        setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ onClick: handleOnClick, className: "flex h-[32px] flex-row rounded-md ".concat(background, " ").concat(text, " border-1 ").concat(border, " my-1 text-sm font-semibold transition hover:opacity-75 ").concat(className) }, { children: [icon && !isLoading && (0, jsx_runtime_1.jsx)("div", __assign({ className: "button-icon" }, { children: icon })), icon && isLoading && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "button-icon" }, { children: (0, jsx_runtime_1.jsx)(fa_1.FaSpinner, { className: "icon-spin" }) }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "px-5 py-1 flex items-center" }, { children: [!icon && isLoading && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(fa_1.FaSpinner, { className: "icon-spin mr-2" }), loadingText] })), !isLoading && children, isLoading && icon && loadingText] }))] })));
};
exports.Button = Button;
