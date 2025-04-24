import * as React from "react";
type FormRootProps = React.FormHTMLAttributes<HTMLFormElement> & {
    form: any;
    inline?: boolean;
};
export declare function FormRoot({ children, className, form, inline, ...props }: FormRootProps): import("react/jsx-runtime").JSX.Element;
export {};
