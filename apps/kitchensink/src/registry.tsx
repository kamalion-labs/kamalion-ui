import type { ReactNode } from "react";
import { ButtonPage } from "./pages/button";
import { BoxPage, TextPage } from "./pages/primitives";
import {
  AlertPage,
  AvatarPage,
  BadgePage,
  BreadcrumbPage,
  CodePage,
  LoadingPage,
} from "./pages/display";
import {
  CardPage,
  ModalPage,
  PopoverPage,
  ToastPage,
  TooltipPage,
} from "./pages/interactive";
import { FormsPage } from "./pages/forms";
import { CalendarPage, DataViewPage, TablePage } from "./pages/data";
import { AppShellPage } from "./pages/app-shell";

export interface DemoRoute {
  /** URL path segment, e.g. "button" → /button. Matches Maestro tests.yaml. */
  path: string;
  /** Nav label. */
  label: string;
  element: ReactNode;
}

/**
 * Registry of component demo pages. Add one entry per component as it lands.
 * The router and sidebar nav are both generated from this list.
 */
export const demoRoutes: DemoRoute[] = [
  { path: "box", label: "Box", element: <BoxPage /> },
  { path: "text", label: "Text", element: <TextPage /> },
  { path: "button", label: "Button", element: <ButtonPage /> },
  { path: "badge", label: "Badge", element: <BadgePage /> },
  { path: "code", label: "Code", element: <CodePage /> },
  { path: "alert", label: "Alert", element: <AlertPage /> },
  { path: "avatar", label: "Avatar", element: <AvatarPage /> },
  { path: "loading", label: "Loading", element: <LoadingPage /> },
  { path: "breadcrumb", label: "Breadcrumb", element: <BreadcrumbPage /> },
  { path: "tooltip", label: "Tooltip", element: <TooltipPage /> },
  { path: "popover", label: "Popover", element: <PopoverPage /> },
  { path: "card", label: "Card", element: <CardPage /> },
  { path: "toast", label: "Toast", element: <ToastPage /> },
  { path: "modal", label: "Modal", element: <ModalPage /> },
  { path: "forms", label: "Form & Input", element: <FormsPage /> },
  { path: "table", label: "Table", element: <TablePage /> },
  { path: "calendar", label: "Calendar", element: <CalendarPage /> },
  { path: "data-view", label: "DataView", element: <DataViewPage /> },
  { path: "app-shell", label: "Page & Navbar", element: <AppShellPage /> },
];
