import { create } from "zustand";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  toggleSidebar: () => void;
};

export const useSidebar = create<Props>((set) => ({
  visible: false,
  setVisible: (visible: boolean) => set(() => ({ visible })),
  toggleSidebar: () => set((state) => ({ visible: !state.visible })),
}));
