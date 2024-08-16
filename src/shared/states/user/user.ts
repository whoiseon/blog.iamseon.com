import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserStoreState {
  user: User | null;
}

interface UserStore extends UserStoreState {
  actions: {
    setUser: (user: User) => void;
    clearUser: () => void;
  };
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  actions: {
    setUser: (user: User) =>
      set((state) => ({
        user,
      })),
    clearUser: () =>
      set((state) => ({
        user: null,
      })),
  },
}));

const useSetUser = () => useUserStore((state) => state.actions.setUser);

export { useUserStore, useSetUser };
