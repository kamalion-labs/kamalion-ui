import { createContext, useContext } from "react";

export interface NavbarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextValue | undefined>(
  undefined,
);

export const useNavbarContext = () => {
  const ctx = useContext(NavbarContext);
  if (!ctx) {
    throw new Error("Navbar subcomponents must be used within a <Navbar>.");
  }
  return ctx;
};
