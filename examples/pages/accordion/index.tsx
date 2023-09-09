import { Accordion, Box, Page } from "../../../src/components";
import { Layout } from "../../components/Layout";

export function AccordionPage() {
  return (
    <Layout>
      <Page.Content className="p-4">
        <Box.Root>
          <Box.Header>Simple Form</Box.Header>

          <Box.Content>
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item-1">
                <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-2">
                <Accordion.Trigger>Is it styled?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="item-3">
                <Accordion.Trigger>Is it animated?</Accordion.Trigger>
                <Accordion.Content>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </Box.Content>
        </Box.Root>
      </Page.Content>
    </Layout>
  );
}
