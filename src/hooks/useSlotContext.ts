import { SlotContext } from '@/contexts/SlotContext';
import { useContext } from 'react';

export const useSlotContext = () => useContext(SlotContext);
