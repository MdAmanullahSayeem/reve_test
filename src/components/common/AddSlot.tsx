import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { GoPlus } from 'react-icons/go';
import AddSlotForm from '../ui/forms/AddSlotForm';
import { Input } from '../ui/input';
import SingleSlot from './SingleSlot';
import { RangeDataType } from '@/types';
import { useSlotContext } from '@/hooks/useSlotContext';

export default function AddSlot({ day }: { day: string }) {
  const { updateSlotContext, slotContext } = useSlotContext();
  const { slots, options } = slotContext[day];
  const [error, setError] = useState('');
  const lastEndTime = slots[slots.length - 1].end;

  const handleFormData = useCallback(
    (data: RangeDataType) => {
      const { start } = data;
      if (start <= lastEndTime) {
        setError('Slot is already filled');
        return;
      }
      const newSlots = [...slots, data];
      updateSlotContext((prev) => ({
        ...prev,
        [day]: { options, slots: newSlots },
      }));
    },
    [lastEndTime, updateSlotContext, slots, day, options]
  );
  return (
    <div className="absolute right-[10%] -bottom-4 bg-white">
      <Dialog>
        <DialogTrigger>
          <GoPlus
            className="w-[30px] h-[20px] rounded-full border border-[#D3D8DD]"
            size={24}
          />
        </DialogTrigger>
        <DialogContent aria-describedby="slot input" className="p-10">
          <DialogTitle aria-labelledby="slot input" />
          <AddSlotForm onSubmit={handleFormData}>
            <>
              <Input
                className="mb-4 outline-none focus-within:outline-none"
                type="date"
                name="date"
              />
              <SingleSlot className="py-10" />
              {error && <p className="mb-4 text-yellow-400">{error}</p>}
            </>
          </AddSlotForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
