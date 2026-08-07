# Product

## Register

product

## Users

Developers, designers, and domain users across the Kamalion platform ecosystem. They require an accessible, enterprise-grade, high-density, and consistent user interface component library for building complex business dashboards, web applications, and internal tools.

## Product Purpose

Kamalion UI (@kamalion/web-ui) is the core React 19 + Tailwind CSS v4 design system for the Kamalion platform ecosystem. It provides accessible, unstyled-to-styled composable component primitives and prebuilt UI workflows (data grids, modal dialogs, navigation, form inputs, dynamic feedback).

## Brand Personality

- **Sophisticated & Precision-Driven**: Clean, crisp typography, subtle micro-interactions, and balanced visual density.
- **Earned Familiarity**: Follows established UI patterns (Linear, Raycast, Vercel, Tailwind ecosystem) rather than arbitrary re-invention.
- **Tactile & Responsive**: High-contrast focus rings, springy subtle scale states, and fluid dark/light mode transitions.

## Anti-references

- Side-stripe accent borders (>1px border-left/right on cards, alerts, callouts).
- Text gradients (`background-clip: text`) on UI headings or buttons.
- Excessive glassmorphism/blurs used decoratively without purpose.
- Heavy SaaS clichés: big big-number metric heroes, identical card grids with generic icons, and modal dialogs for simple inline tasks.
- Non-standard inputs, broken keyboard tab traps, and missing focus indicators.

## Design Principles

1. **Accessibility First (WCAG 2.1 AA)**: All interactive elements feature visible focus rings, full keyboard navigation, ARIA roles, and high contrast text ratios.
2. **Product Density with Breathing Room**: Supports data-dense tables, split panels, and sidebars without feeling cluttered or overwhelming.
3. **Composable Subcomponents**: Uses compound component structures (e.g. `Card.Header`, `Alert.Icon`, `Button.Dropdown`) with `asChild` Radix Slot support for full customizability.
4. **Token-Driven & Tailwind v4 Native**: Colors, elevations, and radii leverage CSS custom variables mapped through Tailwind v4 theme extensions and semantic OKLCH/sRGB definitions.

## Accessibility & Inclusion

- Meets WCAG 2.1 AA contrast requirements across light and dark modes.
- Keyboard navigation enabled for all interactive triggers, modals, popovers, dropdowns, inputs, and tab trees.
- Respects user media preferences, including `prefers-reduced-motion`.
