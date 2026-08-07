import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import type React from "react";
import { cn } from "../../util";

export type ResizableRootProps = Omit<
  React.ComponentProps<typeof PanelGroup>,
  "direction"
> & {
  direction?: React.ComponentProps<typeof PanelGroup>["direction"];
};
export type ResizablePanelProps = React.ComponentProps<typeof Panel>;
export type ResizableHandleProps = React.ComponentProps<
  typeof PanelResizeHandle
> & {
  /** Show a grip affordance in the middle of the handle. */
  withGrip?: boolean;
};

function ResizableRoot({
  className,
  direction = "horizontal",
  ...props
}: ResizableRootProps) {
  return (
    <PanelGroup
      direction={direction}
      className={cn("resizable flex h-full w-full", className)}
      {...props}
    />
  );
}

function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel className={cn("resizable-panel", className)} {...props} />;
}

function ResizableHandle({
  className,
  withGrip,
  ...props
}: ResizableHandleProps) {
  return (
    <PanelResizeHandle
      className={cn(
        "resizable-handle group relative flex shrink-0 items-center justify-center bg-(--color-border)",
        "transition-colors ease-standard",
        "data-[resize-handle-state=hover]:bg-(--color-accent) data-[resize-handle-state=drag]:bg-(--color-accent)",
        "data-[panel-group-direction=horizontal]:w-px data-[panel-group-direction=vertical]:h-px",
        // The visual rail stays 1px, but the DRAG TARGET was also 1px — which
        // is effectively unhittable. This `after:` overlay widens the target to
        // ~10px without changing the layout.
        "after:absolute after:z-10",
        "data-[panel-group-direction=horizontal]:after:inset-y-0 data-[panel-group-direction=horizontal]:after:left-1/2 data-[panel-group-direction=horizontal]:after:w-2.5 data-[panel-group-direction=horizontal]:after:-translate-x-1/2",
        "data-[panel-group-direction=vertical]:after:inset-x-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-2.5 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        "outline-none focus-ring",
        className,
      )}
      {...props}
    >
      {withGrip ? (
        <span className="z-20 h-8 w-1 rounded-(--radius-pill) bg-(--color-border-hover) opacity-0 transition-opacity ease-standard group-hover:opacity-100 group-data-[resize-handle-state=drag]:opacity-100" />
      ) : null}
    </PanelResizeHandle>
  );
}

/**
 * Drag-to-resize split panes (built on react-resizable-panels).
 */
export const Resizable = Object.assign(ResizableRoot, {
  Root: ResizableRoot,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
});
