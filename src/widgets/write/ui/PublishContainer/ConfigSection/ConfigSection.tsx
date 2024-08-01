'use client';

import ConfigToggleWrapper from '@/src/shared/ui/lab/ConfigToggleWrapper';
import { Icons } from '@/src/shared/assets';

function ConfigSection() {
  return (
    <section className="h-full flex flex-col justify-between">
      <div className="w-full h-full flex flex-col">
        <ConfigToggleWrapper
          icon={<Icons.Lock width={20} height={20} />}
          title="공개 설정"
          border
        >
          123
        </ConfigToggleWrapper>
        <ConfigToggleWrapper
          icon={<Icons.Series width={20} height={20} />}
          title="시리즈 추가"
        >
          123
        </ConfigToggleWrapper>
      </div>
      <div>footer</div>
    </section>
  );
}

export default ConfigSection;
