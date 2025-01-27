import { useRef } from 'react';

export default function HourSlot({ color = '#909FAC', hourGap = 2 }) {
  const sliderTrack = useRef<HTMLDivElement | null>(null);
  const totalHour = (24 / hourGap) | (0 + 1);

  return (
    <div
      style={{ color: color }}
      ref={sliderTrack}
      className={`w-full flex items-center justify-between [&>_p]:text-[10px] [&>_p]:whitespace-nowrap`}
    >
      {[...new Array(totalHour)].map((_, i) =>
        i * hourGap === 0 || i * hourGap == 24 ? (
          <p key={i}>12 AM</p>
        ) : i * hourGap < 12 ? (
          <p key={i}>{i * hourGap} AM</p>
        ) : (
          <p key={i}>{i * hourGap} PM</p>
        )
      )}
    </div>
  );
}
