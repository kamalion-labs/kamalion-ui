import { ReactNode } from "react";
import { ToastType } from "../components";
interface ToastProviderProps {
    showToast: ({ message, type }: {
        message: string;
        type?: ToastType;
    }) => void;
}
export declare const ToastContext: import("react").Context<ToastProviderProps | null>;
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): ToastProviderProps;
export {};
