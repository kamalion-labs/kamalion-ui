import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
export const Button = ({ children, onClick, icon, className, type = 'primary', usesLoader = false, loadingText = 'Loading...' }) => {
    const [isLoading, setLoading] = useState(false);
    const colors = {
        primary: { background: 'bg-[#6D6EF0]', text: 'text-white', border: '' },
        secondary: { background: 'bg-white', text: 'text-sky-500', border: 'border-sky-500' },
        danger: { background: 'bg-[#f17573]', text: 'text-white', border: '' },
        warn: { background: 'bg-[#f8d053]', text: 'text-white', border: '' },
        info: { background: 'bg-[#48b0f7]', text: 'text-white', border: '' },
        success: { background: 'bg-[#10cfbd]', text: 'text-white', border: '' }
    };
    const { background, border, text } = colors[type];
    const handleOnClick = async () => {
        if (usesLoader)
            setLoading(true);
        await onClick();
        if (usesLoader)
            setLoading(false);
    };
    return (_jsxs("button", { onClick: handleOnClick, className: `flex h-[32px] flex-row rounded-md ${background} ${text} border-1 ${border} my-1 text-sm font-semibold transition hover:opacity-75 ${className}`, children: [icon && !isLoading && _jsx("div", { className: "button-icon", children: icon }), icon && isLoading && (_jsx("div", { className: "button-icon", children: _jsx(FaSpinner, { className: "icon-spin" }) })), _jsxs("div", { className: "px-5 py-1 flex items-center", children: [!icon && isLoading && (_jsxs(_Fragment, { children: [_jsx(FaSpinner, { className: "icon-spin mr-2" }), loadingText] })), !isLoading && children, isLoading && icon && loadingText] })] }));
};
