import { cn } from "../../util/cn";

type BoxHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function BoxHeader({ className, children, ...rest }: BoxHeaderProps) {
  return (
    <div
      className={cn("p-3 uppercase text-xs font-semibold", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
