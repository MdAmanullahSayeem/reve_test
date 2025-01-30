import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogClose,
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
  const [open, setOpen] = useState(false);
  const { addSlot, slotContext } = useSlotContext();
  const { slots } = slotContext[day];
  const [error, setError] = useState('');

  const handleFormData = useCallback(
    (data: RangeDataType) => {
      const { start, end, date } = data;
      const nextSlot = slots.find((slot) => slot.start >= start); //last
      const prevSlot = [...slots].reverse().find((slot) => slot.start <= start);
      const isValid =
        start > (prevSlot?.end || -1) && end < (nextSlot?.start || Infinity);
      if (!isValid) {
        setError('Slot is already filled');
        return;
      }
      const nextId = day + '_' + (slots.length + 1);
      addSlot({ date, start: Number(start), end: Number(end), id: nextId });
      setOpen(false);
      setError('');
    },
    [addSlot, day, slots]
  );

  return (
    <div className="absolute right-[10%] -bottom-4 bg-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogClose />
        <DialogTrigger onClick={() => setOpen(true)}>
          <GoPlus
            className="w-[30px] h-[20px] rounded-full border border-[#D3D8DD]"
            size={24}
          />
        </DialogTrigger>
        <DialogContent
          aria-describedby="slot input"
          className="p-10 left-[50%] !-top-[50%] data-[state=open]:!top-[70%] "
        >
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
