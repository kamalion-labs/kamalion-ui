import { ReactNode } from "react";
interface SidebarMenuGroupProps {
    children: ReactNode;
    id: string;
    text: string;
    icon?: ReactNode;
}
export declare function SidebarMenuGroup({ children, id, text, icon, }: SidebarMenuGroupProps): import("react/jsx-runtime").JSX.Element;
export {};
