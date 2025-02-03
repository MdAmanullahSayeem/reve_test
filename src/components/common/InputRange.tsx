import { useCallback, useEffect, useRef, useState } from 'react';
import './InputRange.css';
import { RangeDataType } from '@/types';
import { minToTimeString } from '@/utils/helper';
import { useSlotContext } from '@/hooks/useSlotContext';
import DelSlot from './DelSlot';
import MinSlot from './MinSlot';
import HourSlot from './HourSlot';

type PropTypes = {
  fill?: string;
  track?: string;
  minGap?: number;
  slot?: RangeDataType;
  min?: number;
  max?: number;
  step?: number;
  isEmpty?: boolean;
  clipPath?: boolean;
  nextStart?: number;
  prevEnd?: number;
  day?: string;
  formElement?: boolean;
  opacity?: number;
  restOpacity?: () => void;
};

export default function InputRange({
  fill = '#266AFF',
  track = '#E6EAED',
  minGap = 10,
  min = 0,
  max = 1440,
  step = 10,
  slot = { id: 'Sun_1', start: 60, end: 75 },
  isEmpty = false,
  nextStart = 1440,
  prevEnd = 0,
  opacity = 0,
  restOpacity = () => {},
}: PropTypes) {
  const [currentRange, updateCurrentRange] = useState(slot);
  const [isHrOp, setIsHrOp] = useState(0);

  const { updateSlot } = useSlotContext();
  const { start, end } = currentRange;

  const slider1 = useRef<HTMLInputElement | null>(null);
  const slider2 = useRef<HTMLInputElement | null>(null);
  const sliderTrack = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const emptyRef = useRef<HTMLDivElement | null>(null);
  const startProps = minToTimeString(start);
  const endProps = minToTimeString(end);

  const handleThumbUp = useCallback(() => {
    setIsHrOp(0);
    updateSlot(currentRange);
  }, [currentRange, updateSlot]);

  const handleThumbDown = useCallback(() => {
    setIsHrOp(100);
    restOpacity();
  }, [restOpacity]);

  const handleMouseEnter = useCallback(() => {
    setIsHrOp(0);
  }, []);

  const fillColor = useCallback(() => {
    if (isEmpty && emptyRef.current) {
      emptyRef.current.style.background = track;
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
    sliderTrack.current.style.clipPath = `inset(0 ${
      100 - percent2
    }% 0 ${percent1}%)`;
    sliderTrack.current.style.background = `${fill}`;
  }, [fill, track, start, end, max, isEmpty]);

  useEffect(() => {
    fillColor();
  }, [fillColor]);

  if (isEmpty)
    return (
      <div ref={emptyRef} className={`input-range isEmpty relative top-[2px]`}>
        <div className="text-label">
          Business is offline
          <span className="text-[#909FAC]"> ( +Add business hour)</span>
        </div>
        <MinSlot strokeWidth={8} className="absolute pt-[22px] -mt-3" />
        <MinSlot strokeWidth={2} className="absolute pt-[22px] -mt-[2px]" />
        <HourSlot className={`absolute top-6 opacity-${isHrOp}`} />
      </div>
    );

  return (
    <div className={`input-range relative top-[2px]`}>
      <MinSlot strokeWidth={8} className="absolute pt-[22px] -mt-3" />
      <MinSlot strokeWidth={2} className="absolute pt-[22px] -mt-[2px]" />
      <DelSlot max={max} slot={slot} className={`opacity-${opacity}`} />
      <HourSlot className={`absolute top-6 opacity-${isHrOp}`} />
      <div
        onMouseEnter={handleMouseEnter}
        ref={sliderTrack}
        className="slider-track relative cursor-default z-10"
      ></div>
      <div className="label" ref={startRef}>
        <div>
          {startProps.hr}:{startProps.min || '00'} {startProps.amp}
        </div>
      </div>
      <div className="label" ref={endRef}>
        <div>
          {endProps.hr}:{endProps.min || '00'} {endProps.amp}
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
        onMouseUp={handleThumbUp}
        onMouseDown={handleThumbDown}
        onChange={(e) =>
          updateCurrentRange((prev) =>
            Number(e.target.value) < end - minGap &&
            Number(e.target.value) > prevEnd
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
        onMouseUp={handleThumbUp}
        onMouseDown={handleThumbDown}
        onChange={(e) =>
          updateCurrentRange((prev) =>
            Number(e.target.value) > start + minGap &&
            Number(e.target.value) < nextStart
              ? { ...prev, end: Number(e.target.value) }
              : prev
          )
        }
      />
    </div>
  );
}
