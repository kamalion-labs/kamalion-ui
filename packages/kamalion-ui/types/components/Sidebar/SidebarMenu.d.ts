import { ReactNode } from "react";
import { NavRoute } from "../..";
interface SidebarMenuProps {
    children?: ReactNode;
    routes?: NavRoute[];
}
export declare function SidebarMenu({ children, routes }: SidebarMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
