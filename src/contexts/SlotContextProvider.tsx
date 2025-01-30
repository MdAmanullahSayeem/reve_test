import { DefaultProps } from '@/types';
import { SlotContext } from './SlotContext';
import { useSlots } from '@/hooks/useSlots';

export default function SlotContextProvider({ children }: DefaultProps) {
  const { slotContext, updateSlot, addSlot, delSlot } = useSlots();
  console.log(slotContext);

  return (
    <SlotContext.Provider value={{ slotContext, updateSlot, addSlot, delSlot }}>
      {children}
    </SlotContext.Provider>
  );
}
