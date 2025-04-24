"use client";

import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastType } from "../components";

interface ToastProviderProps {
  showToast: ({ message, type }: { message: string; type?: ToastType }) => void;
}

export const ToastContext = createContext<ToastProviderProps | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [Message, setMessage] = useState("");
  const [IsVisible, setIsVisible] = useState(false);
  const [IsClosed, setIsClosed] = useState(true);
  const [Type, setType] = useState<ToastType>("success");

  const showToast = useCallback(({ message, type = "success" }: { message: string; type?: ToastType }) => {
    setMessage(message);
    setType(type);
    setIsVisible(true);
    setIsClosed(false);

    setTimeout(() => setIsVisible(false), 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {!IsClosed && (
        <Toast
          message={Message}
          type={Type}
          isVisible={IsVisible}
          onClose={() => setIsVisible(false)}
          onFinished={(e) => e === "closed" && setIsClosed(true)}
        />
      )}

      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be inside a ToastProvider");
  }

  return context;
}
