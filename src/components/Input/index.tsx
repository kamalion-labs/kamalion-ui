import React from 'react';
import NumberFormat from 'react-number-format';

export interface InputProps {
  maskType?: 'text' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
  className?: string;

  name?: string;
  id?: string;
}

export const Input: React.FC<InputProps> = ({ id, name, maskType, className, ...rest }) => {
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
    return <NumberFormat className={`input ${className}`} {...maskProps[maskType]} {...rest} />;
  }

  return <input type={maskType} className={`input ${className}`} {...rest} />;
};
