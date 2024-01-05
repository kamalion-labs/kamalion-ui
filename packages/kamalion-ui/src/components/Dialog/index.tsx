import * as DialogPrimitive from "@radix-ui/react-dialog";

import { DialogPortal } from "./DialogPortal";
import { DialogOverlay } from "./DialogOverlay";
import { DialogContent } from "./DialogContent";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
import { DialogTitle } from "./DialogTitle";
import { DialogDescription } from "./DialogDescription";

export const Dialog = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
};
