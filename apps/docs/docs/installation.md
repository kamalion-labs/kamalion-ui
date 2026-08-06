---
sidebar_position: 2
---

# Installation

Install the library and its Vite peer tooling:

```bash
npm install @kamalion/web-ui
```

Add the `kamalion()` plugin to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { kamalion } from "@kamalion/web-ui/vite";

export default defineConfig({
  plugins: [react(), kamalion()],
});
```

Import the styles once in your app entry, and wrap your app in a theme class:

```tsx
// main.tsx
import "@kamalion/web-ui/styles";

// somewhere near the root
<div className="theme-light">{/* your app */}</div>;
```

Then use components:

```tsx
import { Button } from "@kamalion/web-ui";

export function Example() {
  return <Button>Click me</Button>;
}
```
