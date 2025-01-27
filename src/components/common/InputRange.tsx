import { useCallback, useEffect, useRef, useState } from 'react';
import './InputRange.css';
import { RangeDataType } from '@/types';

type PropTypes = {
  fill?: string;
  track?: string;
  editMode?: boolean;
  minGap?: number;
  range?: RangeDataType;
  min?: number;
  max?: number;
  step?: number;
};

export default function InputRange({
  fill = '#266AFF',
  track = '#E6EAED',
  editMode = true,
  minGap = 10,
  min = 0,
  max = 360,
  step = 10,
  range = { start: 60, end: 75 },
}: PropTypes) {
  const [currentRange, updateCurrentRange] = useState({ ...range });
  const { start, end } = currentRange;

  const slider1 = useRef<HTMLInputElement | null>(null);
  const slider2 = useRef<HTMLInputElement | null>(null);
  const sliderTrack = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const fillColor = useCallback(() => {
    if (
      !slider1.current ||
      !slider2.current ||
      !sliderTrack.current ||
      !startRef.current ||
      !endRef.current
    )
      return;
    const percent1 = (start / Number(slider1.current.max)) * 100;
    const percent2 = (end / Number(slider1.current.max)) * 100;
    startRef.current.style.left = `${start + 10}px`;
    endRef.current.style.left = `${end + 10}px`;
    sliderTrack.current.style.background = `linear-gradient(to right, ${track} ${percent1}% ,${fill} ${percent1}%, ${fill} ${percent2}% , ${track} ${percent2}%, ${track} 100%)`;
  }, [fill, track, start, end]);

  useEffect(() => {
    fillColor();
  }, [fillColor]);

  return (
    <div className={`input-range relative ${editMode && 'edit'}`}>
      <div ref={sliderTrack} className="slider-track">
        <div ref={startRef}>
          {/* <p>{((start * 24) / max).toFixed(2)}</p> */}
        </div>
        <div ref={endRef}></div>
      </div>
      <input
        ref={slider1}
        type="range"
        step={step}
        min={min}
        max={max}
        value={start}
        name="start"
        onChange={(e) =>
          updateCurrentRange((prev) =>
            editMode && Number(e.target.value) < end - minGap
              ? { ...prev, start: Number(e.target.value) }
              : prev
          )
        }
      />
      <input
        ref={slider2}
        type="range"
        min={min}
        max={max}
        step={step}
        name="end"
        value={end}
        onChange={(e) =>
          updateCurrentRange((prev) =>
            editMode && Number(e.target.value) > start + minGap
              ? { ...prev, end: Number(e.target.value) }
              : prev
          )
        }
      />
    </div>
  );
}
