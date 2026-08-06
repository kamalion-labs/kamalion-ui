---
sidebar_position: 1
slug: /
---

# Kamalion UI

**Kamalion UI** (`@kamalion/web-ui`) is a React 19 + Tailwind CSS v4 component
library for the Kamalion ecosystem.

It is **source-distributed**: there is no compiled `dist`. Consuming apps import
the library source directly and wire it up with the authored `kamalion()` Vite
plugin, so styling and resolution "just work" without a separate build step.

## Highlights

- **Tailwind CSS v4** token-driven theming (light / dark) via CSS variables.
- **Compound components** with full `className` styling exposure.
- **Accessible** — Radix primitives + WAI-ARIA patterns.
- **React 19.2** — `ref` as a plain prop, no `forwardRef`.

> These docs are currently static. The live component playground is the
> **kitchensink** app (`apps/kitchensink`).
