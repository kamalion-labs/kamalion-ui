/// <reference types="react" />
interface IProps {
    children: any;
    type: 'danger' | 'warning' | 'success' | 'info';
    className?: string;
}
export declare const Badge: React.FC<IProps>;
export {};
