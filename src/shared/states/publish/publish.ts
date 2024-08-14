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
  },
}));

export { usePublishStore };
