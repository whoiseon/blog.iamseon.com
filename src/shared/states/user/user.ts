import { createStore, useStore as useZustandStore } from 'zustand';
import { createContext, useContext } from 'react';
import { PreloadedStoreInterface } from '@/src/shared/states/user/provider';
import { User } from '@supabase/supabase-js';

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

function getDefaultInitialState() {
  return {
    user: null,
  } as const;
}

type UserStoreType = ReturnType<typeof initializeUserStore>;

const userStoreContext = createContext<UserStoreType | null>(null);

const Provider = userStoreContext.Provider;

function useUserStore<T>(selector: (state: UserStoreState) => T) {
  const store = useContext(userStoreContext);
  if (!store) throw new Error('User store is missing the provider');
  return useZustandStore(store, selector);
}

function initializeUserStore(preloadedState: PreloadedStoreInterface) {
  return createStore<UserStoreState>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setUser: (user: User) =>
      set((state) => ({
        user,
      })),
    clearUser: () =>
      set((state) => ({
        user: null,
      })),
  }));
}

const useUser = () => useUserStore((state) => state.user);
const useSetUser = () => useUserStore((state) => state.setUser);
const useClearUser = () => useUserStore((state) => state.clearUser);

export {
  type UserStoreState,
  type UserStoreType,
  Provider,
  useUserStore,
  initializeUserStore,
  useUser,
  useSetUser,
  useClearUser,
};
