import React from 'react';
export declare type ButtonType = 'primary' | 'secondary' | 'danger' | 'warn' | 'info' | 'success';
export declare type ButtonSize = 'small' | 'normal' | 'large';
interface IProps {
    children: any;
    onClick?: () => Promise<void>;
    type?: ButtonType;
    size?: ButtonSize;
    icon?: any;
    usesLoader?: boolean;
    loadingText?: string;
    className?: string;
}
export declare const Button: React.FC<IProps>;
export {};
