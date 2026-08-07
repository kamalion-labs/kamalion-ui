import { cn } from "../../util";
import type { CardProps, CardSectionProps } from "./types";
import { cardVariants } from "./variants";

function CardRoot({
  variant = "flat",
  className,
  children,
  ref,
  ...props
}: CardProps) {
  return (
    <div
      ref={ref}
      className={cn(`card-${variant}`, cardVariants({ variant }), className)}
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
        "card-header flex flex-col gap-1.5 border-b border-(--color-border) p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Heading for a Card.Header. Without it the header has no type treatment. */
function CardTitle({ className, children, ref, ...props }: CardSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "card-title text-base leading-none font-semibold tracking-tight text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardDescription({
  className,
  children,
  ref,
  ...props
}: CardSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "card-description text-sm text-(--color-foreground-muted)",
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
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});

export type * from "./types";
