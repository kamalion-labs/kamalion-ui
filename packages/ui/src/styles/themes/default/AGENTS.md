# Kamalion UI - Default Theme Guidelines

This document serves as the authoritative guide for creating, extending, and maintaining the **Default Theme** of Kamalion UI for both **Light** and **Dark** modes. The visual aesthetics of the Default Theme are directly inspired by the translucent app shell, floating content panels with sticky translucent headers, and vibrant pill accents seen in modern macOS/web application designs (e.g., [photo-gallery.webp](../../../../inspiration/photo-gallery.webp)).

---

## 🎨 Visual Identity & Architecture Philosophy

The **Default Theme** relies on a clear multi-layered visual hierarchy:

```
┌────────────────────────────────────────────────────────────────────────┐
│ App Root Window Container (Translucent Glass with Backdrop Blur)       │
│                                                                        │
│  ┌──────────────┐  ┌───────────────────────────┐  ┌─────────────────┐  │
│  │ Sidebar      │  │ Main Content Panel        │  │ Side Panel      │  │
│  │ (Rests on    │  │ ┌───────────────────────┐ │  │ (Elevated White │  │
│  │  Window      │  │ │ Sticky Glass Header   │ │  │  Surface Card)  │  │
│  │  Glass)      │  │ └───────────────────────┘ │  │                 │  │
│  │              │  │ (Scrollable Grid Content  │  │ [Action Pill]   │  │
│  │  [Active     │  │  Blurs Under Header)      │  │ (var(--color-   │  │
│  │   White Pill]│  │                           │  │  violet-600))   │  │
│  └──────────────┴──┴───────────────────────────┴──┴─────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Translucent Root App Shell (Window Layer)**:
   - The outer application window container is **translucent** with backdrop blur (`backdrop-filter: blur(var(--backdrop-blur-2xl))`), allowing the user's ambient background wallpaper or gradient (such as warm orange/blue backdrop hues) to show through smoothly.
   - Light Mode Window Glass: Translucency frost overlay (`color-mix(in srgb, var(--color-white) 45%, transparent)`).
   - Dark Mode Window Glass: Deep obsidian glass overlay (`color-mix(in srgb, var(--color-slate-950) 65%, transparent)`).

2. **Sidebar Surface (Direct Shell Layer)**:
   - The Sidebar does **not** have a solid background color of its own. It rests directly on the translucent window shell, sharing its backdrop blur and ambient background.
   - **Active Items**: Styled as floating rounded pill cards (`var(--color-white)`, `var(--radius-full)` in Light mode) with high-contrast text.

3. **Floating Elevated Content Panels (Surface Cards)**:
   - Main content containers (e.g., photo grids, main views) and side utility drawers (e.g., AI assistants) are rendered as **distinct, elevated rounded surface panels** (`var(--radius-2xl)` / `var(--radius-3xl)` / `--radius-panel`).
   - Light Mode Panels: Clean solid surface (`var(--color-white)`) with subtle shadow elevation.
   - Dark Mode Panels: Elevated dark slate panels (`var(--color-slate-900)` / `var(--color-slate-800)`).

4. **Sticky Translucent Panel Headers (Scroll Layer)**:
   - Top headers and tab bars inside content panels (containing tabs, search controls, or action buttons) are sticky (`sticky top-0 z-10`).
   - On scroll, panel headers transition to a **translucent glass overlay** (`color-mix(in srgb, var(--color-surface-panel) 82%, transparent)`) with backdrop blur (`backdrop-filter: blur(var(--backdrop-blur-md))`) and a subtle divider border, blurring content as it scrolls underneath.

5. **Action Accents & Pill Shapes**:
   - **Primary Accent**: Electric Indigo / Vibrant Purple (`var(--color-violet-600)` in Light mode, `var(--color-violet-500)` in Dark mode).
   - Interactive action buttons, prompt chips, and badge tags use full pill shapes (`var(--radius-full)` / `var(--radius-pill)`).

---

## 📁 Directory & Theme Architecture

The default theme is split modularly into `light` and `dark` mode definitions.

```
default/
├── AGENTS.md               # Theme guidelines & rules (this file)
├── light/
│   ├── theme.css           # Semantic tokens for Light mode
│   └── [component].css     # Component-specific token mappings for Light mode
└── dark/
    ├── theme.css           # Semantic tokens for Dark mode
    └── [component].css     # Component-specific token mappings for Dark mode
