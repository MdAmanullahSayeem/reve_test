import { DefaultProps } from '@/types';
import InputRange from './InputRange';
import { useSlotContext } from '@/hooks/useSlotContext';
import { useCallback, useState } from 'react';
import AddSlot from './AddSlot';

interface PropTypes extends DefaultProps {
  day: string;
}

export default function MultiSlots({ day }: PropTypes) {
  const [isDelOp, setIsDelOp] = useState([0, 0]);
  const [isAddOp, setIsAddOp] = useState([0, 0]);
  const { slotContext } = useSlotContext();
  const { slots = [] } = slotContext[day];
  const max = 1440;
  const handleMouseLeaveFromRow = useCallback(() => {
    setIsAddOp([0, 0]);
    setIsDelOp([0, 0]);
  }, []);

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const leftTime = (max / width) * x;
      const { start, end } = slots[0] || {};

      if (!start) {
        setIsAddOp([100, 0]);
        setIsDelOp([0, 0]);
        return;
      }

      if (leftTime < start) {
        setIsAddOp([100, 0]);
        setIsDelOp([0, 0]);
        return;
      }

      if (leftTime < end) {
        setIsDelOp([100, 0]);
        setIsAddOp([0, 0]);
        return;
      }
      const { start: next_start, end: next_end } = slots[1] || {};
      if (!next_start) {
        setIsAddOp([0, 100]);
        setIsDelOp([0, 0]);
        return;
      }

      if (leftTime < next_start) {
        setIsAddOp([0, 0]);
        setIsDelOp([0, 0]);
        return;
      }

      if (leftTime < next_end) {
        setIsDelOp([0, 100]);
        setIsAddOp([0, 0]);
        return;
      }
      if (leftTime > next_end) {
        setIsDelOp([0, 0]);
        setIsAddOp([0, 100]);
        return;
      }
    },
    [setIsAddOp, slots]
  );

  const restOpacity = useCallback(() => {
    setIsAddOp([0, 0]);
    setIsDelOp([0, 0]);
  }, []);

  return (
    <>
      <div
        onMouseLeave={handleMouseLeaveFromRow}
        onMouseOver={(e) => handleMouseOver(e)}
        className="relative left-0 top-0 -mt-[30px] pt-[30px] h-[60px] w-full bg-transparent"
      >
        <div className="day-slots relative bg-[#E6EAED] h-[6px] rounded-[3px]">
          {slots?.map((slot, i) => (
            <InputRange
              key={slot.id + i}
              slot={slot}
              nextStart={slots[i + 1]?.start}
              prevEnd={slots[i - 1]?.end}
              day={day}
              opacity={isDelOp[i]}
              restOpacity={restOpacity}
            />
          ))}

          <AddSlot day={day} opacity={isAddOp} />
          {!slots.length && <InputRange day={day} isEmpty={true} />}
        </div>
      </div>
    </>
  );
}
