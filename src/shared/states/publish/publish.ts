import { YooptaContentValue } from '@yoopta/editor';
import { create } from 'zustand';

interface PublishStoreState {
  title: string | null;
  tags: string[] | null;
  content: YooptaContentValue | null;
}

interface PublishStore extends PublishStoreState {
  actions: {
    setTitle: (title: string) => void;
    setTags: (tags: string[]) => void;
    setContent: (content: YooptaContentValue) => void;
  };
}

const usePublishStore = create<PublishStore>((set) => ({
  title: null,
  tags: null,
  content: null,
  actions: {
    setTitle: (title: string) => set((state) => ({ ...state, title })),
    setTags: (tags: string[]) => set((state) => ({ ...state, tags })),
    setContent: (content: YooptaContentValue) =>
      set((state) => ({ ...state, content })),
  },
}));

const usePublishStoreActions = () => usePublishStore((state) => state.actions);

export { usePublishStore, usePublishStoreActions };
