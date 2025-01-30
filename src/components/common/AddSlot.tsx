import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '../ui/dialog';
import { GoPlus } from 'react-icons/go';
import AddSlotForm from '../ui/forms/AddSlotForm';
import { Input } from '../ui/input';
import SingleSlot from './SingleSlot';
import { RangeDataType } from '@/types';
import { useSlotContext } from '@/hooks/useSlotContext';
import { GoX } from 'react-icons/go';
import OverFlow from '../ui/OverFlow';

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
        <DialogOverlay className="dialog-overlay" />
        <DialogTrigger onClick={() => setOpen(true)}>
          <GoPlus
            className="w-[30px] h-[20px] rounded-full border border-[#D3D8DD]"
            size={24}
          />
        </DialogTrigger>
        <DialogContent
          aria-describedby="slot input"
          className="unstyled-dialog"
        >
          <div className="dialog-content p-4">
            <div className="bg-white rounded-[8px] p-8">
              <div className="p-[2px] absolute bg-white  top-0 right-0 rounded-full opacity-90 cursor-pointer hover:shadow-gray-400 shadow-gray-500 shadow-sm">
                <GoX
                  onClick={() => setOpen(false)}
                  size={32}
                  color="#647491"
                  className="hover:bg-blue-100 rounded-full p-[2px]"
                />
              </div>

              <AddSlotForm onSubmit={handleFormData} className="">
                <OverFlow>
                  <>
                    <Input
                      className="mb-4 outline-none border-[#d3dbe5] border-2 hover:border-[#acb8cb] focus-visible:ring-0"
                      type="date"
                      name="date"
                    />

                    <SingleSlot className="py-10" />
                    {error && <p className="mb-4 text-yellow-400">{error}</p>}
                  </>
                </OverFlow>
              </AddSlotForm>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
