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

### 1. Barrel files (`index.tsx`)

The barrel file is the entry point for the component. It should export the component and its sub-components (if any).

#### Example of barrel file for a component with sub-components

```typescript
import { MyComponentRoot } from './MyComponentRoot'
import { MyComponentContent } from './MyComponentContent'
import { MyComponentTrigger } from './MyComponentTrigger'

export const MyComponent = Object.assign(MyComponentRoot, {
  Content: MyComponentContent,
  Trigger: MyComponentTrigger
})

export type * from './types'
```

### 2. Component Implementation

#### Root Component

Controls shared state (via React Context, if necessary) and defines the structural root. If the component is standalone (not compound), export the component directly and do not create a `MyComponentRoot` folder, only a `index.tsx` file.

> [!NOTE]
> **React 19.2 Standard:** Passing references (`ref`) is done as a conventional property (prop), without the need to use `forwardRef`.

##### Example of component without context

```typescript
import React from 'react';
import { cn } from '@/utils/cn';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
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
      {...props}
    >
      {children}
    </div>
  );
}