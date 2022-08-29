import { jsx as _jsx } from "react/jsx-runtime";
import NumberFormat from 'react-number-format';
export const Input = ({ id, name, maskType, className, ...rest }) => {
    const maskProps = {
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
    if (maskType && Object.keys(maskProps).includes(maskType)) {
        return _jsx(NumberFormat, { className: `input ${className}`, ...maskProps[maskType], ...rest });
    }
    return _jsx("input", { type: maskType, className: `input ${className}`, ...rest });
};
