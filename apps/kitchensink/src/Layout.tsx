import { Fragment } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Navbar, ThemeSelector } from "@kamalion/web-ui";
import { demoGroups, demoRoutes } from "./registry";

export function Layout() {
  const { pathname } = useLocation();

  return (
    // The window layer below is translucent glass, so this wallpaper is what
    // shows through it — the ambient backdrop the default theme is designed
    // against. `bg-fixed` keeps it still while panels scroll over it.
    <div className="min-h-screen w-full bg-[url('/wallpaper.svg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="flex h-screen w-full overflow-hidden border border-(--color-window-glass-border) bg-(--color-window-glass) shadow-(--shadow-modal) backdrop-blur-(--backdrop-blur-amount)">
        <Navbar>
          <Navbar.Header>
            <span className="text-sm font-semibold">Kamalion UI</span>
          </Navbar.Header>

          <Navbar.Content>
            <Navbar.Menu>
              {demoGroups.map((group) => (
                <Fragment key={group}>
                  <Navbar.Menu.Category>{group}</Navbar.Menu.Category>
                  {demoRoutes
                    .filter((route) => route.group === group)
                    .map((route) => (
                      <Navbar.Menu.Item
                        key={route.path}
                        asChild
                        icon={route.icon}
                        active={pathname === `/${route.path}`}
                      >
                        <NavLink to={`/${route.path}`}>{route.label}</NavLink>
                      </Navbar.Menu.Item>
                    ))}
                </Fragment>
              ))}
            </Navbar.Menu>
          </Navbar.Content>

          <Navbar.Footer className="justify-between">
            <span className="text-xs font-medium text-(--color-sidebar-fg-muted) group-data-[collapsed]/navbar:hidden">Alternar Tema</span>
            <ThemeSelector />
          </Navbar.Footer>
        </Navbar>

        <main className="m-3 ml-0 flex-1 overflow-auto rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) p-8 text-(--color-foreground) shadow-(--shadow-overlay)">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
