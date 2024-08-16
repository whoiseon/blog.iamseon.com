'use client';

import { useGetListSeries } from '@/src/widgets/write/api/useGetListSeries';
import RadioGroup from '@/src/shared/ui/lab/RadioGroup/RadioGroup';
import Radio from '@/src/shared/ui/controls/Radio/Radio';
import { usePublish, usePublishActions } from '@/src/shared/states';

function SeriesList() {
  const { data: series, isLoading } = useGetListSeries();
  const { seriesId, ...store } = usePublish();
  const { setPublishStore } = usePublishActions();

  const handleChangeSeriesId = (seriesId: number) => {
    setPublishStore({
      ...store,
      seriesId,
    });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col p-2 h-[180px] max-h-[180px] overflow-y-auto custom-scroll-bar">
      <RadioGroup>
        <Radio
          title="설정 안 함"
          selected={!seriesId}
          onClick={() => handleChangeSeriesId(0)}
        />
        {series?.payload?.map((item) => (
          <Radio
            key={item.id}
            title={item.name}
            selected={item.id === seriesId}
            onClick={() => handleChangeSeriesId(item.id)}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default SeriesList;
