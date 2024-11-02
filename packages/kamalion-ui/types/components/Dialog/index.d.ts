import * as DialogPrimitive from "@radix-ui/react-dialog";
export declare const Dialog: {
    Root: import("react").FC<DialogPrimitive.DialogProps>;
    Trigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Portal: {
        ({ ...props }: DialogPrimitive.DialogPortalProps): import("react/jsx-runtime").JSX.Element;
        displayName: string | undefined;
    };
    Overlay: import("react").ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Content: import("react").ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Header: {
        ({ className, ...props }: import("react").HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Footer: {
        ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
        displayName: string;
    };
    Title: import("react").ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>, "ref"> & import("react").RefAttributes<HTMLHeadingElement>>;
    Description: import("react").ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>, "ref"> & import("react").RefAttributes<HTMLParagraphElement>>;
};
