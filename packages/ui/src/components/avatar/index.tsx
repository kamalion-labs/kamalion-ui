import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "../../util";
import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarOverlayPlacement,
  AvatarOverlayProps,
  AvatarProps,
  AvatarSize,
  AvatarStatus,
} from "./types";

const sizeClass: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

const placementClass: Record<AvatarOverlayPlacement, string> = {
  "top-right": "top-0 right-0",
  "bottom-right": "bottom-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-left": "bottom-0 left-0",
};

function AvatarRoot({ size = "md", className, ref, ...props }: AvatarProps) {
  return (
    <RadixAvatar.Root
      ref={ref}
      className={cn(
        "avatar relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-(--radius-pill) align-middle",
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  return (
    <RadixAvatar.Image
      ref={ref}
      className={cn(
        "avatar-image size-full rounded-(--radius-pill) object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <RadixAvatar.Fallback
      ref={ref}
      className={cn(
        "avatar-fallback flex size-full items-center justify-center rounded-(--radius-pill) bg-(--color-accent-soft) font-medium tracking-tight text-(--color-accent) uppercase select-none",
        className,
      )}
      {...props}
    />
  );
}

const statusClass: Record<AvatarStatus, string> = {
  online: "bg-(--color-success)",
  offline: "bg-(--color-foreground-subtle)",
  busy: "bg-(--color-danger)",
  away: "bg-(--color-warning)",
};

function AvatarOverlay({
  placement = "bottom-right",
  status = "online",
  className,
  ref,
  ...props
}: AvatarOverlayProps) {
  return (
    <span
      ref={ref}
      data-status={status}
      className={cn(
        "avatar-overlay absolute z-10 block size-3 rounded-(--radius-pill) ring-2 ring-(--color-surface-panel)",
        statusClass[status],
        placementClass[placement],
        className,
      )}
      {...props}
    />
  );
}

/**
 * User profile image with fallback initials and a status overlay.
 */
export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Overlay: AvatarOverlay,
});

export type * from "./types";
