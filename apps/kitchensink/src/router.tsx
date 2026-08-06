import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { demoRoutes } from "./registry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to={`/${demoRoutes[0].path}`} replace /> },
      ...demoRoutes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
    ],
  },
]);
