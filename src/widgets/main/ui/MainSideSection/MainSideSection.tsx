'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';
import { useGetAllTags } from '@/src/widgets/main/api';

function MainSideSection() {
  const { data } = useGetAllTags();

  return (
    <div className="sticky top-[74px]">
      <ContentContainer title="시리즈">
        <div>시리즈</div>
      </ContentContainer>
      <ContentContainer title="태그">
        <TagGroup tags={data?.payload.tags || []} />
      </ContentContainer>
    </div>
  );
}

export default MainSideSection;
