'use client';

import ConfigToggleWrapper from '@/src/shared/ui/lab/ConfigToggleWrapper';
import { Icons } from '@/src/shared/assets';

function SeriesConfig() {
  return (
    <ConfigToggleWrapper
      icon={<Icons.Series width={20} height={20} />}
      title="시리즈 추가"
    >
      <div className="px-5 md:px-2 md:h-[180px]">1222</div>
    </ConfigToggleWrapper>
  );
}

export default SeriesConfig;
