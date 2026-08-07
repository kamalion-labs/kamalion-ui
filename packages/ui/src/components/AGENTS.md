# Kamalion UI - Components

## Folder Structure

Each component should be structured modularly (Compound Components) or directly if it doesn't need sub-components.

### Example of modular structure (Compound Components)

```
MyComponent/
│
├── MyComponentRoot/
│   └── index.tsx       # Main component container. Can declare the component provider if it has a context.
│
├── MyComponentContent/   # Sub-component example
│   └── index.tsx
│
├── MyComponentTrigger/   # Sub-component example
│   └── index.tsx
│
├── index.tsx           # Entry point that exposes the component (Barrel)
│
├── context.tsx         # Component context (only if it needs a context)
│
├── hooks.ts            # Component hooks (only if it needs hooks)
│
├── types.ts            # Component types
│
├── stories.tsx         # Interactive stories (Storybook)
│
├── tokens.css          # Component-specific style tokens definitions
│
└── variants.ts         # Component variant definitions (optional)
```

### Example of direct structure

```
MyComponent/
├── index.tsx           # Component implementation
│
├── context.tsx         # Component context (only if it needs a context)
│
├── hooks.ts            # Component hooks (only if it needs hooks)
│
├── types.ts            # Component types
│
├── stories.tsx         # Interactive stories (Storybook)
│
├── tokens.css          # Component-specific style tokens definitions
│
└── variants.ts         # Component variant definitions (optional)
```

## Component Implementation

> [!IMPORTANT]
> **Imports inside the library are RELATIVE.** The library is published as source (no build
> step), so every cross-file import inside `packages/ui/src` MUST use relative paths (e.g.
> `import { cn } from "../../util"`, `import { Button } from "../button"`). Do **not** use the
> `@utils` / `@components/*` path aliases in shipped source — those would force every consuming
> bundler to mirror the aliases. The examples below that show `@utils` / `@components` are
> illustrative of intent only; write them as relative imports.
> External projects consume components via the package name: `import { Button } from "@kamalion/web-ui";`.

### 1. Barrel files (`index.tsx`)

The barrel file is the entry point for the component. It should export the component and its sub-components (if any).

#### Example of barrel file for a component with sub-components

```typescript
import { MyComponentRoot } from "./MyComponentRoot";
import { MyComponentContent } from "./MyComponentContent";
import { MyComponentTrigger } from "./MyComponentTrigger";

export const MyComponent = Object.assign(MyComponentRoot, {
  Content: MyComponentContent,
  Trigger: MyComponentTrigger,
});

export type * from "./types";
```

### 2. Component Implementation

#### Root Component

Controls shared state (via React Context, if necessary) and defines the structural root. If the component is standalone (not compound), export the component directly and do not create a `MyComponentRoot` folder, only a `index.tsx` file.

> [!NOTE]
> **React 19.2 Standard:** Passing references (`ref`) is done as a conventional property (prop), without the need to use `forwardRef`.

##### Example of component without context

```typescript
import React from 'react';
import { cn } from '@utils';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export function MyComponent({
  className,
  children,
  ref,
  ...props
}: MyComponentProps) {
  return (
    <div
      ref={ref}
      className={cn("my-component", className)}
      {...props}
    >
      {children}
    </div>
  );
}
```

##### Example of component with context

```typescript
import React from "react";
import type { ReactNode } from "react";
import { MyComponentContext } from "./context";

export interface MyComponentRootProps extends React.HTMLAttributes<HTMLDivElement> {
  exampleValue: string;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

export const MyComponentRoot = ({
  exampleValue,
  children,
  ref,
  ...props
}: MyComponentRootProps) => {
  return (
    <MyComponentContext.Provider value={{ exampleValue }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </MyComponentContext.Provider>
  );
};
```

#### Context

```typescript
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface MyComponentContextValue {
  exampleValue: string;
}

export const MyComponentContext = createContext<
  MyComponentContextValue | undefined
>(undefined);

export const useMyComponentContext = () => {
  const ctx = useContext(MyComponentContext);

  if (!ctx) {
    throw new Error(
      "useMyComponentContext must be used within a MyComponent.Root",
    );
  }

  return ctx;
};
```

#### ClassNames & Variants

Component's classNames should be defined using the `cn` util and TailwindCSS v4 classes.

