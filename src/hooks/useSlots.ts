import { RangeDataType, SlotsDataType } from '@/types';
import { useCallback, useState } from 'react';

export const slotsData: SlotsDataType = {
  Sun: {
    options: {
      isAddButton: true,
      isMinSlot: true,
      isDashSlot: true,
      isHourSlot: true,
      isDelButton: true,
    },
    slots: [
      { id: 'Sun_1', start: 100, end: 500 },
      { id: 'Sun_2', start: 700, end: 1000 },
    ],
  },
  Mon: {
    options: { isMinSlot: true },
    slots: [{ id: 'Mon_1', start: 100, end: 500 }],
  },
  Tue: { options: { isMinSlot: true }, slots: [] },
  Wed: {
    options: { isMinSlot: true },
    slots: [{ id: 'Wed_1', start: 100, end: 500 }],
  },
  Thr: {
    options: { isMinSlot: true },
    slots: [{ id: 'Thr_1', start: 100, end: 500 }],
  },
  Fri: { options: { isMinSlot: true }, slots: [] },
  Sat: { options: { isMinSlot: true }, slots: [] },
};

export const useSlots = () => {
  const [slotContext, updateSlotContext] = useState(slotsData);

  const updateSlot = useCallback(
    (data: RangeDataType) => {
      const [day] = data.id.split('_');
      const { options, slots } = slotContext[day];

      const newSlots = slots?.map((slot) =>
        data.id === slot.id ? data : slot
      );
      updateSlotContext((prev) => ({
        ...prev,
        [day]: { options, slots: newSlots },
      }));
    },
    [slotContext]
  );

  const delSlot = useCallback(
    (data: RangeDataType) => {
      const [day] = data.id.split('_');
      const { options, slots } = slotContext[day];

      const newSlots = slots?.filter((slot) => data.id !== slot.id);
      updateSlotContext((prev) => ({
        ...prev,
        [day]: { options, slots: newSlots },
      }));
    },
    [slotContext]
  );

  const addSlot = useCallback(
    (data: RangeDataType) => {
      const [day] = data.id.split('_');
      const { options, slots } = slotContext[day];

      const newSlots = [...slots, data].sort((a, b) => a.start - b.start);
      updateSlotContext((prev) => ({
        ...prev,
        [day]: { options, slots: newSlots },
      }));
    },
    [slotContext]
  );

  return { slotContext, addSlot, delSlot, updateSlot };
};
