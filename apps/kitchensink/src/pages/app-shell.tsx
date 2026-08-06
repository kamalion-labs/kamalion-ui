import { Home } from "lucide-react";
import { Navbar, Page, Resizable, Text, usePage } from "@kamalion/web-ui";

function DashboardView() {
  usePage({
    title: "Dashboard",
    subtitle: "This header is set dynamically via usePage()",
  });
  return (
    <Page.Content className="p-6">
      <Text.Paragraph>
        Main content area. Drag the dividers to resize the panels. The header
        above is driven by <Text.Code>usePage()</Text.Code>.
      </Text.Paragraph>
    </Page.Content>
  );
}

export function AppShellPage() {
  return (
    <div className="flex flex-col gap-6">
      <Text.H1>Page, Navbar &amp; Resizable</Text.H1>
      <Text.Muted>
        A composed application shell: a sidebar with a nested submenu, a
        resizable main area with a usePage-driven header, and a right sidebar.
      </Text.Muted>

      <div className="h-[460px] overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel)">
        <Page>
          <Resizable>
            <Resizable.Panel
              defaultSize={26}
              minSize={16}
              className="bg-(--color-surface-panel-muted)"
            >
              <Navbar className="h-full">
                <Navbar.Header>
                  <span className="text-sm font-semibold">Acme Inc.</span>
                </Navbar.Header>
                <Navbar.Content>
                  <Navbar.Menu>
                    <Navbar.Menu.Item active>
                      <Home />
                      Home
                    </Navbar.Menu.Item>
                    <Navbar.Menu.Item defaultOpen>
                      <Navbar.Menu.Item.Trigger>
                        Reports
                      </Navbar.Menu.Item.Trigger>
                      <Navbar.Menu.Item.Content>
                        <Navbar.Menu.Item>Monthly</Navbar.Menu.Item>
                        <Navbar.Menu.Item>Yearly</Navbar.Menu.Item>
                      </Navbar.Menu.Item.Content>
                    </Navbar.Menu.Item>
                  </Navbar.Menu>
                </Navbar.Content>
              </Navbar>
            </Resizable.Panel>

            <Resizable.Handle withGrip />

            <Resizable.Panel minSize={30}>
              <div className="flex h-full flex-col">
                <Page.Header />
                <DashboardView />
              </div>
            </Resizable.Panel>

            <Resizable.Handle withGrip />

            <Resizable.Panel defaultSize={24} minSize={14}>
              <Page.Sidebar className="h-full w-full border-l-0">
                <Page.Sidebar.Header>Details</Page.Sidebar.Header>
                <Page.Sidebar.Content>
                  <Text.Muted>Auxiliary panel content.</Text.Muted>
                </Page.Sidebar.Content>
              </Page.Sidebar>
            </Resizable.Panel>
          </Resizable>
        </Page>
      </div>
    </div>
  );
}
