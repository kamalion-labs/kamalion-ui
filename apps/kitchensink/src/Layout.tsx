import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Navbar, ThemeSelector } from "@kamalion/web-ui";
import { demoRoutes } from "./registry";

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-200 via-rose-100 to-sky-200 p-4">
      <div className="mx-auto flex h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-(--radius-window) border border-(--color-window-glass-border) bg-(--color-window-glass) shadow-(--shadow-panel) backdrop-blur-(--backdrop-blur-amount)">
        <Navbar>
          <Navbar.Header>
            <span className="text-sm font-semibold">Kamalion UI</span>
          </Navbar.Header>

          <Navbar.Content>
            <Navbar.Menu>
              <Navbar.Menu.Category>Components</Navbar.Menu.Category>
              {demoRoutes.map((route) => (
                <Navbar.Menu.Item
                  key={route.path}
                  asChild
                  active={pathname === `/${route.path}`}
                >
                  <NavLink to={`/${route.path}`}>{route.label}</NavLink>
                </Navbar.Menu.Item>
              ))}
            </Navbar.Menu>
          </Navbar.Content>

          <Navbar.Footer>
            <ThemeSelector />
          </Navbar.Footer>
        </Navbar>

        <main className="m-3 ml-0 flex-1 overflow-auto rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) p-8 text-(--color-foreground) shadow-(--color-surface-panel-shadow)">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
