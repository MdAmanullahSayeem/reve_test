import DelIcon from '@/assets/TrashSimple.svg';
import { useSlotContext } from '@/hooks/useSlotContext';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '../ui/dialog';
import { GoX } from 'react-icons/go';
import { useCallback, useState } from 'react';

export default function DelSlot({ day }: { day: string }) {
  const [open, setOpen] = useState(false);

  const { delSlot, slotContext } = useSlotContext();
  const { slots } = slotContext[day] || {};

  const handleDel = useCallback(() => {
    delSlot(slots[0]);
    setOpen(false);
  }, [delSlot, slots]);

  return (
    <div className="absolute left-[18%] top-[16px] bg-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="dialog-overlay" />
        <DialogClose className="hidden" />
        <DialogTrigger onClick={() => setOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-md">
            <img src={DelIcon} alt="DelIcon" />
          </div>
        </DialogTrigger>
        <DialogContent
          aria-describedby="slot input"
          className="unstyled-dialog"
        >
          <div className="dialog-content p-4 max-w-lg">
            <div className="bg-white rounded-[8px] p-8">
              <div className="p-[2px] absolute bg-white  top-0 right-0 rounded-full opacity-90 cursor-pointer hover:shadow-gray-400 shadow-gray-500 shadow-sm">
                <GoX
                  onClick={() => setOpen(false)}
                  size={32}
                  color="#647491"
                  className="hover:bg-blue-100 rounded-full p-[2px]"
                />
              </div>

              <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h2 className="text-lg font-semibold">
                  Are you absolutely sure?
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <button
                  onClick={() => setOpen(false)}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 mt-2 sm:mt-0"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDel}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 h-10 px-4 py-2"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
