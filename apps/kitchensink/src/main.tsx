import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { KamalionProvider } from "@kamalion/web-ui";
// Fonts first: the `@font-face` rules must land before the utilities that
// reference them. Fontsource's variable packages declare the families
// "Inter Variable" / "JetBrains Mono Variable", which is exactly what leads
// the `--font-sans` / `--font-mono` stacks in the library.
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@kamalion/web-ui/styles";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KamalionProvider>
      <RouterProvider router={router} />
    </KamalionProvider>
  </StrictMode>,
);
