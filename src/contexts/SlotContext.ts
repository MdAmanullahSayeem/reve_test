import { SlotsDataType } from '@/types';
import { createContext, Dispatch, SetStateAction } from 'react';

interface SlotContextType {
  slotContext: SlotsDataType;
  updateSlotContext: Dispatch<SetStateAction<SlotsDataType>>;
}

const defaultData: SlotContextType = {
  slotContext: {
    Jan: {
      options: {},
      slots: [
        { start: 100, end: 500 },
        { start: 700, end: 1400 },
      ],
    },
    Feb: { options: {}, slots: [{ start: 100, end: 500 }] },
  },
  updateSlotContext: () => {},
};

export const SlotContext = createContext<SlotContextType>(defaultData);
