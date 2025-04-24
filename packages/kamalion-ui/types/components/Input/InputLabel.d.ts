import * as React from "react";
type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
};
export declare function InputLabel({ className, children, required, ...props }: InputLabelProps): import("react/jsx-runtime").JSX.Element;
export {};
