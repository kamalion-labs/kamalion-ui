import { VariantProps } from "class-variance-authority";
import { badgeVariants, BadgeVariantsList } from "./BadgeVariants";
import { cn } from "../..";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof badgeVariants> & {}
 
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { type BadgeProps, Badge, type BadgeVariantsList };