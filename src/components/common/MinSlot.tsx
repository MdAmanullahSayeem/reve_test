import { useLayoutEffect, useRef, useState } from 'react';

export default function MinSlot({
  stroke = '#EFF2F4',
  strokeWidth = 8,
  className = '',
}) {
  const [width, setWidth] = useState(0);
  const sliderTrack = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sliderTrack.current) return;
    const { width } = sliderTrack.current.getBoundingClientRect();
    setWidth(width | 0);
  }, []);

  return (
    <div ref={sliderTrack} className={`w-full ${className}`}>
      <svg
        width={`${width}`}
        height={10}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <line
          x1={0}
          y1={0}
          y2={0}
          x2={width}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={Math.ceil(width / 360)}
        />
      </svg>
    </div>
  );
}
