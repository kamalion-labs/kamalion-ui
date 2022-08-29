/// <reference types="react" />
interface IProps {
    children: any;
    type: 'danger' | 'warning' | 'success' | 'info';
    className?: string;
}
export declare const Alert: React.FC<IProps>;
export {};
