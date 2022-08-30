import React from 'react';
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format';

export interface InputProps {
  value: any;
  onChange: (values: NumberFormatValues, sourceInfo?: SourceInfo) => void;

  maskType?: 'text' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
  className?: string;

  name?: string;
  id?: string;
  max?: number;
}

export const Input: React.FC<InputProps> = ({ id, name, value, onChange, max, maskType = 'text', className, ...rest }) => {
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
    return (
      <NumberFormat className={`input ${className}`} value={value} onValueChange={onChange} maxLength={max} {...maskProps[maskType]} {...rest} />
    );
  }

  return (
    <input
      type={maskType}
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
