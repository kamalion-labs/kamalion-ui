import * as SheetPrimitive from "@radix-ui/react-dialog";
import { SheetContent } from "./SheetContent";
import { SheetOverlay } from "./SheetOverlay";
import { SheetHeader } from "./SheetHeader";
import { SheetFooter } from "./SheetFooter";
import { SheetTitle } from "./SheetTitle";

export const Sheet = {
  Root: SheetPrimitive.Root,
  Trigger: SheetPrimitive.Trigger,
  Close: SheetPrimitive.Close,
  Portal: SheetPrimitive.Portal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
};
