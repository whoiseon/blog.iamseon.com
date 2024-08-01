'use client';

import { Button } from '@/src/shared/ui';
import { usePublish } from '@/src/shared/lib/hooks/usePublish';
import { usePublishStoreActions } from '@/src/shared/states';

function PublishButton() {
  const { setIsPublishing } = usePublishStoreActions();
  const { editor, getTitle, getContent, tags, isEmptyContent } = usePublish();

  const validatePublish = () => {
    if (!editor) return true;

    console.log({
      title: getTitle(),
      content: getContent(),
      tags,
      isEmptyContent: isEmptyContent(),
    });

    if (!getTitle()) {
      alert('제목을 입력해주세요.');
      return true;
    }
    if (isEmptyContent()) {
      alert('내용을 입력해주세요.');
      return true;
    }
    if (!tags || tags.length === 0) {
      alert('태그를 입력해주세요.');
      return true;
    }

    return false;
  };

  const onPublish = () => {
    if (!editor) return;

    if (validatePublish()) return;
    setIsPublishing(true);
  };

  return (
    <Button variant="primary" size="sm" weight="bold" onClick={onPublish}>
      출간하기
    </Button>
  );
}

export default PublishButton;
