import { DefaultProps } from '@/types';
import InputRange from './InputRange';
import MinSlot from './MinSlot';
import HourSlot from './HourSlot';
import AddSlot from './AddSlot';
import { useSlotContext } from '@/hooks/useSlotContext';
import DelSlot from './DelSlot';

interface PropTypes extends DefaultProps {
  day: string;
}

export default function MultiSlots({ day }: PropTypes) {
  const { slotContext } = useSlotContext();
  const { options, slots } = slotContext[day];
  const { isAddButton, isDelButton, isDashSlot, isMinSlot, isHourSlot } =
    options;

  return (
    <>
      <div className="relative">
        {slots?.map((slot, i) => (
          <InputRange
            clipPath={i !== 0}
            key={i}
            editMode={false}
            range={slot}
          />
        ))}
        {!slots.length && <InputRange editMode={false} isEmpty={true} />}
        {isAddButton && <AddSlot day={day} />}
        {isDelButton && <DelSlot day={day} />}
      </div>
      {isMinSlot && <MinSlot strokeWidth={8} className="pt-[22px] -mt-1.5" />}
      {isDashSlot && <MinSlot strokeWidth={2} />}
      {isHourSlot && <HourSlot />}
    </>
  );
}
