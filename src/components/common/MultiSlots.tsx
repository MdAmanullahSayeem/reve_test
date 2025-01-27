import { DefaultProps } from '@/types';
import InputRange from './InputRange';

import Section from '../ui/Section';
import MinSlot from './MinSlot';
import HourSlot from './HourSlot';
import AddSlot from './AddSlot';
import { useSlotContext } from '@/hooks/useSlotContext';

interface PropTypes extends DefaultProps {
  day: string;
}

export default function MultiSlots({ day }: PropTypes) {
  const { slotContext } = useSlotContext();
  const { options, slots } = slotContext[day];
  const { isAddButton, isDashSlot, isMinSlot, isHourSlot } = options;

  return (
    <>
      <div className="relative">
        {slots?.map((slot, i) => (
          <div key={i} className={`w-full`}>
            <InputRange editMode={true} range={slot} />
          </div>
        ))}
        {!slots.length && (
          <div className={`w-full`}>
            <InputRange editMode={false} isEmpty={true} />
          </div>
        )}
        {isAddButton && <AddSlot day={day} />}
      </div>
      {isMinSlot && (
        <Section className="pt-4">
          <MinSlot strokeWidth={8} />
        </Section>
      )}
      {isDashSlot && (
        <Section className="">
          <MinSlot strokeWidth={2} />
        </Section>
      )}
      {isHourSlot && (
        <Section>
          <HourSlot />
        </Section>
      )}
    </>
  );
}
