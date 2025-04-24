import { Box, Button, Command, Page, Popover } from "@kamalion/ui";
import { useState } from "react";

export function CommandPage() {
  const [command1, setCommand1] = useState('item11');
  const [command2, setCommand2] = useState('');

  return (
    <Page.Content className="p-4 space-y-5">
      <Box.Root>
        <Box.Header>Simple Command</Box.Header>

        <Box.Content>
          <Command.Root>
            <Command.Input placeholder="Search..." />

            <Command.List>
              <Command.Empty>No results found.</Command.Empty>

              <Command.Group heading="Group 1">
                <Command.Item value="item11" onSelect={() => setCommand1("item11")}>Item 1</Command.Item>
                <Command.Item value="item12" onSelect={() => setCommand1("item12")}>Item 2</Command.Item>
                <Command.Item value="item13" onSelect={() => setCommand1("item13")}>Item 3</Command.Item>
              </Command.Group>

              <Command.Separator />

              <Command.Group heading="Group 2">
                <Command.Item value="item21" onSelect={() => setCommand1("item21")}>Item 1</Command.Item>
                <Command.Item value="item22" onSelect={() => setCommand1("item22")}>Item 2</Command.Item>
                <Command.Item value="item23" onSelect={() => setCommand1("item23")}>Item 3</Command.Item>
              </Command.Group>
            </Command.List>
          </Command.Root>

          <div>{command1}</div>
          <div>{command2}</div>
        </Box.Content>
      </Box.Root>

      <Box.Root>
        <Box.Header>Combobox</Box.Header>
        <Box.Content>
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button.Root variant="accent">
                <Button.Content>Menu</Button.Content>
              </Button.Root>
            </Popover.Trigger>
            <Popover.Content>
              <Command.Root>
                <Command.Input placeholder="Search..." />

                <Command.List>
                  <Command.Empty>No results found.</Command.Empty>

                  <Command.Group heading="Group 1">
                    <Command.Item value="item11" onSelect={() => setCommand2("item11")}>Item 1</Command.Item>
                    <Command.Item value="item12" onSelect={() => setCommand2("item12")}>Item 2</Command.Item>
                    <Command.Item value="item13" onSelect={() => setCommand2("item13")}>Item 3</Command.Item>
                  </Command.Group>

                  <Command.Separator />

                  <Command.Group heading="Group 2">
                    <Command.Item value="item21" onSelect={() => setCommand2("item21")}>Item 1</Command.Item>
                    <Command.Item value="item22" onSelect={() => setCommand2("item22")}>Item 2</Command.Item>
                    <Command.Item value="item23" onSelect={() => setCommand2("item23")}>Item 3</Command.Item>
                  </Command.Group>
                </Command.List>
              </Command.Root>
            </Popover.Content>
          </Popover.Root>
        </Box.Content>
      </Box.Root>
    </Page.Content>
  );
}