import DelIcon from '@/assets/TrashSimple.svg';
import { useSlotContext } from '@/hooks/useSlotContext';
import { useCallback, useMemo } from 'react';
import { RangeDataType } from '@/types';

export default function DelSlot({
  slot,
  max = 1440,
  className = '',
}: {
  slot: RangeDataType;
  max?: number;
  className?: string;
}) {
  const { start, end } = slot;

  const left = useMemo(() => {
    return ((start + (((end - start) / 2) | 0)) * 100) / max + '%';
  }, [end, start, max]);

  const { delSlot } = useSlotContext();

  const handleDel = useCallback(() => {
    delSlot(slot);
  }, [delSlot, slot]);

  return (
    <div
      style={{ left: left }}
      onClick={handleDel}
      className={`del-icon ${className}`}
    >
      <img src={DelIcon} alt="DelIcon" />
    </div>
  );
}
