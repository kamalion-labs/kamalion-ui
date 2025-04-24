import { cn } from "../../util/cn";

type BoxRootProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxRoot({ className, children, ...rest }: BoxRootProps) {
  return (
    <div
      className={cn(
        "itc-box bg-(--box-background) border border-(--box-border)",
        "rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
