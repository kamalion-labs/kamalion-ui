import { DayPicker, getDefaultClassNames } from "react-day-picker";
// NOTE: `react-day-picker/style.css` is imported by `styles/index.css` into the
// `vendor` cascade layer, NOT here. Imported from a `.tsx` it lands unlayered,
// and unlayered author styles outrank Tailwind's `@layer utilities` — every
// override below would silently lose to the vendor defaults.
import { cn } from "../../util";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Class for the wrapper element. */
  classNameWrapper?: string;
};

/**
 * Date / date-range picker built on react-day-picker, themed with Kamalion
 * tokens. Pass `mode="single"` (default) or `mode="range"` plus `selected` /
 * `onSelect`.
 *
 * Every visual property is owned here via a full `classNames` map, but the
 * vendor stylesheet stays imported and each key is MERGED onto its default
 * `rdp-*` class rather than replacing it. That split is deliberate:
 * `react-day-picker/style.css` carries the grid/table layout the component's
 * DOM depends on, so replacing the class strings outright would take the
 * layout with it. Merging keeps the layout and overrides the appearance —
 * and avoids an `!important` war against vendor specificity, which a scoped
 * CSS block would have required.
 */
export function Calendar({
  classNameWrapper,
  classNames,
  ...props
}: CalendarProps) {
  const d = getDefaultClassNames();

  const navButton = cn(
    "inline-flex size-8 cursor-pointer items-center justify-center rounded-(--radius-pill)",
    "text-(--color-foreground-muted) transition-colors",
    "hover:bg-(--color-surface-panel-hover) hover:text-(--color-foreground)",
    "outline-none focus-ring",
    "disabled:pointer-events-none disabled:opacity-40",
  );

  const dayButton = cn(
    "inline-flex size-9 cursor-pointer items-center justify-center rounded-(--radius-control)",
    "text-sm font-normal text-(--color-foreground) tabular-nums",
    "transition-colors ease-standard",
    "hover:bg-(--color-surface-panel-hover)",
    "outline-none focus-ring-inset",
  );

  return (
    <div
      className={cn(
        "calendar inline-block rounded-(--radius-card) border border-(--color-surface-panel-border) bg-(--color-surface-panel) p-3 text-(--color-foreground)",
        classNameWrapper,
      )}
    >
      <DayPicker
        classNames={{
          months: cn(d.months, "relative flex flex-col gap-4 sm:flex-row"),
          month: cn(d.month, "flex flex-col gap-3"),
          month_caption: cn(d.month_caption, "flex h-8 items-center justify-center"),
          caption_label: cn(
            d.caption_label,
            "text-sm font-semibold tracking-tight text-(--color-foreground)",
          ),

          nav: cn(d.nav, "absolute inset-x-0 top-0 flex items-center justify-between"),
          button_previous: cn(d.button_previous, navButton),
          button_next: cn(d.button_next, navButton),
          chevron: cn(d.chevron, "size-4 fill-current"),

          weekdays: cn(d.weekdays, "flex"),
          weekday: cn(
            d.weekday,
            "w-9 text-caption font-medium tracking-wider text-(--color-foreground-subtle) uppercase",
          ),

          week: cn(d.week, "mt-1 flex w-full"),
          day: cn(d.day, "p-0 text-center"),
          day_button: cn(d.day_button, dayButton),

          today: cn(d.today, "[&_button]:font-semibold [&_button]:text-(--color-accent)"),
          selected: cn(
            d.selected,
            "[&_button]:bg-(--color-accent) [&_button]:font-medium [&_button]:text-(--color-accent-foreground)",
            "[&_button]:hover:bg-(--color-accent-hover)",
          ),
          outside: cn(d.outside, "[&_button]:text-(--color-foreground-subtle) [&_button]:opacity-50"),
          disabled: cn(d.disabled, "[&_button]:pointer-events-none [&_button]:opacity-40"),
          hidden: cn(d.hidden, "invisible"),

          // Range: the band lives on the CELL so it runs edge-to-edge, while
          // the endpoints keep the solid accent fill.
          range_start: cn(d.range_start, "rounded-l-(--radius-control) bg-(--color-accent-soft)"),
          range_end: cn(d.range_end, "rounded-r-(--radius-control) bg-(--color-accent-soft)"),
          range_middle: cn(
            d.range_middle,
            "bg-(--color-accent-soft)",
            "[&_button]:bg-transparent [&_button]:text-(--color-foreground) [&_button]:hover:bg-(--color-accent-soft)",
          ),

          week_number: cn(d.week_number, "w-9 text-caption text-(--color-foreground-subtle)"),
          footer: cn(d.footer, "pt-2 text-sm text-(--color-foreground-muted)"),

          // Consumer overrides win — spread last.
          ...classNames,
        }}
        {...props}
      />
    </div>
  );
}
