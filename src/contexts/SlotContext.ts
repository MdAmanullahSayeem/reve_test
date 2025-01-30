import { RangeDataType, SlotsDataType } from '@/types';
import { createContext } from 'react';

interface SlotContextType {
  slotContext: SlotsDataType;
  updateSlot: (data: RangeDataType) => void;
  addSlot: (data: RangeDataType) => void;
  delSlot: (data: RangeDataType) => void;
}

const defaultData: SlotContextType = {
  slotContext: {
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
  },
  updateSlot: () => {},
  delSlot: () => {},
  addSlot: () => {},
};

export const SlotContext = createContext<SlotContextType>(defaultData);
