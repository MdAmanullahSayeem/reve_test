import { minToTimeString } from '@/utils/helper';
import { useRef } from 'react';

export default function HourSlot({
  color = '#909FAC',
  hourGap = 2,
  className = '',
}) {
  const sliderTrack = useRef<HTMLDivElement | null>(null);
  const totalHour = (24 / hourGap) | (0 + 1);

  return (
    <div
      style={{ color: color }}
      ref={sliderTrack}
      className={`w-full flex items-center justify-between [&>_p]:text-[10px] [&>_p]:whitespace-nowrap ${className}`}
    >
      {[...new Array(totalHour)].map((_, i) => (
        <p key={i}>
          {minToTimeString(i * hourGap * 60).hr +
            ' ' +
            minToTimeString(i * hourGap * 60).amp}
        </p>
      ))}
    </div>
  );
}
