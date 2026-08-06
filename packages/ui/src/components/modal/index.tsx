import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { cn } from "../../util";
import { Button } from "../button";
import { ModalContext, useModal } from "./context";
import type { ModalOptions, ModalPosition } from "./types";

const overlayClass =
  "modal-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-(--backdrop-blur-header)";

const positionClass: Record<ModalPosition, string> = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "top-16 left-1/2 -translate-x-1/2",
};

function contentClass(position: ModalPosition = "center") {
  return cn(
    "modal-content fixed z-50 flex w-[calc(100%-2rem)] max-w-lg flex-col overflow-hidden rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel) text-(--color-foreground) shadow-(--shadow-panel) outline-none",
    positionClass[position],
  );
}

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
      <RadixDialog.Content
        ref={ref}
        className={cn(contentClass(position), className)}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 rounded-(--radius-card) p-1 text-(--color-foreground-subtle) transition-colors hover:bg-(--color-surface-panel-muted) hover:text-(--color-foreground)"
          >
            <X className="size-4" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

function ModalHeader({ className, children, ref, ...props }: SectionProps) {
  return (
    <RadixDialog.Title asChild>
      <div
        ref={ref}
        className={cn(
          "modal-header flex flex-col gap-1 border-b border-(--color-border) p-5 pr-12 text-lg font-semibold",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </RadixDialog.Title>
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
          {options?.title ? <ModalHeader>{options.title}</ModalHeader> : null}
          <ModalBody>
            {options?.description ? (
              <RadixDialog.Description className="text-sm text-(--color-foreground-muted)">
                {options.description}
              </RadixDialog.Description>
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
  Body: ModalBody,
  Footer: ModalFooter,
  Close: RadixDialog.Close,
});

export { useModal };
export type * from "./types";
