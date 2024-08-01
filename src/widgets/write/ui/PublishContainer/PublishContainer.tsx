'use client';

import { usePublishStore, usePublishStoreActions } from '@/src/shared/states';
import { useCallback, useEffect, useState } from 'react';
import { usePublish, useUpload } from '@/src/shared/lib/hooks';
import { Icons } from '@/src/shared/assets';
import ThumbnailSection from '@/src/widgets/write/ui/PublishContainer/ThumbnailSection';
import ConfigSection from '@/src/widgets/write/ui/PublishContainer/ConfigSection';

const PUBLISH_CONTAINER_ANIMATION_RENDER =
  'fixed top-0 left-0 flex md:items-center md:justify-center w-full h-full bg-white dark:bg-black z-[60] animate-fullSlideUp';

const PUBLISH_CONTAINER_ANIMATION_REMOVE =
  'fixed top-0 left-0 flex md:items-center md:justify-center w-full h-full bg-white dark:bg-black z-[60] animate-fullSlideDown';

function PublishContainer() {
  const [upload, file] = useUpload();

  const [description, setDescription] = useState<string>('');

  const { getTitle } = usePublish();

  const [className, setClassName] = useState<string>(
    PUBLISH_CONTAINER_ANIMATION_RENDER,
  );
  const { isPublishing } = usePublishStore();
  const { setIsPublishing } = usePublishStoreActions();

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleCancelPublish = () => {
    setIsPublishing(false);
    setClassName(PUBLISH_CONTAINER_ANIMATION_RENDER);
  };

  const handleCancel = useCallback(() => {
    setClassName(PUBLISH_CONTAINER_ANIMATION_REMOVE);
  }, []);

  const handleContainerAnimationEnd = () => {
    if (className === PUBLISH_CONTAINER_ANIMATION_REMOVE) {
      handleCancelPublish();
    }
  };

  if (!isPublishing) return null;

  return (
    <div className={className} onAnimationEnd={handleContainerAnimationEnd}>
      {/*<button onClick={handleCancel}>Cancel</button>*/}
      <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-[4rem] w-full md:w-[700px]">
        <div className="flex-1 min-w-0 px-5 md:px-0">
          <ThumbnailSection
            title={getTitle() || ''}
            onUpload={upload}
            description={description}
            onChangeDescription={handleChangeDescription}
          />
        </div>
        <div className="flex-1 min-w-0">
          <ConfigSection />
        </div>
      </div>
    </div>
  );
}

export default PublishContainer;
