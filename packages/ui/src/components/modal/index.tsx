import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { cn } from "../../util";
import { Button } from "../button";
import { ModalContext, useModal } from "./context";
import type { ModalOptions, ModalPosition } from "./types";

const overlayClass =
  "modal-overlay fixed inset-0 z-50 bg-(--color-overlay) backdrop-blur-(--backdrop-blur-overlay) data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-(--duration-normal)";

/**
 * The dialog is centred by a flex POSITIONER, not by
 * `-translate-x-1/2 -translate-y-1/2` on the content itself.
 *
 * That matters: the `zoom-in-95` / `slide-in-*` keyframes animate `transform`
 * wholesale (`translate3d(…) scale(…)`), which would replace a centering
 * transform outright — the dialog would jump to the viewport's centre POINT
 * (i.e. its own top-left corner landing there) and snap back for the duration
 * of every open. Keeping the content transform-free at rest makes the enter
 * and exit animations safe.
 *
 * `pointer-events-none` on the positioner preserves click-outside-to-close,
 * since the overlay underneath still receives the click.
 */
const positionerClass: Record<ModalPosition, string> = {
  center: "items-center",
  top: "items-start pt-16",
};

const contentClass = cn(
  "modal-content pointer-events-auto relative z-50 flex w-full max-w-lg flex-col overflow-hidden",
  "max-h-[calc(100dvh-2rem)]",
  "rounded-(--radius-panel) border border-(--color-surface-panel-border)",
  "bg-(--color-surface-panel) text-(--color-foreground) shadow-(--shadow-modal)",
  "outline-none duration-(--duration-normal) ease-standard",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-2",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
);

// ─── Declarative parts ────────────────────────────────────────────────────

type DialogRootProps = React.ComponentProps<typeof RadixDialog.Root>;

const ModalRoot = (props: DialogRootProps) => <RadixDialog.Root {...props} />;

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  position?: ModalPosition;
  className?: string;
  /** Show the default top-right close button. Defaults to true. */
  showClose?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function ModalContent({
  position = "center",
  className,
  showClose = true,
  children,
  ref,
  ...props
}: ModalContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={overlayClass} />
      <div
        className={cn(
          "modal-positioner pointer-events-none fixed inset-0 z-50 flex justify-center p-4",
          positionerClass[position],
        )}
      >
        <RadixDialog.Content
          ref={ref}
          className={cn(contentClass, className)}
          {...props}
        >
          {children}
          {showClose && (
            <RadixDialog.Close
              aria-label="Close"
              className={cn(
                // 32px target — the old `p-1` around a 16px glyph gave 24px,
                // under the 24px minimum for a comfortable pointer target.
                "absolute top-3.5 right-3.5 inline-flex size-8 cursor-pointer items-center justify-center",
                "rounded-(--radius-inline) text-(--color-foreground-subtle) transition-colors",
                "hover:bg-(--color-surface-panel-hover) hover:text-(--color-foreground)",
                "outline-none focus-ring",
              )}
            >
              <X className="size-4" />
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </div>
    </RadixDialog.Portal>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Header band. The type treatment lives on `Modal.Title`, not here — putting
 * `text-lg font-semibold` on the container meant any description nested inside
 * the header inherited it and rendered as a second bold heading.
 */
function ModalHeader({ className, children, ref, ...props }: SectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "modal-header flex flex-col gap-1.5 border-b border-(--color-border) px-5 py-4 pr-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalTitle({ className, children, ref, ...props }: SectionProps) {
  return (
    <RadixDialog.Title asChild>
      <div
        ref={ref}
        className={cn(
          "modal-title text-lg leading-none font-semibold tracking-tight text-(--color-foreground)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </RadixDialog.Title>
  );
}

function ModalDescription({ className, children, ref, ...props }: SectionProps) {
  return (
    <RadixDialog.Description asChild>
      <div
        ref={ref}
        className={cn(
          "modal-description text-sm font-normal text-(--color-foreground-muted)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </RadixDialog.Description>
  );
}

function ModalBody({ className, children, ref, ...props }: SectionProps) {
  return (
    <div
      ref={ref}
      className={cn("modal-body flex-1 overflow-y-auto p-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalFooter({ className, children, ref, ...props }: SectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "modal-footer flex items-center justify-end gap-2 border-t border-(--color-border) p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Imperative provider (useModal) ─────────────────────────────────────────

export function ModalProvider({ children }: { children?: ReactNode }) {
  const [options, setOptions] = useState<ModalOptions | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = useCallback((opts: ModalOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const handleConfirm = useCallback(async () => {
    if (!options?.onConfirm) {
      setOpen(false);
      return;
    }
    try {
      setLoading(true);
      await options.onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }, [options]);

  const showFooter =
    !!options &&
    (!!options.onConfirm || !!options.confirmLabel || !!options.cancelLabel);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <RadixDialog.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) options?.onCancel?.();
        }}
      >
        <ModalContent position={options?.position ?? "center"}>
          {options?.title ? (
            <ModalHeader>
              <ModalTitle>{options.title}</ModalTitle>
            </ModalHeader>
          ) : (
            // Radix requires a Title for screen readers even when the dialog
            // shows none visually.
            <ModalTitle className="sr-only">Dialog</ModalTitle>
          )}
          <ModalBody>
            {options?.description ? (
              <ModalDescription>{options.description}</ModalDescription>
            ) : null}
            {options?.content}
          </ModalBody>
          {showFooter && (
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  options?.onCancel?.();
                }}
              >
                {options?.cancelLabel ?? "Cancel"}
              </Button>
              <Button
                variant={options?.danger ? "danger" : "solid"}
                loading={loading}
                onClick={handleConfirm}
              >
                {options?.confirmLabel ?? "Confirm"}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </RadixDialog.Root>
    </ModalContext.Provider>
  );
}

/**
 * Modal dialog overlay. Use declaratively (`Modal.Root`, `Modal.Trigger`,
 * `Modal.Content`, …) or imperatively via `useModal().openModal()`.
 */
export const Modal = Object.assign(ModalRoot, {
  Root: ModalRoot,
  Trigger: RadixDialog.Trigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: RadixDialog.Close,
});

export { useModal };
export type * from "./types";
