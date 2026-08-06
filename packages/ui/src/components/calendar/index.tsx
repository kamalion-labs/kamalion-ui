import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { cn } from "../../util";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Class for the wrapper element. */
  classNameWrapper?: string;
};

/**
 * Date / date-range picker built on react-day-picker, themed with Kamalion
 * tokens. Pass `mode="single"` (default) or `mode="range"` plus `selected` /
 * `onSelect`.
 */
export function Calendar({ classNameWrapper, ...props }: CalendarProps) {
  return (
    <div
      className={cn(
        "calendar inline-block rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) p-3 text-(--color-foreground)",
        "[--rdp-accent-color:var(--color-accent)] [--rdp-accent-background-color:var(--color-accent-soft)]",
        "[--rdp-today-color:var(--color-accent)] [--rdp-range_middle-background-color:var(--color-accent-soft)]",
        classNameWrapper,
      )}
    >
      <DayPicker {...props} />
    </div>
  );
}