```

---

## 🛠️ Token System & Theme Exposition

All theme customizations rely on a two-tier token system using native **Tailwind CSS v4** variables:
1. **Global/Semantic Tokens**: Defined in `theme.css` under `.theme-light` and `.theme-dark`.
2. **Component Specific Tokens**: Defined in `[component].css` files, mapping component variables to the active theme's semantic variables.

---

## 🌞 Light Mode Token Definitions

In Light mode (`.theme-light`), the outer shell provides soft translucent glass, content panels pop forward as crisp white rounded surfaces, and sticky panel headers become translucent on scroll.

### `default/light/theme.css`

```css
.theme-light {
  /* ─── Root Window & Translucent Glass Layer ─── */
  --color-window-glass: color-mix(in srgb, var(--color-white) 45%, transparent);
  --color-window-glass-border: color-mix(in srgb, var(--color-white) 60%, transparent);
  --backdrop-blur-amount: var(--backdrop-blur-2xl);

  /* ─── Sidebar Layer (Directly on Window Shell) ─── */
  --color-sidebar-bg: transparent;
  --color-sidebar-fg: var(--color-stone-700);
  --color-sidebar-fg-muted: var(--color-stone-500);
  --color-sidebar-active-bg: var(--color-white);
  --color-sidebar-active-fg: var(--color-stone-900);
  --color-sidebar-active-shadow: var(--shadow-sm);

  /* ─── Elevated Floating Content Panels ─── */
  --color-surface-panel: var(--color-white);
  --color-surface-panel-muted: var(--color-slate-50);
  --color-surface-panel-border: color-mix(in srgb, var(--color-black) 6%, transparent);
  --color-surface-panel-shadow: var(--shadow-md);

  /* ─── Sticky Panel Headers (Translucent on Scroll) ─── */
  --color-panel-header-glass: color-mix(in srgb, var(--color-white) 82%, transparent);
  --color-panel-header-border: color-mix(in srgb, var(--color-black) 6%, transparent);
  --backdrop-blur-header: var(--backdrop-blur-md);

  /* ─── Typography & Content ─── */
  --color-foreground: var(--color-stone-900);
  --color-foreground-muted: var(--color-stone-500);
  --color-foreground-subtle: var(--color-stone-400);

  /* ─── Primary & Brand Accents ─── */
  --color-accent: var(--color-violet-600);
  --color-accent-hover: var(--color-violet-700);
  --color-accent-active: var(--color-violet-800);
  --color-accent-foreground: var(--color-white);
  --color-accent-soft: color-mix(in srgb, var(--color-violet-600) 12%, transparent);

  /* ─── Feedback & Status Colors ─── */
  --color-danger: var(--color-red-600);
  --color-danger-soft: color-mix(in srgb, var(--color-red-600) 10%, transparent);
  --color-success: var(--color-green-600);
  --color-success-soft: color-mix(in srgb, var(--color-green-600) 10%, transparent);
  --color-warning: var(--color-amber-600);
  --color-warning-soft: color-mix(in srgb, var(--color-amber-600) 10%, transparent);
  --color-info: var(--color-blue-600);
  --color-info-soft: color-mix(in srgb, var(--color-blue-600) 10%, transparent);

  /* ─── Borders & Dividers ─── */
  --color-border: color-mix(in srgb, var(--color-stone-900) 8%, transparent);
  --color-border-hover: color-mix(in srgb, var(--color-stone-900) 16%, transparent);

  /* ─── Radii & Elevations ─── */
  --radius-window: var(--radius-3xl);
  --radius-panel: var(--radius-2xl);
  --radius-card: var(--radius-xl);
  --radius-pill: var(--radius-full);

  /* ─── Shadows ─── */
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-panel: var(--shadow-xl);
}
```

---

## 🌙 Dark Mode Token Definitions

In Dark mode (`.theme-dark`), the root shell features translucent obsidian glass, content panels present elevated dark slate surfaces, and sticky panel headers blur scrolling content underneath.

### `default/dark/theme.css`

```css
.theme-dark {
  /* ─── Root Window & Translucent Glass Layer ─── */
  --color-window-glass: color-mix(in srgb, var(--color-slate-950) 65%, transparent);
  --color-window-glass-border: color-mix(in srgb, var(--color-white) 10%, transparent);
  --backdrop-blur-amount: var(--backdrop-blur-2xl);

  /* ─── Sidebar Layer (Directly on Window Shell) ─── */
  --color-sidebar-bg: transparent;
  --color-sidebar-fg: var(--color-stone-300);
  --color-sidebar-fg-muted: var(--color-stone-400);
  --color-sidebar-active-bg: color-mix(in srgb, var(--color-white) 12%, transparent);
  --color-sidebar-active-fg: var(--color-white);
  --color-sidebar-active-shadow: var(--shadow-sm);

  /* ─── Elevated Floating Content Panels ─── */
  --color-surface-panel: var(--color-slate-900);
  --color-surface-panel-muted: var(--color-slate-800);
  --color-surface-panel-border: color-mix(in srgb, var(--color-white) 8%, transparent);
  --color-surface-panel-shadow: var(--shadow-2xl);

  /* ─── Sticky Panel Headers (Translucent on Scroll) ─── */
  --color-panel-header-glass: color-mix(in srgb, var(--color-slate-900) 82%, transparent);
  --color-panel-header-border: color-mix(in srgb, var(--color-white) 8%, transparent);
  --backdrop-blur-header: var(--backdrop-blur-md);

  /* ─── Typography & Content ─── */
  --color-foreground: var(--color-slate-100);
  --color-foreground-muted: var(--color-slate-400);
  --color-foreground-subtle: var(--color-slate-500);

  /* ─── Primary & Brand Accents ─── */
  --color-accent: var(--color-violet-500);
  --color-accent-hover: var(--color-violet-600);
  --color-accent-active: var(--color-violet-700);
  --color-accent-foreground: var(--color-white);
  --color-accent-soft: color-mix(in srgb, var(--color-violet-500) 20%, transparent);

  /* ─── Feedback & Status Colors ─── */
  --color-danger: var(--color-red-500);
  --color-danger-soft: color-mix(in srgb, var(--color-red-500) 18%, transparent);
  --color-success: var(--color-green-500);
  --color-success-soft: color-mix(in srgb, var(--color-green-500) 18%, transparent);
  --color-warning: var(--color-amber-500);
  --color-warning-soft: color-mix(in srgb, var(--color-amber-500) 18%, transparent);
  --color-info: var(--color-blue-500);
  --color-info-soft: color-mix(in srgb, var(--color-blue-500) 18%, transparent);

  /* ─── Borders & Dividers ─── */
  --color-border: color-mix(in srgb, var(--color-white) 10%, transparent);
  --color-border-hover: color-mix(in srgb, var(--color-white) 20%, transparent);

  /* ─── Radii & Elevations ─── */
  --radius-window: var(--radius-3xl);
  --radius-panel: var(--radius-2xl);
  --radius-card: var(--radius-xl);
  --radius-pill: var(--radius-full);

  /* ─── Shadows ─── */
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-panel: var(--shadow-2xl);
}
```

---

## 🧩 Component Token Mapping Pattern

Every component maps its tokens based on whether it belongs to the translucent window layer, an elevated panel, or a translucent sticky header.

### 1. Panel Container Mapping (`content-panel.css`)

```css
/* Light Mode */
.theme-light {
  --content-panel-bg: var(--color-surface-panel);
  --content-panel-border: var(--color-surface-panel-border);
  --content-panel-radius: var(--radius-panel);
  --content-panel-shadow: var(--shadow-panel);
}

