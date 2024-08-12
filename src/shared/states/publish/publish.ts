import { create } from 'zustand';

interface PublishStoreState {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  urlSlug: string;
  description?: string;
  isTemp: boolean;
  thumbnail: string;
  isPublic: boolean;
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
  isTemp: false,
  thumbnail: '',
  isPublic: true,
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
