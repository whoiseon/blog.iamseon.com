'use client';

import ConfigToggleWrapper from '@/src/shared/ui/lab/ConfigToggleWrapper';
import { Icons } from '@/src/shared/assets';
import AddSeriesBox from '@/src/widgets/write/ui/PublishContainer/ConfigSection/SeriesConfig/AddSeriesBox';
import SeriesList from '@/src/widgets/write/ui/PublishContainer/ConfigSection/SeriesConfig/SeriesList/SeriesList';

function SeriesConfig() {
  return (
    <ConfigToggleWrapper
      icon={<Icons.Series width={20} height={20} />}
      title="시리즈 추가"
    >
      <div className="">
        <div className="flex flex-col">
          <AddSeriesBox />
          <SeriesList />
        </div>
      </div>
    </ConfigToggleWrapper>
  );
}

export default SeriesConfig;
