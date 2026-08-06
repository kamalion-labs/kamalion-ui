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
        "resizable-handle relative flex items-center justify-center bg-(--color-border) transition-colors data-[resize-handle-state=hover]:bg-(--color-accent) data-[resize-handle-state=drag]:bg-(--color-accent)",
        "data-[panel-group-direction=horizontal]:w-px data-[panel-group-direction=vertical]:h-px",
        className,
      )}
      {...props}
    >
      {withGrip ? (
        <span className="z-10 h-8 w-1 rounded-(--radius-pill) bg-(--color-border-hover)" />
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