The classNames should be separated in lines by customization type:

- Base class name: `my-component`
- Variant styles: `my-component-variant` (if variants are used, their styles should be defined in `variants.ts`)
- Theme customization: `rounded-(--my-component-border-radius) bg-(--my-component-background-color) text-(--my-component-color)`
- Alignment classes: `flex items-center justify-between`
- Size & Spacing classes: `h-10 w-10`
- Colors & Backgrounds classes: `bg-blue-500 text-white`
- Borders & Shadows classes: `border border-blue-500 shadow-md`
- Hover effects classes: `hover:bg-blue-600`
- Focus effects classes: `focus:bg-blue-700`
- Active effects classes: `active:bg-blue-700`
- Animations classes: `transition-all ease-in-out duration-300`

##### Without Variants

```typescript
import React from "react";
import { cn } from "@utils";

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const MyComponent = ({
  children,
  className,
  ref,
  ...props
}: MyComponentProps) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        // Base class name
        "my-component",
        // Theme customization
        "rounded-(--my-component-border-radius) bg-(--my-component-background-color) text-(--my-component-color)",
        // Alignment classes
        "flex items-center justify-between",
        // Size & Spacing classes
        "h-10 w-10",
        // Colors & Backgrounds classes
        "bg-blue-500 text-white",
        // Borders & Shadows classes
        "border border-blue-500 shadow-md",
        // Hover effects classes
        "hover:bg-blue-600",
        // Focus effects classes
        "focus:bg-blue-700",
        // Active effects classes
        "active:bg-blue-700",
        // Animations classes
        "transition-all ease-in-out duration-300",
        // Custom classes
        className,
      )}
    >
      {children}
    </div>
  );
};
```

##### With Variants

index.tsx

```typescript
import React from "react";
import { cn } from "@utils";
import type { VariantProps } from "class-variance-authority";
import { MyComponentVariants } from "./variants";

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof MyComponentVariants> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const MyComponent = ({
  children,
  variant = "default",
  className,
  ref,
  ...props
}: MyComponentProps) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        `my-component-${variant}`,
        MyComponentVariants({ variant }),
        className,
      )}
    >
      {children}
    </div>
  );
};
```

variants.ts

```typescript
import { cva, type VariantProps } from "class-variance-authority";

export const MyComponentVariants = cva(
  [
    "my-component",
    // Theme customization
    "rounded-(--my-component-border-radius) bg-(--my-component-background-color) text-(--my-component-color)",
    // Alignment classes
    "flex items-center justify-between",
    // Size & Spacing classes
    "h-10 w-10",
    // Colors & Backgrounds classes
    "bg-blue-500 text-white",
    // Borders & Shadows classes
    "border border-blue-500 shadow-md",
    // Hover effects classes
    "hover:bg-blue-600",
    // Focus effects classes
    "focus:bg-blue-700",
    // Active effects classes
    "active:bg-blue-700",
    // Animations classes
    "transition-all ease-in-out duration-300",
  ],
  {
    variants: {
      variant: {
        default:
          "rounded-(--my-component-default-border-radius) bg-(--my-component-default-background-color) text-(--my-component-default-color)",
        outlined:
          "rounded-(--my-component-outlined-border-radius) bg-(--my-component-outlined-background-color) text-(--my-component-outlined-color)",
        soft: "rounded-(--my-component-soft-border-radius) bg-(--my-component-soft-background-color) text-(--my-component-soft-color)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
```

#### Slot

If the component can be used as other component, use the `@radix-ui/react-slot` component:

Example of using a <MyButton /> as <Dialog.Trigger />

MyButton/index.tsx

```typescript
import React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
  asChild?: boolean;
}

export function MyButton({ children, ref, asChild = false, ...props }: MyButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
}
```

Dialog/DialogTrigger/index.tsx

```typescript
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@components/button";

export interface DialogTriggerProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
}

export function DialogTrigger({ children, ref, asChild = false, ...props }: DialogTriggerProps) {
  const Component = asChild ? Slot : Button;
  return (
    <Component
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
}
```

## 3. Styles

Always create tokens for customization of colors, spacings and other styles in the [tokens.css](./tokens.css) file of the component. The tokens must always be initialized using the value `initial`. Their values must always be capable of being customized from the themes available in [web/src/styles/themes](web/src/styles/themes).

