'use client';

import PublicConfig from '@/src/widgets/write/ui/PublishContainer/ConfigSection/PublicConfig';
import SeriesConfig from '@/src/widgets/write/ui/PublishContainer/ConfigSection/SeriesConfig';

function ConfigSection() {
  return (
    <div className="w-full h-full flex flex-col pb-5">
      <PublicConfig />
      <SeriesConfig />
    </div>
  );
}

export default ConfigSection;
