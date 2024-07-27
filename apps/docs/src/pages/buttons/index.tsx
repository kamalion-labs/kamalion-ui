import { Box, Button, Page } from "@kamalion/ui";
import { Layout } from "../../components/Layout";
import { FaBeerMugEmpty } from "react-icons/fa6";

export function ButtonsPage() {
  return (
    <Layout>
      <Page.Content className="p-4 space-y-3">
        <Box.Root>
          <Box.Header>Button Variants</Box.Header>

          <Box.Content className="space-x-3">
            <Button.Root>
              <Button.Content>Button</Button.Content>
            </Button.Root>

            <Button.Root variant="accent">
              <Button.Content>Button</Button.Content>
            </Button.Root>

            <Button.Root variant="danger">
              <Button.Content>Button</Button.Content>
            </Button.Root>

            <Button.Root variant="success">
              <Button.Content>Button</Button.Content>
            </Button.Root>

            <Button.Root variant="ghost">
              <Button.Content>Button</Button.Content>
            </Button.Root>
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Header>Button Icons</Box.Header>

          <Box.Content className="space-y-3">
            <div className="space-x-3">
              <Button.Root>
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root variant="accent">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root variant="danger">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root variant="success">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root variant="ghost">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>
            </div>
            
            <div className="space-x-3">
              <Button.Root>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="accent">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="danger">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="success">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="ghost">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>
            </div>
            
            <div className="space-x-3">
              <Button.Root size="icon">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root size="icon" variant="accent">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root size="icon" variant="danger">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root size="icon" variant="success">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root size="icon" variant="ghost">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>
            </div>
          </Box.Content>
        </Box.Root>

        <Box.Root>
          <Box.Header>Button Loading</Box.Header>

          <Box.Content className="space-y-3">
            <div className="space-x-3">
              <Button.Root isLoading={true}>
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root isLoading={true} variant="accent">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root isLoading={true} variant="danger">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root isLoading={true} variant="success">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>

              <Button.Root isLoading={true} variant="ghost">
                <Button.Content>Button</Button.Content>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
              </Button.Root>
            </div>
            
            <div className="space-x-3">
              <Button.Root>
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="accent">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="danger">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="success">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>

              <Button.Root variant="ghost">
                <Button.Icon><FaBeerMugEmpty /></Button.Icon>
                <Button.Content>Button</Button.Content>
              </Button.Root>
            </div>
          </Box.Content>
        </Box.Root>
      </Page.Content>
    </Layout>
  );
}
