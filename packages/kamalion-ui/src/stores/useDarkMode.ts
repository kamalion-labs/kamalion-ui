import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

type Props = {
  isDark: boolean;
  toggleIsDark: () => void;
};

const storage: PersistStorage<Props> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    if (!value) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useDarkMode = create<Props>()(
  persist(
    (set) => ({
      isDark: true,
      toggleIsDark: () => set(({ isDark }) => ({ isDark: !isDark })),
    }),
    {
      name: "JsdR81s",
      storage,
    },
  ),
);
