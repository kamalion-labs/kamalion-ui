import { ReactNode } from "react";
type InputErrorsProps = {
    error?: ReactNode;
};
type InputErrorProps = React.HTMLAttributes<HTMLDivElement> & InputErrorsProps;
export declare function InputError({ className, children }: InputErrorProps): import("react/jsx-runtime").JSX.Element;
export {};
