'use client';

import ContentContainer from '@/src/shared/ui/lab/ContentContainer';
import TagGroup from '@/src/widgets/tag/ui/TagGroup';
import { useGetAllTags } from '@/src/widgets/main/api';
import MainSeriesList from '@/src/widgets/series/ui/MainSeriesList';

function MainSideSection() {
  const { data } = useGetAllTags();

  return (
    <div className="sticky top-[74px]">
      <ContentContainer title="시리즈" titleSize="sm">
        <MainSeriesList />
      </ContentContainer>
      <ContentContainer title="태그" titleSize="sm">
        <TagGroup tags={data?.payload.tags || []} />
      </ContentContainer>
    </div>
  );
}

export default MainSideSection;
