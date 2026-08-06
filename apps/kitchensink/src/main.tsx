import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { KamalionProvider } from "@kamalion/web-ui";
import "@kamalion/web-ui/styles";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KamalionProvider>
      <RouterProvider router={router} />
    </KamalionProvider>
  </StrictMode>,
);
