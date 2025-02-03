import { GoPlus } from 'react-icons/go';
import { useSlotContext } from '@/hooks/useSlotContext';

export default function AddSlot({
  day,
  opacity = [0, 0],
  max = 1440,
  className = '',
}: {
  day: string;
  max?: number;
  className?: string;
  opacity?: number[];
}) {
  const { slotContext, addSlot } = useSlotContext();
  const { slots = [] } = slotContext[day];

  const {
    start = 0,
    end = max,
    id,
  } = slots[slots.length - 1] || { start: 0, end: max, id: `${day}_${0}` };
  const min_gap = 120;
  const nextId = day + '_' + (id.split('_')[1] + 1);

  if (slots.length > 1) return null;
  if (slots.length) {
    return (
      <>
        {start > 110 && (
          <div
            onClick={() =>
              addSlot({
                start: (0 + start * 20 * 0.01) | 0,
                end: (start - start * 20 * 0.01) | 0,
                date: '',
                id: nextId,
              })
            }
            style={{ left: `${(((start / 2) | 0) * 100) / max - 2}%` }}
            className={`add-icon opacity-${opacity[0]} ${className}`}
          >
            <GoPlus size={22} color="#6F8294" />
            <div className="popup">Add new time slot</div>
          </div>
        )}
        {max - end > min_gap && (
          <div
            onClick={() =>
              addSlot({
                start: (end + (max - end) * 20 * 0.01) | 0,
                end: (max - (max - end) * 20 * 0.01) | 0,
                date: '',
                id: nextId,
              })
            }
            style={{ left: `${((end + (max - end) / 2) * 100) / max}%` }}
            className={`add-icon opacity-${opacity[1]} ${className}`}
          >
            <GoPlus size={22} color="#6F8294" />
            <div className="popup">Add new time slot</div>
          </div>
        )}
      </>
    );
  }
  return (
    <div
      onClick={() =>
        addSlot({
          start: (0 + max * 20 * 0.01) | 0,
          end: (max - max * 20 * 0.01) | 0,
          date: '',
          id: nextId,
        })
      }
      style={{ left: `${((max / 2) * 100) / max}%` }}
      className={`add-icon opacity-${opacity[0]} ${className}`}
    >
      <GoPlus size={22} color="#6F8294" />
      <div className="popup">Add new time slot</div>
    </div>
  );
}
