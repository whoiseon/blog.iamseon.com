import { YooEditor, YooptaContentValue } from '@yoopta/editor';
import { create } from 'zustand';

interface PublishStoreState {
  isPublishing: boolean;
  tags: string[] | null;
  editor: YooEditor | null;
}

interface PublishStore extends PublishStoreState {
  actions: {
    setIsPublishing: (isPublishing: boolean) => void;
    setTags: (tags: string[]) => void;
    setEditor: (editor: YooEditor) => void;
  };
}

const usePublishStore = create<PublishStore>((set) => ({
  isPublishing: false,
  tags: null,
  editor: null,
  actions: {
    setIsPublishing: (isPublishing: boolean) =>
      set((state) => ({ ...state, isPublishing })),
    setTags: (tags: string[]) => set((state) => ({ ...state, tags })),
    setEditor: (editor: YooEditor) => set((state) => ({ ...state, editor })),
  },
}));

const usePublishStoreActions = () => usePublishStore((state) => state.actions);

export { usePublishStore, usePublishStoreActions };
