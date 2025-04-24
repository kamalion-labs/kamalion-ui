import { Page, Sidebar } from "@kamalion/ui";
import routes from "../routes";
import logo from "../assets/logo.svg";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <Page.Root>
      <Page.Sidebar>
        <Sidebar.Root>
          <Sidebar.Header>
            <div className="flex gap-x-3">
              <img src={logo} alt="logo" className="w-8" />
              <span className="font-normal text-2xl font-montserrat">
                Kamalion UI
              </span>
            </div>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu routes={routes} />
          </Sidebar.Content>

          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar.Root>
      </Page.Sidebar>

      <Page.Wrapper>
        <Page.Header>Título</Page.Header>

        <Outlet />
      </Page.Wrapper>
    </Page.Root>
  );
}
