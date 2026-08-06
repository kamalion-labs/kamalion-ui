import { Button } from "@kamalion/web-ui";
import { Plus } from "lucide-react";

const variants = ["solid", "soft", "outline", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

export function ButtonPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold">Button</h1>
        <p className="text-(--color-foreground-muted)">
          Interactive trigger element supporting variants, sizes, loading states,
          and slot composition.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-(--color-foreground-muted)">
          Variants
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-(--color-foreground-muted)">
          Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-(--color-foreground-muted)">
          With icon & loading
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Button.Icon>
              <Plus />
            </Button.Icon>
            <Button.Content>New item</Button.Content>
          </Button>
          <Button variant="soft" loading>
            Saving
          </Button>
        </div>
      </section>
    </div>
  );
}
