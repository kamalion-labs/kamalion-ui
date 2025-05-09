import { cn } from "../..";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("itc-skeleton animate-pulse rounded-md bg-zinc-900/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
