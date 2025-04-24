"use client";

import { ReactNode, createContext, useContext, useEffect, useRef } from "react";
import { createStore, useStore } from "zustand";

interface PageProps {
  title: string | undefined;
  // numFuncionalidade: number | undefined;
  // usaLog: boolean | undefined;

  onRunTour?: () => void;
}

interface PageState extends PageProps {
  setTitle: (title: string) => void;
  setOnRunTour: (callback: () => void) => void;
  //setNumFuncionalidade: (numFuncionalidade: number) => void;
}

const createPageStore = () => {
  return createStore<PageState>()((set) => ({
    title: undefined,
    setTitle: (title: string) => set((state) => ({ title: state.title ?? title })),

    // numFuncionalidade: undefined,
    // setNumFuncionalidade: (numFuncionalidade: number) => set(() => ({ numFuncionalidade })),

    // usaLog: false,

    runTour: undefined,
    setOnRunTour: (onRunTour: () => void) => set((state) => ({ onRunTour: onRunTour ?? state.onRunTour })),
  }));
};

type StoreType = ReturnType<typeof createPageStore>;

const PageContext = createContext<StoreType | null>(null);

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const store = useRef(createPageStore()).current;

  return <PageContext.Provider value={store}>{children}</PageContext.Provider>;
};

export function usePage(init?: Partial<PageProps>) {
  const context = useContext(PageContext);

  if (!context) throw new Error("usePage must be used inside a PageProvider");

  useEffect(() => {
    if (init?.title) {
      context.setState({ title: init.title });
    }

    if (init?.onRunTour) {
      context.setState({ onRunTour: init.onRunTour });
    }

    // if (init?.numFuncionalidade) {
    //   context.setState({ numFuncionalidade: init.numFuncionalidade });

    //   if (init?.usaLog) {
    //     criarLog(init.numFuncionalidade).then();
    //   }
    // }
  }, []);

  return useStore(context);
}
