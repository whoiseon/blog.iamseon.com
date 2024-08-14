'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  useBodyScrollLock,
  useServerUpload,
  useUpload,
} from '@/src/shared/lib/hooks';
import ThumbnailSection from '@/src/widgets/write/ui/PublishContainer/ThumbnailSection';
import ConfigSection from '@/src/widgets/write/ui/PublishContainer/ConfigSection';
import PublishFooter from '@/src/widgets/write/ui/PublishContainer/PublishFooter';
import { usePublishStore } from '@/src/shared/states';
import { useMutationPublish } from '@/src/widgets/write/api';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const PUBLISH_CONTAINER_ANIMATION_RENDER =
  'fixed top-0 left-0 flex md:items-center md:justify-center w-full h-full bg-white dark:bg-black z-[60] animate-fullSlideUp';

const PUBLISH_CONTAINER_ANIMATION_REMOVE =
  'fixed top-0 left-0 flex md:items-center md:justify-center w-full h-full bg-white dark:bg-black z-[60] animate-fullSlideDown';

function PublishContainer({ visible, onClose }: Props) {
  useBodyScrollLock();

  const post = usePublishStore();

  const [upload, file] = useUpload();
  const { upload: uploadThumbnail, image, setImage } = useServerUpload();

  const [description, setDescription] = useState<string>('');
  const [className, setClassName] = useState<string>(
    PUBLISH_CONTAINER_ANIMATION_RENDER,
  );

  const { mutate } = useMutationPublish();

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleReUploadImage = () => {
    setImage(null);
    return upload();
  };

  const onPublish = () => {
    console.log({
      id: post.id,
      title: post.title,
      tags: post.tags,
      body: post.body,
      description,
      isPublic: post.isPublic,
      thumbnail: image || '',
      urlSlug: post.urlSlug,
      seriesId: post.seriesId,
    });
    mutate({
      id: post.id,
      title: post.title,
      tags: post.tags,
      body: post.body,
      description,
      isPublic: post.isPublic,
      thumbnail: image || '',
      urlSlug: post.urlSlug,
      seriesId: post.seriesId,
    });
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleCancelPublish = () => {
    onClose();
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

  useEffect(() => {
    if (post?.thumbnail) {
      setImage(post.thumbnail);
    }

    if (post?.description) {
      setDescription(post.description);
    }
  }, [post]);

  useEffect(() => {
    if (!file) return;
    uploadThumbnail(file, { type: 'thumbnail' });
  }, [file, uploadThumbnail]);

  if (!visible) return null;

  return (
    <div className={className} onAnimationEnd={handleContainerAnimationEnd}>
      {/*<button onClick={handleCancel}>Cancel</button>*/}
      <div className="flex flex-col md:flex-row gap-y-6 pb-[80px] md:pb-0 overflow-y-auto md:overflow-hidden md:gap-y-0 md:gap-x-[4rem] w-full md:w-[700px]">
        <div className="flex-1 min-w-0 px-5 md:px-0">
          <ThumbnailSection
            title={post.title || ''}
            image={image}
            onUpload={upload}
            description={description}
            onChangeDescription={handleChangeDescription}
            onReUpload={handleReUploadImage}
            onRemove={handleRemoveImage}
          />
        </div>
        <div className="flex-1 min-w-0">
          <section className="h-full flex flex-col justify-between">
            <ConfigSection />
            <PublishFooter onCancel={handleCancel} onPublish={onPublish} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default PublishContainer;
