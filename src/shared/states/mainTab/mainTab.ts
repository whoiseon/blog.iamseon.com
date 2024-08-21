import { create } from 'zustand';

interface MainTabStoreState {
  activeId: number;
  setActiveId: (id: number) => void;
}

const mainTabStore = create<MainTabStoreState>((set) => ({
  activeId: 0,
  setActiveId: (id: number) =>
    set(() => ({
      activeId: id,
    })),
}));

const useMainTabActiveId = () => mainTabStore((state) => state.activeId);
const useMainTabSetActiveId = () => mainTabStore((state) => state.setActiveId);

export { useMainTabActiveId, useMainTabSetActiveId };
