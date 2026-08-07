import type { ReactNode } from "react";
import {
  AppWindow,
  Bell,
  CalendarDays,
  ChevronsRight,
  CircleUser,
  Code2,
  LayoutList,
  LoaderCircle,
  MessageSquare,
  MousePointerClick,
  PanelLeft,
  PanelTop,
  SquareDashed,
  SquareStack,
  Table as TableIcon,
  Tag,
  TextCursorInput,
  TriangleAlert,
  Type,
} from "lucide-react";
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
  /** Sidebar icon, passed to `Navbar.Menu.Item`'s `icon` prop. */
  icon: ReactNode;
  /** Which sidebar group the item belongs to. */
  group: "Primitives" | "Display" | "Interactive" | "Data";
  element: ReactNode;
}

/**
 * Registry of component demo pages. Add one entry per component as it lands.
 * The router and sidebar nav are both generated from this list.
 */
export const demoRoutes: DemoRoute[] = [
  { path: "box", label: "Box", group: "Primitives", icon: <SquareDashed />, element: <BoxPage /> },
  { path: "text", label: "Text", group: "Primitives", icon: <Type />, element: <TextPage /> },
  { path: "button", label: "Button", group: "Primitives", icon: <MousePointerClick />, element: <ButtonPage /> },
  { path: "code", label: "Code", group: "Primitives", icon: <Code2 />, element: <CodePage /> },

  { path: "badge", label: "Badge", group: "Display", icon: <Tag />, element: <BadgePage /> },
  { path: "alert", label: "Alert", group: "Display", icon: <TriangleAlert />, element: <AlertPage /> },
  { path: "avatar", label: "Avatar", group: "Display", icon: <CircleUser />, element: <AvatarPage /> },
  { path: "loading", label: "Loading", group: "Display", icon: <LoaderCircle />, element: <LoadingPage /> },
  { path: "breadcrumb", label: "Breadcrumb", group: "Display", icon: <ChevronsRight />, element: <BreadcrumbPage /> },

  { path: "tooltip", label: "Tooltip", group: "Interactive", icon: <MessageSquare />, element: <TooltipPage /> },
  { path: "popover", label: "Popover", group: "Interactive", icon: <PanelTop />, element: <PopoverPage /> },
  { path: "card", label: "Card", group: "Interactive", icon: <SquareStack />, element: <CardPage /> },
  { path: "toast", label: "Toast", group: "Interactive", icon: <Bell />, element: <ToastPage /> },
  { path: "modal", label: "Modal", group: "Interactive", icon: <AppWindow />, element: <ModalPage /> },
  { path: "forms", label: "Form & Input", group: "Interactive", icon: <TextCursorInput />, element: <FormsPage /> },

  { path: "table", label: "Table", group: "Data", icon: <TableIcon />, element: <TablePage /> },
  { path: "calendar", label: "Calendar", group: "Data", icon: <CalendarDays />, element: <CalendarPage /> },
  { path: "data-view", label: "DataView", group: "Data", icon: <LayoutList />, element: <DataViewPage /> },
  { path: "app-shell", label: "Page & Navbar", group: "Data", icon: <PanelLeft />, element: <AppShellPage /> },
];

/** Sidebar group order. */
export const demoGroups = [
  "Primitives",
  "Display",
  "Interactive",
  "Data",
] as const;