The tokens created must always be assigned in each of the themes available in [web/src/styles/themes](web/src/styles/themes), using the base variables from the [tokens.css](web/src/styles/tokens.css) file.

Always use the created tokens or the TailwindCSS v4 variables for customizations.

Never use colors in hexadecimal, rgba or hsl. Always use the created tokens or the TailwindCSS v4 variables.

src/components/MyComponent/tokens.css

```css
@theme {
  --my-component-border-radius: initial;
  --my-component-background-color: initial;
  --my-component-color: initial;

  /* Variants */
  --my-component-default-border-radius: initial;
  --my-component-default-background-color: initial;
  --my-component-default-color: initial;

  --my-component-outlined-border-radius: initial;
  --my-component-outlined-background-color: initial;
  --my-component-outlined-color: initial;

  --my-component-soft-border-radius: initial;
  --my-component-soft-background-color: initial;
  --my-component-soft-color: initial;
}
```

src/styles/tokens.css

```css
@theme {
  /* ─── Semantic colors ─── */
  --color-foreground: initial;
  --color-background: initial;
  --color-accent: initial;
  --color-muted: initial;
  --color-border: initial;

  --color-danger: initial;
  --color-success: initial;
  --color-warning: initial;
  --color-info: initial;

  ...

  --border-radius: initial;
}
```

src/styles/themes/default/light/theme.css

```css
/* Semantic colors */
  --color-foreground: var(--color-slate-900);
  --color-background: var(--color-slate-100);
  --color-accent: var(--color-blue-600);
  --color-muted: var(--color-slate-500);
  --color-border: color-mix(in srgb, var(--color-slate-900) 12%, transparent);

  --color-danger: var(--color-red-700);
  --color-success: var(--color-green-700);
  --color-warning: var(--color-amber-700);
  --color-info: var(--color-blue-700);

  ...

  --border-radius: var(--radius-xl);
}
```

src/styles/themes/default/light/my-component.css

```css
.theme-light {
  /* Base */
  --my-component-border-radius: var(--border-radius);
  --my-component-background-color: var(--color-background);
  --my-component-color: var(--color-foreground);

  /* Variants */
  --my-component-default-border-radius: var(--radius-full);
  --my-component-default-background-color: var(--color-background);
  --my-component-default-color: var(--color-accent);

  --my-component-outlined-border-radius: var(--radius-none);
  --my-component-outlined-background-color: var(--color-background);
  --my-component-outlined-color: var(--color-foreground);

  --my-component-soft-border-radius: var(--border-radius);
  --my-component-soft-background-color: var(--color-background);
  --my-component-soft-color: var(--color-muted);
}
```

src/styles/themes/default/dark/my-component.css

```css
.theme-dark {
  /* Base */
  --my-component-border-radius: var(--border-radius);
  --my-component-background-color: var(--color-background);
  --my-component-color: var(--color-foreground);

  /* Variants */
  --my-component-default-border-radius: var(--border-radius);
  --my-component-default-background-color: var(--color-background);
  --my-component-default-color: var(--color-accent);

  --my-component-outlined-border-radius: var(--radius-none);
  --my-component-outlined-background-color: var(--color-background);
  --my-component-outlined-color: var(--color-foreground);

  --my-component-soft-border-radius: var(--border-radius);
  --my-component-soft-background-color: var(--color-background);
  --my-component-soft-color: var(--color-muted);
}
```

## 4. Storybook, Tests & Kitchensink

> [!IMPORTANT]
> **Validation**: The tests must always be executed successfully after the implementation or modification of the component.
> **Sync**: The stories, tests and kitchensink must always be in sync with the component. If the component changes, the stories, tests and kitchensink must be updated to match the new implementation.

### Storybook

Always create the story for the component in the [stories.tsx](./src/components/my-component/stories.tsx) file. The stories should always be created in the [stories](./src/components/my-component/stories) directory. The stories should be created using the `@storybook/react` framework.

Example of a [stories.tsx](./src/components/my-component/stories.tsx) file:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '../index';

