'use client';

import { Button } from '@/src/shared/ui';
import { usePublishStore } from '@/src/shared/states';

function PublishButton() {
  const { content } = usePublishStore();
  console.log(content);

  return (
    <Button variant="primary" size="sm" weight="bold">
      출간하기
    </Button>
  );
}

export default PublishButton;
