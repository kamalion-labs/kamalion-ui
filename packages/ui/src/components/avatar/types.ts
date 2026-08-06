import type React from "react";
import type * as RadixAvatar from "@radix-ui/react-avatar";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  size?: AvatarSize;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
}

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Image> {
  className?: string;
  ref?: React.Ref<HTMLImageElement>;
}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback> {
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
}

export type AvatarOverlayPlacement =
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left";

export interface AvatarOverlayProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  placement?: AvatarOverlayPlacement;
  className?: string;
  ref?: React.Ref<HTMLSpanElement>;
}
