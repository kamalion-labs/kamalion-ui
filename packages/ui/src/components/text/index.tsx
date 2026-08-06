import type { ElementType } from "react";
import { cn } from "../../util";
import type { TextProps } from "./types";

/** Factory for a typography preset bound to a specific tag + base classes. */
function createText(tag: ElementType, base: string, displayName: string) {
  const Component = ({ className, children, ref, ...props }: TextProps) => {
    const Tag = tag;
    return (
      <Tag ref={ref} className={cn(base, className)} {...props}>
        {children}
      </Tag>
    );
  };
  Component.displayName = displayName;
  return Component;
}

const fg = "text-(--color-foreground)";

const TextH1 = createText(
  "h1",
  cn(fg, "scroll-m-20 text-4xl font-bold tracking-tight text-balance"),
  "Text.H1",
);
const TextH2 = createText(
  "h2",
  cn(fg, "scroll-m-20 text-3xl font-semibold tracking-tight"),
  "Text.H2",
);
const TextH3 = createText(
  "h3",
  cn(fg, "scroll-m-20 text-2xl font-semibold tracking-tight"),
  "Text.H3",
);
const TextH4 = createText(
  "h4",
  cn(fg, "scroll-m-20 text-xl font-semibold tracking-tight"),
  "Text.H4",
);
const TextH5 = createText(
  "h5",
  cn(fg, "text-lg font-semibold"),
  "Text.H5",
);
const TextH6 = createText(
  "h6",
  cn(fg, "text-base font-semibold"),
  "Text.H6",
);
const TextParagraph = createText(
  "p",
  cn(fg, "text-base leading-7"),
  "Text.Paragraph",
);
const TextLead = createText(
  "p",
  "text-xl text-(--color-foreground-muted)",
  "Text.Lead",
);
const TextLarge = createText("div", cn(fg, "text-lg font-semibold"), "Text.Large");
const TextSmall = createText(
  "small",
  cn(fg, "text-sm font-medium leading-none"),
  "Text.Small",
);
const TextMuted = createText(
  "p",
  "text-sm text-(--color-foreground-muted)",
  "Text.Muted",
);
const TextCaption = createText(
  "span",
  "text-xs text-(--color-foreground-subtle)",
  "Text.Caption",
);
const TextCode = createText(
  "code",
  "relative rounded-(--radius-card) bg-(--color-surface-panel-muted) px-1.5 py-0.5 font-mono text-sm text-(--color-foreground)",
  "Text.Code",
);
const TextBlockquote = createText(
  "blockquote",
  "mt-4 border-l-2 border-(--color-border) pl-4 text-(--color-foreground-muted) italic",
  "Text.Blockquote",
);
const TextSpan = createText("span", fg, "Text.Span");

/**
 * Typography component. Use a preset subcomponent (e.g. `Text.H1`,
 * `Text.Paragraph`, `Text.Muted`). The base `Text` renders an inline span.
 */
export const Text = Object.assign(TextSpan, {
  H1: TextH1,
  H2: TextH2,
  H3: TextH3,
  H4: TextH4,
  H5: TextH5,
  H6: TextH6,
  Paragraph: TextParagraph,
  Lead: TextLead,
  Large: TextLarge,
  Small: TextSmall,
  Muted: TextMuted,
  Caption: TextCaption,
  Code: TextCode,
  Blockquote: TextBlockquote,
  Span: TextSpan,
});

export type * from "./types";
