import { createRoot } from "react-dom/client";
import { createHashRouter, Outlet, RouterProvider } from "react-router";

import "./styles/global.css";
import { createRoutesList, DialogProvider, PageProvider, ToastProvider } from "@kamalion/ui";
import routes from "./routes";

const router = createHashRouter([
  {
    element: (
      <PageProvider>
        <ToastProvider>
          <DialogProvider>
            <Outlet />
          </DialogProvider>
        </ToastProvider>
      </PageProvider>
    ),
    children: createRoutesList(routes, <div>404</div>),
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
