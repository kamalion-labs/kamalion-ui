export declare const Command: {
    Root: import("react").ForwardRefExoticComponent<Omit<{
        children?: import("react").ReactNode;
    } & Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild"> & {
        label?: string;
        shouldFilter?: boolean;
        filter?: (value: string, search: string, keywords?: string[]) => number;
        defaultValue?: string;
        value?: string;
        onValueChange?: (value: string) => void;
        loop?: boolean;
        disablePointerSelection?: boolean;
        vimBindings?: boolean;
    } & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Input: import("react").ForwardRefExoticComponent<Omit<Omit<Pick<Pick<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof import("react").InputHTMLAttributes<HTMLInputElement>> & {
        ref?: import("react").Ref<HTMLInputElement>;
    } & {
        asChild?: boolean;
    }, "key" | "asChild" | keyof import("react").InputHTMLAttributes<HTMLInputElement>>, "onChange" | "value" | "type"> & {
        value?: string;
        onValueChange?: (search: string) => void;
    } & import("react").RefAttributes<HTMLInputElement>, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
    List: import("react").ForwardRefExoticComponent<Omit<{
        children?: import("react").ReactNode;
    } & Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild"> & {
        label?: string;
    } & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Empty: import("react").ForwardRefExoticComponent<Omit<{
        children?: import("react").ReactNode;
    } & Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild"> & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Group: import("react").ForwardRefExoticComponent<Omit<{
        children?: import("react").ReactNode;
    } & Omit<Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild">, "heading" | "value"> & {
        heading?: import("react").ReactNode;
        value?: string;
        forceMount?: boolean;
    } & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Item: import("react").ForwardRefExoticComponent<Omit<{
        children?: import("react").ReactNode;
    } & Omit<Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "value" | "disabled"> & {
        disabled?: boolean;
        onSelect?: (value: string) => void;
        value?: string;
        keywords?: string[];
        forceMount?: boolean;
    } & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Shortcut: {
        ({ className, ...props }: import("react").HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Separator: import("react").ForwardRefExoticComponent<Omit<Pick<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: import("react").Ref<HTMLDivElement>;
    } & {
        asChild?: boolean;
    }, "key" | keyof import("react").HTMLAttributes<HTMLDivElement> | "asChild"> & {
        alwaysRender?: boolean;
    } & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
