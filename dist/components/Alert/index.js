import { jsx as _jsx } from "react/jsx-runtime";
const types = {
    danger: { bg: 'bg-[#f17573]', text: 'text-white' },
    warning: { bg: 'bg-[#f8d053]', text: 'text-white' },
    success: { bg: 'bg-[#10cfbd]', text: 'text-white' },
    info: { bg: 'bg-[#48b0f7]', text: 'text-white' }
};
export const Alert = ({ children, className, type }) => {
    const { bg, text } = types[type];
    if (!children)
        return null;
    return _jsx("div", { className: `my-2 w-full rounded-md px-4 py-2 ${bg} ${text} ${className}`, children: children });
};
