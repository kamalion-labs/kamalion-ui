import { Dialog } from "..";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type ShowDialogProps = {
  content: React.ReactNode;
  title?: string;
  contentClassName?: string;
  onClose?: () => void;
};

interface DialogContextProps {
  showDialog: (props: ShowDialogProps) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [Title, setTitle] = useState<string | undefined>();
  const [Content, setContent] = useState<React.ReactNode>();
  const [OnCloseEvent, setOnCloseEvent] = useState<() => void>();
  const [IsVisible, setIsVisible] = useState(false);
  const [IsClosed, setIsClosed] = useState(true);
  const [ContentClassName, setContentClassName] = useState<string | undefined>("");

  const showDialog = useCallback(({ content, title, onClose, contentClassName }: ShowDialogProps) => {
    setContent(content);
    setTitle(title);
    setContentClassName(contentClassName);

    if (onClose) {
      setOnCloseEvent(() => onClose);
    }

    setIsVisible(true);
    setIsClosed(false);
  }, []);

  const closeDialog = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      if (OnCloseEvent) {
        OnCloseEvent();
      }

      setOnCloseEvent(undefined);
      setContent(undefined);
    }, 500);
  }, [OnCloseEvent]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {!IsClosed && (
        <Dialog.Root open={IsVisible} onOpenChange={(open: boolean) => !open && closeDialog()}>
          <Dialog.Content className={ContentClassName}>
            {Title && (
              <Dialog.Header>
                <Dialog.Title>{Title}</Dialog.Title>
              </Dialog.Header>
            )}

            {Content}
          </Dialog.Content>
        </Dialog.Root>
      )}

      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be inside a DialogProvider");
  }

  return context;
}
