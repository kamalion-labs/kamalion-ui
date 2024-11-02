import { ReactNode } from "react";
export type ToastType = "success" | "danger" | "info" | "warning";
export type ToastTypeMap = {
    [key in ToastType]: {
        color: string;
        icon: ReactNode;
        iconBg: string;
        border: string;
    };
};
interface Props {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    onFinished: (e: unknown) => void;
}
export declare function Toast({ message, type, isVisible, onClose, onFinished, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
