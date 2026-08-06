import { cn } from "../../util";
import type { CardProps, CardSectionProps } from "./types";

function CardRoot({ className, children, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "card flex flex-col rounded-(--radius-card) border border-(--color-surface-panel-border) bg-(--color-surface-panel) text-(--color-foreground) shadow-(--color-surface-panel-shadow)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ref, ...props }: CardSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "card-header flex flex-col gap-1 border-b border-(--color-border) p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ className, children, ref, ...props }: CardSectionProps) {
  return (
    <div ref={ref} className={cn("card-body flex-1 p-5", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ref, ...props }: CardSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "card-footer flex items-center gap-2 border-t border-(--color-border) p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Surface container for grouping related content.
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export type * from "./types";
