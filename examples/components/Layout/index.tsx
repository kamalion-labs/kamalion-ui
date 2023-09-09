import { ReactNode } from "react";
import { Page, Sidebar } from "../../../src/components";
import { routes } from "../../router/routes";
import logo from "../../assets/logo.svg";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Page.Root>
      <Page.Sidebar>
        <Sidebar.Root>
          <Sidebar.Header>
            <img src={logo} alt="logo" className="w-8" />
            <span className="font-normal text-2xl font-montserrat">
              Kamalion UI
            </span>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu routes={routes} />
          </Sidebar.Content>

          <Sidebar.Footer>Footer</Sidebar.Footer>
        </Sidebar.Root>
      </Page.Sidebar>

      <Page.Wrapper>
        <Page.Header>Título</Page.Header>

        {children}
      </Page.Wrapper>
    </Page.Root>
  );
}
