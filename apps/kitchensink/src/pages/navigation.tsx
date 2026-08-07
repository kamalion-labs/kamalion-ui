import {
  Copy,
  FileText,
  Pencil,
  Plus,
  Trash2,
  User,
  Users,
} from "lucide-react";
import {
  Accordion,
  Badge,
  Button,
  DropdownMenu,
  EmptyState,
  Tabs,
  Text,
} from "@kamalion/web-ui";

export function TabsPage() {
  return (
    <div className="flex flex-col gap-10">
      <Text.H1>Tabs</Text.H1>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-(--color-foreground-muted)">
          Line (default), with counts
        </h2>
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Trigger value="all" trailing="128">
              All
            </Tabs.Trigger>
            <Tabs.Trigger value="pending" trailing="4">
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger value="approved" trailing="124">
              Approved
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="all">Every review.</Tabs.Content>
          <Tabs.Content value="pending">Waiting on you.</Tabs.Content>
          <Tabs.Content value="approved">Published.</Tabs.Content>
        </Tabs>
      </section>

      {(["pill", "segmented"] as const).map((variant) => (
        <section key={variant} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-(--color-foreground-muted)">
            {variant}
          </h2>
          <Tabs defaultValue="all" variant={variant} className="max-w-md">
            <Tabs.List>
              <Tabs.Trigger value="all">All</Tabs.Trigger>
              <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
              <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="all">Every review.</Tabs.Content>
            <Tabs.Content value="pending">Waiting on you.</Tabs.Content>
            <Tabs.Content value="approved">Published.</Tabs.Content>
          </Tabs>
        </section>
      ))}
    </div>
  );
}

export function EmptyStatePage() {
  return (
    <div className="flex flex-col gap-10">
      <Text.H1>EmptyState</Text.H1>

      <div className="rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel)">
        <EmptyState
          icon={<Users />}
          title="No clients yet"
          description="Add your first client to start booking sessions."
          action={
            <Button>
              <Button.Icon>
                <Plus />
              </Button.Icon>
              <Button.Content>New client</Button.Content>
            </Button>
          }
        />
      </div>

      <div className="max-w-sm rounded-(--radius-card) border border-(--color-border)">
        <EmptyState size="sm" title="Nothing here" />
      </div>
    </div>
  );
}

export function DropdownMenuPage() {
  return (
    <div className="flex flex-col gap-10">
      <Text.H1>DropdownMenu</Text.H1>
      <Text.Muted>
        A real menu — role=&quot;menu&quot;, roving tabindex, typeahead. Reach
        for this over Button.Dropdown whenever the content is a list of
        commands.
      </Text.Muted>

      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>Session</DropdownMenu.Label>
            <DropdownMenu.Item icon={<Pencil />}>Edit</DropdownMenu.Item>
            <DropdownMenu.Item icon={<Copy />} shortcut="⌘D">
              Duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item variant="danger" icon={<Trash2 />}>
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="soft">Assign</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item icon={<User />}>Me</DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>Someone else</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>Ana</DropdownMenu.Item>
                <DropdownMenu.Item>Bruno</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function AccordionPage() {
  return (
    <div className="flex flex-col gap-10">
      <Text.H1>Accordion</Text.H1>

      <Accordion type="single" collapsible className="max-w-md">
        <Accordion.Item value="parties">
          <Accordion.Trigger
            icon={<FileText />}
            trailing={<Badge size="sm">3</Badge>}
          >
            Parties
          </Accordion.Trigger>
          <Accordion.Content>Who is signing this contract.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="scope">
          <Accordion.Trigger>Scope</Accordion.Trigger>
          <Accordion.Content>
            What is being delivered, and when.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="payment">
          <Accordion.Trigger>Payment</Accordion.Trigger>
          <Accordion.Content>
            Amounts, instalments and due dates.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
