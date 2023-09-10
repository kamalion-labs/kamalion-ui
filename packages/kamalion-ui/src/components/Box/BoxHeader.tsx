import { cn } from "../../util/cn";

type BoxHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxHeader({ className, children }: BoxHeaderProps) {
  return (
    <div className={cn("p-3 uppercase text-xs font-semibold", className)}>
      {children}
    </div>
  );
}
