import { ReactNode } from "react";
import { create } from "zustand";

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
  navOpen: boolean;

  toggleNav: () => void;
  setCurrentId: (id: string) => void;
  setParentId: (parentId: string) => void;
  setRoutes: (routes: NavRoute[]) => void;
}

export const useNav = create<NavState>((set) => ({
  currentId: "",
  parentId: "",
  routes: [],
  navOpen: false,

  toggleNav: () => set((state) => ({ navOpen: !state.navOpen })),

  setCurrentId: () => set((state) => ({ currentId: state.currentId })),
  setParentId: () => set((state) => ({ parentId: state.parentId })),
  setRoutes: () => set((state) => ({ routes: state.routes })),
}));
