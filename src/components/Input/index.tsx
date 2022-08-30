import React from 'react';
import NumberFormat from 'react-number-format';

export interface InputProps {
  value: any;
  onChange: any;

  maskType?: 'text' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
  className?: string;

  name?: string;
  id?: string;
}

export const Input: React.FC<InputProps> = ({ id, name, value, onChange, maskType = 'text', className, ...rest }) => {
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

  if (maskType !== 'text' && Object.keys(maskProps).includes(maskType)) {
    return <NumberFormat className={`input ${className}`} value={value} onValueChange={(e: any) => onChange(e)} {...maskProps[maskType]} {...rest} />;
  }

  return <input type={maskType} className={`input ${className}`} onChange={(e) => onChange(e.target.value)} value={value} {...rest} />;
};
