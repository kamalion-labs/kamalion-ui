import { ReactNode } from "react";
import { type RouteObject } from "react-router";
import { create } from "zustand";

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

export const useNav = create<NavState>((set) => ({
  currentId: "",
  parentId: "",
  routes: [],

  setCurrentId: () => set((state) => ({ currentId: state.currentId })),
  setParentId: () => set((state) => ({ parentId: state.parentId })),
  setRoutes: () => set((state) => ({ routes: state.routes })),
}));


export function createRoutesList(routes: NavRoute[], mainErrorElement: ReactNode): RouteObject[] {
  if (!routes || routes.length === 0)
    return [];

  const routesList: RouteObject[] = routes.map((route) => {
    const rt: RouteObject = {
      index: route.index ?? false,
      path: route.path,
      element: route.element,
      errorElement: route.errorElement ?? mainErrorElement,
      //children: createRoutesList(route.items, mainErrorElement),
    };

    if(!route.index && route.items) {
      rt.children = createRoutesList(route.items, mainErrorElement);
    }

    return rt;
  });

  // routes.forEach(({ path, element, items }) => {
  //   if (items && items.length > 0) {
  //     items.forEach((item) => {
  //       routesList.push({
  //         path: item.path,
  //         element: item.element,
  //         errorElement: item.errorElement,
  //         index: item.index,
  //       });
  //     });
  //   }

  //   routesList.push({
  //     path,
  //     element,
  //     errorElement: mainErrorElement,
  //   });
  // });

  return routesList;
}