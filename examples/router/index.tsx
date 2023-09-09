import { RouteObject, createBrowserRouter } from "react-router-dom";

import { NavRoute } from "../../src/stores";
import { routes } from "./routes";

function getRouterDomRoutes(routes: NavRoute[]) {
  const routesList: RouteObject[] = [];

  routes.forEach(({ path, element, items }) => {
    if (items && items.length > 0) {
      items.forEach((item) => {
        routesList.push({
          path: item.path,
          element: item.element,
        });
      });
    }

    routesList.push({
      path,
      element,
    });
  });

  return routesList;
}

export const router = createBrowserRouter(getRouterDomRoutes(routes));
