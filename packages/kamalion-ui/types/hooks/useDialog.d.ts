import { ReactNode } from "react";
type ShowDialogProps = {
    content: React.ReactNode;
    title?: string;
    contentClassName?: string;
    onClose?: () => void;
};
interface DialogContextProps {
    showDialog: (props: ShowDialogProps) => void;
    closeDialog: () => void;
}
export declare function DialogProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useDialog(): DialogContextProps;
export {};
