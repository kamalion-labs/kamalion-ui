import React from 'react';
import { NumberFormatValues, SourceInfo } from 'react-number-format';
export interface InputProps {
    value: any;
    onChange: (values: NumberFormatValues, sourceInfo?: SourceInfo) => void;
    maskType?: 'text' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
    className?: string;
    name?: string;
    id?: string;
    max?: number;
}
export declare const Input: React.FC<InputProps>;
