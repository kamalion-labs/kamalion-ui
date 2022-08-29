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
export declare const ComboBox: React.FC<IProps>;
export {};
