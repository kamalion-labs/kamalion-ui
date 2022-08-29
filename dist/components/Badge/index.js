import { jsx as _jsx } from "react/jsx-runtime";
const types = {
    danger: { bg: 'bg-[#f17573]', text: 'text-white' },
    warning: { bg: 'bg-[#f8d053]', text: 'text-white' },
    success: { bg: 'bg-[#10cfbd]', text: 'text-white' },
    info: { bg: 'bg-[#48b0f7]', text: 'text-white' }
};
export const Badge = ({ children, className, type }) => {
    const { bg, text } = types[type];
    if (!children)
        return null;
    return _jsx("div", { className: `my-2 rounded-full w-fit px-4 py-1 text-[10pt] font-semibold ${bg} ${text} ${className}`, children: children });
};
