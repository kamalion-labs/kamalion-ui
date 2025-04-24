import { FaBars, FaHouse } from "react-icons/fa6";

import { NavRoute } from "@kamalion/ui";

import { HomePage } from "./pages/home";
import { AccordionPage } from "./pages/accordion";
import { ButtonsPage } from "./pages/buttons";
import { CommandPage } from "./pages/command";
import { Layout } from "./pages";

export default [
  {
    id: "app",
    path: "/",
    showInMenu: true,
    menuRoutes: true,
    element: <Layout />,
    items: [
      {
        index: true,
        id: "home",
        title: "Home",
        showInMenu: true,
        icon: <FaHouse />,
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
        id: "Buttons",
        title: "Buttons",
        path: "Buttons",
        showInMenu: true,
        icon: <FaBars />,
        element: <ButtonsPage />,
      },
      {
        id: "Command",
        title: "Command",
        path: "Command",
        showInMenu: true,
        icon: <FaBars />,
        element: <CommandPage />,
      },
    ]
  },
  
  // {
  //   id: "submenu",
  //   title: "Submenu",
  //   path: "/submenu",
  //   showInMenu: true,
  //   icon: <FaBeerMugEmpty />,
  //   items: [
  //     {
  //       id: "home2",
  //       title: "Home 2",
  //       path: "/home2",
  //       showInMenu: true,
  //       element: <HomePage />,
  //     },
  //   ],
  // },
] as NavRoute[];
