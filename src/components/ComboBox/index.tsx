import React from 'react';

interface IProps {
  value: any;
  onChange: any;

  name?: string;
  title?: string;
  fieldSize?: number;
  onBlur?: any;
  disabled?: boolean;
  inline?: boolean;

  memberName?: string;
  memberValue?: string;
  data: any[];
  defaultValue?: any;
  emptyText?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export const ComboBox: React.FC<IProps> = ({ id, name, value, onChange, disabled, emptyText, data, memberValue, memberName, className }) => {
  const handleOnChange = async (e: any) => {
    const selectedValue = e.target.value;

    const type = memberValue ? typeof data[0][memberValue] : typeof data[0];

    await onChange(type === 'number' ? +selectedValue : selectedValue);
  };

  return (
    <select id={id} name={name} className={`input ${className}`} onChange={handleOnChange} value={value} disabled={disabled}>
      {emptyText && <option value="">{emptyText}</option>}

      {data.map((item, index) => {
        const itemValue = memberValue ? item[memberValue] : item;
        const itemName = memberName ? item[memberName] : item;

        return (
          <option key={index} value={itemValue}>
            {itemName}
          </option>
        );
      })}
    </select>
  );
};
