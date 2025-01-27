import { DefaultProps } from '@/types';
import { useState } from 'react';
import { SlotContext } from './SlotContext';

import { SlotsDataType } from '@/types';

const slotsData: SlotsDataType = {
  Sun: {
    options: {
      isAddButton: true,
      isMinSlot: true,
      isDashSlot: true,
      isHourSlot: true,
    },
    slots: [
      { start: 100, end: 500 },
      { start: 700, end: 1400 },
    ],
  },
  Mon: { options: { isMinSlot: true }, slots: [{ start: 100, end: 500 }] },
  Tue: { options: { isMinSlot: true }, slots: [] },
  Wed: { options: { isMinSlot: true }, slots: [{ start: 100, end: 500 }] },
  Thr: { options: { isMinSlot: true }, slots: [{ start: 100, end: 500 }] },
  Fri: { options: { isMinSlot: true }, slots: [] },
  Sat: { options: { isMinSlot: true }, slots: [] },
};

export default function SlotContextProvider({ children }: DefaultProps) {
  const [slotContext, updateSlotContext] = useState(slotsData);

  return (
    <SlotContext.Provider value={{ slotContext, updateSlotContext }}>
      {children}
    </SlotContext.Provider>
  );
}
