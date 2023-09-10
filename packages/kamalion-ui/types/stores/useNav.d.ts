import { ReactNode } from "react";
export type NavRoute = {
    id: string;
    title: string;
    icon?: ReactNode;
    showInMenu?: boolean;
    path?: string;
    element?: ReactNode;
    items?: NavRoute[];
};
interface NavState {
    currentId: string;
    parentId?: string;
    routes: NavRoute[];
    setCurrentId: (id: string) => void;
    setParentId: (parentId: string) => void;
    setRoutes: (routes: NavRoute[]) => void;
}
export declare const useNav: import("zustand").UseBoundStore<import("zustand").StoreApi<NavState>>;
export {};
