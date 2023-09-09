import { FaBars, FaBeerMugEmpty, FaWpforms } from "react-icons/fa6";

import { NavRoute } from "../../src/stores";

import { HomePage } from "../pages/home";
import { AccordionPage } from "../pages/accordion";

export const routes: NavRoute[] = [
  {
    id: "form",
    title: "Form",
    path: "/",
    showInMenu: true,
    icon: <FaWpforms />,
    element: <HomePage />,
  },
  {
    id: "accordion",
    title: "Accordion",
    path: "/accordion",
    showInMenu: true,
    icon: <FaBars />,
    element: <AccordionPage />,
  },
  {
    id: "submenu",
    title: "Submenu",
    showInMenu: true,
    icon: <FaBeerMugEmpty />,
    items: [
      {
        id: "home2",
        title: "Home 2",
        path: "/home2",
        showInMenu: true,
        element: <HomePage />,
      },
    ],
  },
];
