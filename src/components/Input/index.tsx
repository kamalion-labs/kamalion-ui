import React from 'react';
import NumberFormat, { NumberFormatValues, SourceInfo } from 'react-number-format';
import { Button } from '../Button';

export interface InputProps {
  value: any;
  onChange: (values: NumberFormatValues, sourceInfo?: SourceInfo) => void;

  type?: 'text' | 'number' | 'password' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
  className?: string;

  name?: string;
  id?: string;
  max?: number;
  placeholder?: string;

  button?: any;
  onButtonClick?: (e?: any) => void | Promise<void>;
  buttonPosition?: 'left' | 'right';
  buttonIcon?: any;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  max,
  type = 'text',
  className,
  button,
  onButtonClick,
  buttonPosition = 'right',
  buttonIcon,
  ...rest
}) => {
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
    number: {
      isNumericString: true
    },
    password: {
      type: 'password' as 'text' | 'password' | 'tel'
    }
  };

  if (type !== 'text' && type !== 'password' && Object.keys(maskProps).includes(type)) {
    return <NumberFormat className={`input ${className}`} value={value} onValueChange={onChange} maxLength={max} {...maskProps[type]} {...rest} />;
  }

  return (
    <div className={`flex ${className}`}>
      {button && buttonPosition === 'left' && <Button className="rounded-r-none">{button}</Button>}

      <input
        type={type}
        className={`input ${button && 'border-r-0'} ${buttonPosition === 'left' ? 'rounded-l-none' : 'rounded-r-none'}`}
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

      <div className="flex mt-1 h-full">
        {button && buttonPosition === 'right' && <Button className="rounded-l-none my-0 h-[41px] border-0">{button}</Button>}
      </div>
    </div>
  );
};