const meta: Meta<typeof MyComponent.Root> = {
  title: 'Components/MyComponent',
  component: MyComponent.Root,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent.Root>;

export const Default: Story = {
  render: (args) => (
    <MyComponent.Root {...args}>
      <MyComponent.Content>Conteúdo de teste</MyComponent.Content>
    </MyComponent.Root>
  ),
  args: {
    variant: 'default',
  },
};

export const Accent: Story = {
  render: (args) => (
    <MyComponent.Root {...args}>
      <MyComponent.Content>Conteúdo em Destaque</MyComponent.Content>
    </MyComponent.Root>
  ),
  args: {
    variant: 'accent',
  },
};
```

### Kitchensink

The kitchensink is a project that uses the `@kamalion/ui` library to demonstrate the usage of the components.

The kitchensink should always be updated to include the new component. The kitchensink should always include all the variants of the component.

/apps/kitchensink/src/pages/layout.tsx

```typescript
import { Page, Navbar } from '@kamalion/ui';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>

      <Page.Content>
        {children}
      </Page.Content>
    </Page>
  );
}
```

/apps/kitchensink/src/pages/components/my-component/index.tsx

```typescript
import { MyComponent } from '@kamalion/ui';

export function MyComponentKitchensinkPage() {
  return (
    <MyComponent>
      <MyComponent.Content>Conteúdo de teste</MyComponent.Content>
    </MyComponent>
  );
}
```

### Tests (Maestro)

The test file must be created in the [tests.yaml](./src/components/my-component/tests.yaml) file. The tests should use the `maestro` framework. The `url` should match the `kitchensink` project's url.

```yaml
url: http://localhost:5173
---
- launchApp
- openLink:
    link: http://localhost:5173/my-component
- assertVisible: "MyComponent"
- tapOn:
    text: MyComponent
- assertVisible: "Default"
```

## Essential Rules to Follow

> [!IMPORTANT]
> **Radix Primitives**: **Always** search for [Radix Primitives](https://www.radix-ui.com/) before creating a new component. If the component already exists in Radix Primitives, use it. If not, create the component from scratch.
>
> **Accessibility**: All components must be accessible. This means that they must be usable by people with disabilities. This includes screen reader users, keyboard users, and users with motor impairments. Follow the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for implementation guidance.
>
> **Styling Exposition**: **Always** expose the standard `className` prop on every component and compound subcomponent for its root element. For components containing internal elements that are not exposed as separate subcomponents (e.g., internal buttons, icons, or labels), expose dedicated styling props following the `className{Element}` pattern (e.g., `classNameButton`, `classNameIcon`, `classNameLabel`). All exposed `className` props must be merged into the target element using the `cn()` utility to provide full styling flexibility.
> Example: If `MyComponent.Root` renders an outer `div` with an internal `<button>` element, it should accept `className` for the outer `div` and `classNameButton` for the internal `<button>` (e.g., `<button className={cn("default-styles", classNameButton)}>`).
>
> **Icons**: **Always** use the `lucide-react` library for icons.
>
> **TailwindCSS v4**: Use TailwindCSS v4 tokens, variables and utilities for styling the components and **Never** use inline styles.
>
> **Focus rings**: **Never** hand-roll a `ring-*` stack. Use the shared `focus-ring` utility (or `focus-ring-within` for composite controls whose focus lands on a descendant, or `focus-ring-inset` for elements clipped by an `overflow-hidden` ancestor). They are defined in `src/styles/utilities.css` and are `outline`-based on purpose — `ring-offset-<color>` paints an opaque gap, which is wrong over this theme's translucent shell.
>
> **Geometry**: Action controls (Button, Badge, sidebar pills, Switch, Avatar) are `--radius-pill`. Field controls (every `Input.*`) are `--radius-control`. Both share the `sm` 32 / `md` 40 / `lg` 48px height ramp — mirror `buttonVariants` and `input/variants.ts` rather than inventing a new one.
>
> **Elevation**: Use the `--shadow-raised` → `--shadow-raised-hover` → `--shadow-floating` → `--shadow-overlay` → `--shadow-modal` ramp. `--color-surface-panel-shadow`, `--color-sidebar-active-shadow` and `--shadow-panel` are deprecated aliases.
>
> **Tinted callouts**: Border and fill take *different* tokens — `border-(--color-{status}-border)` over `bg-(--color-{status}-soft)`. Using the `-soft` token for both composites the same tint twice and the border disappears.
