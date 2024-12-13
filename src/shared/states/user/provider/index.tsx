'use client';

import {
  initializeUserStore,
  Provider,
  UserStoreState,
  UserStoreType,
} from '@/src/shared/states/user';
import { PropsWithChildren, useRef } from 'react';

export interface PreloadedStoreInterface extends Pick<UserStoreState, 'user'> {}

export default function UserStoreProvider({
  children,
  ...props
}: PropsWithChildren<PreloadedStoreInterface>) {
  const storeRef = useRef<UserStoreType>(null);

  if (!storeRef.current) {
    storeRef.current = initializeUserStore(props);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
