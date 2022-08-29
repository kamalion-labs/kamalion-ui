import React from 'react';
export interface InputProps {
    maskType?: 'text' | 'tel' | 'cel' | 'money' | 'percent' | 'date';
    className?: string;
    name?: string;
    id?: string;
}
export declare const Input: React.FC<InputProps>;
