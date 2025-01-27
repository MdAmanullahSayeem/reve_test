import { useCallback, useEffect, useRef, useState } from 'react';
import './InputRange.css';
import { RangeDataType } from '@/types';
import { minToTimeString } from '@/utils/helper';

type PropTypes = {
  fill?: string;
  track?: string;
  editMode?: boolean;
  minGap?: number;
  range?: RangeDataType;
  min?: number;
  max?: number;
  step?: number;
  isEmpty?: boolean;
};

export default function InputRange({
  fill = '#266AFF',
  track = '#E6EAED',
  editMode = true,
  minGap = 20,
  min = 0,
  max = 1440,
  step = 10,
  range = { start: 60, end: 75 },
  isEmpty = false,
}: PropTypes) {
  const [currentRange, updateCurrentRange] = useState({ ...range });
  const { start, end } = currentRange;

  const slider1 = useRef<HTMLInputElement | null>(null);
  const slider2 = useRef<HTMLInputElement | null>(null);
  const sliderTrack = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const emptyRef = useRef<HTMLDivElement | null>(null);
  const startProps = minToTimeString(start);
  const endProps = minToTimeString(end);

  const fillColor = useCallback(() => {
    if (isEmpty && emptyRef.current) {
      emptyRef.current.style.background = track;
      emptyRef.current.style.height = '6px';
      return;
    }
    if (
      !slider1.current ||
      !slider2.current ||
      !sliderTrack.current ||
      !startRef.current ||
      !endRef.current
    )
      return;
    const percent1 = (start / max) * 100;
    const percent2 = (end / max) * 100;
    const reduce1 = 10 - 20 * percent1 * 0.01;
    const reduce2 = 10 - 20 * percent2 * 0.01;
    startRef.current.style.left = `calc(${percent1}% + ${reduce1}px)`;
    endRef.current.style.left = `calc(${percent2}% + ${reduce2}px)`;
    sliderTrack.current.style.background = `linear-gradient(to right, ${track} ${percent1}% ,${fill} ${percent1}%, ${fill} ${percent2}% , ${track} ${percent2}%, ${track} 100%)`;
  }, [fill, track, start, end, max, isEmpty]);

  useEffect(() => {
    fillColor();
  }, [fillColor]);

  if (isEmpty)
    return (
      <div
        ref={emptyRef}
        className={`input-range rounded-[3px] isEmpty relative bg-[${track}] ${
          editMode && 'edit'
        }`}
      >
        <div className="absolute left-[30%] bottom-[24px] whitespace-nowrap text-[#253748] text-[13px]">
          Business is offline{' '}
          <span className="text-[#909FAC]">( +Add business hour)</span>
        </div>
      </div>
    );

  return (
    <div className={`input-range relative ${editMode && 'edit'}`}>
      <div ref={sliderTrack} className="slider-track"></div>
      <div className="label" ref={startRef}>
        <div>
          {startProps.hr}:{startProps.min} {startProps.amp}
        </div>
      </div>
      <div className="label" ref={endRef}>
        <div>
          {endProps.hr}:{endProps.min} {endProps.amp}
        </div>
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
