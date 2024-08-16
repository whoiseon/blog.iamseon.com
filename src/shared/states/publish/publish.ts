import { create } from 'zustand';

interface PublishStoreState {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  urlSlug: string;
  description?: string;
  thumbnail: string;
  isPublic: boolean;
  seriesId: number;
}

interface PublishStore extends PublishStoreState {
  actions: {
    setPublishStore: (publishState: PublishStoreState) => void;
    setIsPublic: (isPublic: boolean) => void;
    setTags: (tags: string[]) => void;
  };
}

const usePublishStore = create<PublishStore>((set) => ({
  id: undefined,
  title: '',
  body: '',
  tags: [],
  urlSlug: '',
  description: '',
  thumbnail: '',
  isPublic: true,
  seriesId: 0,
  actions: {
    setPublishStore: (publishState: PublishStoreState) =>
      set((state) => ({
        ...publishState,
      })),
    setIsPublic: (isPublic: boolean) =>
      set((state) => ({
        ...state,
        isPublic,
      })),
    setTags: (tags: string[]) =>
      set((state) => ({
        ...state,
        tags,
      })),
  },
}));

const usePublish = () => usePublishStore((state) => state);
const usePublishActions = () => usePublishStore((state) => state.actions);

export { usePublish, usePublishActions };
