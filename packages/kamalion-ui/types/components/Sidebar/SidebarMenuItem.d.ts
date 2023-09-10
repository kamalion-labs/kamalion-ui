import { ReactNode } from "react";
interface SidebarMenuItemProps {
    text: string;
    id: string;
    href?: string;
    icon?: ReactNode;
}
export declare function SidebarMenuItem({ text, href, icon, id, }: SidebarMenuItemProps): import("react/jsx-runtime").JSX.Element;
export {};
