'use client';

import ConfigToggleWrapper from '@/src/shared/ui/lab/ConfigToggleWrapper';
import { Icons } from '@/src/shared/assets';
import RadioGroup from '@/src/shared/ui/lab/RadioGroup/RadioGroup';
import Radio from '@/src/shared/ui/controls/Radio/Radio';
import { usePublishStore } from '@/src/shared/states';

function PublicConfig() {
  const { isPublic, actions } = usePublishStore();

  const handleTogglePublicState = (state: boolean) => {
    actions.setIsPublic(state);
  };

  return (
    <ConfigToggleWrapper
      icon={<Icons.Lock width={20} height={20} />}
      title="공개 설정"
      border
    >
      <div className="px-5 md:px-2 pt-2 pb-4">
        <RadioGroup>
          <Radio
            title="전체 공개"
            selected={isPublic}
            onClick={() => handleTogglePublicState(true)}
          />
          <Radio
            title="비공개"
            selected={!isPublic}
            onClick={() => handleTogglePublicState(false)}
          />
        </RadioGroup>
      </div>
    </ConfigToggleWrapper>
  );
}

export default PublicConfig;
