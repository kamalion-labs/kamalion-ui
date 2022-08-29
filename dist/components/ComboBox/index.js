import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ComboBox = ({ id, name, value, onChange, disabled, emptyText, data, memberValue, memberName, className }) => {
    const handleOnChange = async (e) => {
        const selectedValue = e.target.value;
        const type = memberValue ? typeof data[0][memberValue] : typeof data[0];
        await onChange(type === 'number' ? +selectedValue : selectedValue);
    };
    return (_jsxs("select", { id: id, name: name, className: `input ${className}`, onChange: handleOnChange, value: value, disabled: disabled, children: [emptyText && _jsx("option", { value: "", children: emptyText }), data.map((item, index) => {
                const itemValue = memberValue ? item[memberValue] : item;
                const itemName = memberName ? item[memberName] : item;
                return (_jsx("option", { value: itemValue, children: itemName }, index));
            })] }));
};
