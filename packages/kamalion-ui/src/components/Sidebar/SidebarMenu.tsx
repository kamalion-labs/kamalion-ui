import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ReactNode } from "react";
import { NavRoute } from "../../stores";
import { Sidebar } from "../..";

interface SidebarMenuProps {
  children?: ReactNode;
  routes?: NavRoute[];
}

export function SidebarMenu({ children, routes }: SidebarMenuProps) {
  return (
    <NavigationMenu.Root orientation="vertical" className="itc-sidebar-menu relative text-sm">
      <NavigationMenu.List className="itc-sidebar-menu-list flex list-none flex-col justify-center rounded">
        {routes && routes
          .find(x => x.menuRoutes)
          .items
          .filter((x) => x.showInMenu)
          .map((route, idx) => {
            const subroutes = route.items?.filter((x) => x.showInMenu);
            if (subroutes && subroutes?.length > 0) {
              return (
                <Sidebar.MenuGroup
                  key={idx}
                  id={route.id}
                  text={route.title}
                  icon={route.icon}
                >
                  {subroutes.map((subroute, idx2) => (
                    <Sidebar.MenuItem
                      key={idx2}
                      text={subroute.title}
                      icon={subroute.icon}
                      href={subroute.path}
                      id={subroute.id}
                    />
                  ))}
                </Sidebar.MenuGroup>
              );
            }
            return (
              <Sidebar.MenuItem
                key={idx}
                text={route.title}
                icon={route.icon}
                href={route.path}
                id={route.id}
              />
            );
          })}

        {!routes && children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
