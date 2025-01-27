import React from 'react';

export interface DefaultProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

export interface RangeDataType {
  start: number;
  end: number;
}

export interface HourToStringT {
  hr: number;
  min: number;
  amp: string;
}