/* Dark Mode */
.theme-dark {
  --content-panel-bg: var(--color-surface-panel);
  --content-panel-border: var(--color-surface-panel-border);
  --content-panel-radius: var(--radius-panel);
  --content-panel-shadow: var(--shadow-panel);
}
```

### 2. Panel Header Translucent Mapping (`panel-header.css`)

```css
/* Light Mode */
.theme-light {
  --panel-header-bg: var(--color-panel-header-glass);
  --panel-header-border: var(--color-panel-header-border);
  --panel-header-blur: var(--backdrop-blur-header);
}

/* Dark Mode */
.theme-dark {
  --panel-header-bg: var(--color-panel-header-glass);
  --panel-header-border: var(--color-panel-header-border);
  --panel-header-blur: var(--backdrop-blur-header);
}
```

---

## ⚡ Essential Rules to Follow

> [!IMPORTANT]
> **TailwindCSS v4 Native Variables**: **Always** map theme semantic tokens using Tailwind CSS v4 native variables (e.g., `var(--color-white)`, `var(--color-slate-900)`, `var(--color-violet-600)`, `var(--radius-2xl)`, `var(--radius-full)`, `var(--shadow-md)`). **Never** hardcode raw hex values, pixel radii, or raw box-shadow definitions when standard TailwindCSS v4 variables are available.
>
> **Window Glass vs Panel Surface Separation**: The application root shell uses translucent glass with backdrop blur (`var(--color-window-glass)` + `backdrop-filter: blur(var(--backdrop-blur-amount))`). Sidebar navigation elements rest directly on this glass shell (`bg-transparent`). Content areas (photo grid, AI drawer) are rendered as elevated surface panels (`var(--color-surface-panel)` / `rounded-2xl`).
>
> **Sticky Translucent Headers on Scroll**: Sticky panel headers (tabs, filter toolbars) must utilize `sticky top-0 z-10`, `bg-(--color-panel-header-glass)`, `backdrop-blur-(--backdrop-blur-header)`, and a subtle bottom border (`border-b border-(--color-panel-header-border)`). This ensures content scrolling underneath blurs smoothly while header controls stay crisp and readable.
>
> **Sidebar Active Items**: Active items inside the sidebar must be rendered as distinct floating pills (`var(--color-white)` in Light Mode, `color-mix(in srgb, var(--color-white) 12%, transparent)` in Dark Mode, `rounded-full` or `rounded-xl`) to contrast against the translucent sidebar backdrop.
>
> **TailwindCSS v4 Class Syntax**: Always reference theme variables in JSX/CSS via Tailwind CSS v4 arbitrary variable syntax (e.g., `bg-(--color-surface-panel)`, `text-(--color-foreground)`, `rounded-(--radius-panel)`). **Never** use inline CSS styles.
>
> **Pill Shapes & Action Buttons**: Primary action buttons, AI chips, search inputs, and filter badges must use full rounded pill geometry (`rounded-full` / `var(--radius-pill)`).
>
> **WCAG Contrast Compliance**: Ensure text colors maintain a contrast ratio of at least **4.5:1** against translucent headers, window backdrops, and solid content panels.
