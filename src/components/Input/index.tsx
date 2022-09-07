import React from 'react';
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format';

export interface InputProps {
  value: any;
  onChange: (values: NumberFormatValues, sourceInfo?: SourceInfo) => void;

  type?: 'text' | 'password' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
  className?: string;

  name?: string;
  id?: string;
  max?: number;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ id, name, value, onChange, max, type = 'text', className, ...rest }) => {
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
    text: {},
    password: {
      type: 'password' as 'text' | 'password' | 'tel'
    }
  };

  if (type !== 'text' && type !== 'password' && Object.keys(maskProps).includes(type)) {
    return <NumberFormat className={`input ${className}`} value={value} onValueChange={onChange} maxLength={max} {...maskProps[type]} {...rest} />;
  }

  return (
    <input
      type={type}
      className={`input ${className}`}
      onChange={(e) =>
        onChange({
          value: e.target.value,
          floatValue: undefined,
          formattedValue: e.target.value
        })
      }
      value={value}
      maxLength={max}
      {...rest}
    />
  );
};
