'use client';

import TagInput from '@/src/features/write/ui/TagInput';
import { useCallback, useEffect, useState } from 'react';
import PublishContainer from '@/src/widgets/write/ui/PublishContainer';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Button } from '@/src/shared/ui';
import {
  useGetQueryString,
  useServerUpload,
  useUpload,
} from '@/src/shared/lib/hooks';
import WriteFooter from '@/src/widgets/write/ui/EditorContainer/WriteFooter';
import { usePublishStore } from '@/src/shared/states/publish/publish';
import { escapeForUrl } from '@/src/shared/lib/utils';

const MarkdownEditor = dynamic(
  () => import('@/src/widgets/write/ui/EditorContainer/MarkdownEditor'),
  {
    ssr: false,
  },
);

const MarkdownPreview = dynamic(
  () => import('@/src/widgets/write/ui/EditorContainer/MarkdownPreview'),
  {
    ssr: false,
  },
);

function EditorContainer() {
  const { actions } = usePublishStore();
  const { upload: serverUpload, image } = useServerUpload();

  const postId = useGetQueryString('id') || undefined;

  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [initialBody, setInitialBody] = useState<string>('');
  const [published, setPublished] = useState<boolean>(false);

  const [imageBlobUrl, setImageBlobUrl] = useState<string>('');

  const { theme, systemTheme } = useTheme();

  const [upload, file] = useUpload();

  const getTitle = (markdownTitle: string): string => {
    const isTitle = markdownTitle.split(' ')[0] === '#';
    if (!isTitle) {
      return '';
    }

    return markdownTitle.split('# ')[1];
  };

  const onPublish = useCallback(() => {
    let body: string[] = [];
    const title = getTitle(markdown.split('\n')[0]);

    if (!title || !markdown) {
      alert('제목 또는 본문이 비어있습니다.');
      return;
    }

    if (tags.length < 1) {
      alert('태그를 하나 이상 입력해주세요.');
      return;
    }

    if (title) {
      body = markdown.split('\n');
      body.splice(0, 1);
    } else {
      alert('제목을 입력해주세요.');
      return;
    }

    actions.setPublishStore({
      id: Number(postId),
      title,
      tags,
      body: body.join('\n'),
      description: '',
      thumbnail: '',
      urlSlug: escapeForUrl(title),
      isPublic: true,
    });

    setPublished(true);
  }, [tags, markdown]);

  const onTempSave = useCallback(() => {
    const title = getTitle(markdown.split('\n')[0]);

    if (!title || !markdown) {
      alert('제목 또는 본문이 비어있습니다.');
      return;
    }
  }, [tags, markdown]);

  const uploadImage = useCallback(
    async (file: File) => {
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl);

      // await serverUpload(file);
    },
    [serverUpload],
  );

  const handleCancelPublish = () => {
    setPublished(false);
  };

  useEffect(() => {
    if (!file) return;
    uploadImage(file);
  }, [file]);

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col flex-1 gap-y-4 items-center md:hidden pt-[4rem]">
        <div>
          <p className="text-center">
            데스크탑 환경에서만 <br />{' '}
            <b className="text-green-500 dark:text-green-400">포스팅</b>을 할 수
            있습니다.
          </p>
        </div>
        <Button variant="primary" size="lg" weight="bold">
          홈으로
        </Button>
      </div>
      <div className="min-w-0 flex-1 hidden md:flex flex-col relative bg-white dark:bg-black">
        <MarkdownEditor
          markdown={markdown}
          onChangeMarkdown={setMarkdown}
          onUpload={upload}
          tagInput={<TagInput tags={tags} onChange={setTags} />}
          footer={
            <WriteFooter
              edit={!!postId}
              onPublish={onPublish}
              onTempSave={onTempSave}
            />
          }
          theme={theme === 'system' ? systemTheme : theme}
          tempBlobImage={imageBlobUrl}
          lastUploadedImage={image}
          initialBody={initialBody}
        />
      </div>
      <div className="min-w-0 flex-1 hidden lg:flex flex-col relative bg-white dark:bg-black border-l-[1px] border-l-neutral-200 dark:border-neutral-900">
        <MarkdownPreview markdown={markdown} />
      </div>
      <PublishContainer visible={published} onClose={handleCancelPublish} />
    </div>
  );
}

export default EditorContainer;
