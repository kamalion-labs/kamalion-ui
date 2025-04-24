import { ReactNode } from "react";
import { type RouteObject } from "react-router";
export type NavRoute = {
    id: string;
    title: string;
    path: string;
    icon?: ReactNode;
    showInMenu?: boolean;
    menuRoutes?: boolean;
    element?: ReactNode;
    errorElement?: ReactNode;
    index?: boolean;
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
export declare function createRoutesList(routes: NavRoute[], mainErrorElement: ReactNode): RouteObject[];
export {};
