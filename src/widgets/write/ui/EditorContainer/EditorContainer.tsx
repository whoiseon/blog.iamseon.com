'use client';

import TagInput from '@/src/features/write/ui/TagInput';
import { useCallback, useEffect, useState } from 'react';
import PublishContainer from '@/src/widgets/write/ui/PublishContainer';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import {
  useGetQueryString,
  useServerUpload,
  useToastMessage,
  useUpload,
} from '@/src/shared/lib/hooks';
import WriteFooter from '@/src/widgets/write/ui/EditorContainer/WriteFooter';
import {
  usePublish,
  usePublishActions,
} from '@/src/shared/states/publish/publish';
import { escapeForUrl } from '@/src/shared/lib/utils';
import DesktopOnlyMessage from '@/src/widgets/write/ui/DesktopOnlyMessage';
import { useGetPost, useMutationPublish } from '@/src/widgets/write/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next-nprogress-bar';

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
  const router = useRouter();

  const { successToast, errorToast } = useToastMessage();
  const [postLoading, setPostLoading] = useState(true);

  const { setPublishStore, setTags, clearPublishStore } = usePublishActions();
  const { tags } = usePublish();
  const { upload: serverUpload, image } = useServerUpload();

  const postId = useGetQueryString('id') || undefined;
  const { data: postData, isLoading } = useGetPost(Number(postId));

  const [markdown, setMarkdown] = useState<string>('');
  const [initialBody, setInitialBody] = useState<string>('');
  const [published, setPublished] = useState<boolean>(false);

  const [imageBlobUrl, setImageBlobUrl] = useState<string>('');

  const { theme, systemTheme } = useTheme();

  const { mutate: tempSaveMutate } = useMutationPublish((data) => {
    successToast('임시 저장이 완료되었습니다.');
    if (!postId) {
      router.push(`/write?id=${data.payload.postId}`);
    }
  });

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
      errorToast('제목 또는 본문이 비어있습니다.');
      return;
    }

    if (tags.length < 1) {
      errorToast('태그를 하나 이상 입력해주세요.');
      return;
    }

    if (title) {
      body = markdown.split('\n');
      body.splice(0, 1);
    } else {
      errorToast('제목을 입력해주세요.');
      return;
    }

    setPublishStore({
      id: Number(postId),
      title,
      tags,
      body: body.join('\n'),
      description: postData?.payload?.description || '',
      thumbnail: postData?.payload?.thumbnail || '',
      urlSlug: escapeForUrl(title),
      isPublic:
        postData?.payload?.isPublic === undefined
          ? true
          : postData?.payload?.isPublic,
      seriesId: postData?.payload?.series?.id || 0,
    });

    setPublished(true);
  }, [tags, markdown, postData, postId]);

  const onTempSave = useCallback(() => {
    let body: string[] = [];

    const title = getTitle(markdown.split('\n')[0]);

    if (!title || !markdown) {
      errorToast('제목 또는 본문이 비어있습니다.');
      return;
    }

    if (title) {
      body = markdown.split('\n');
      body.splice(0, 1);
    } else {
      errorToast('제목을 입력해주세요.');
      return;
    }

    tempSaveMutate({
      id: Number(postId),
      title,
      body: body.join('\n'),
      description: postData?.payload?.description || '',
      thumbnail: postData?.payload?.thumbnail || '',
      urlSlug: escapeForUrl(title),
      seriesId: postData?.payload?.series?.id || 0,
      tags,
      isPublic: false,
    });
  }, [tags, markdown, tempSaveMutate]);

  const uploadImage = useCallback(
    async (file: File) => {
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl);

      await serverUpload(file, {
        type: 'post',
      });
    },
    [serverUpload],
  );

  const handleCancelPublish = () => {
    setPublished(false);
  };

  const preparePost = () => {
    if (!postData) return;
    const body = `# ${postData.payload?.title}\n${postData.payload?.body}`;

    setTags(postData?.payload?.tags || []);
    setMarkdown(body);
    setInitialBody(body);
    setPostLoading(false);
  };

  useEffect(() => {
    if (!file) return;
    uploadImage(file);
  }, [file]);

  useEffect(() => {
    if (!postId) {
      setPostLoading(false);
      return;
    }

    preparePost();
  }, [postId, isLoading]);

  useEffect(() => {
    return () => {
      clearPublishStore();
    };
  }, [clearPublishStore]);

  if (postLoading) return null;

  return (
    <div className="flex w-full h-full animate-fadeIn">
      <DesktopOnlyMessage />
      <div className="z-10 min-w-0 flex-1 hidden md:flex flex-col relative bg-neutral-50 shadow-r dark:bg-neutral-950">
        <MarkdownEditor
          markdown={markdown}
          onChangeMarkdown={setMarkdown}
          onUpload={upload}
          tagInput={<TagInput tags={tags} />}
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
      <div className="min-w-0 flex-1 hidden md:flex flex-col relative bg-white dark:bg-black border-l-[1px] border-l-neutral-200 dark:border-neutral-800">
        <MarkdownPreview markdown={markdown} />
      </div>
      <PublishContainer
        visible={published}
        edit={!!postId}
        onClose={handleCancelPublish}
      />
    </div>
  );
}

export default EditorContainer;
