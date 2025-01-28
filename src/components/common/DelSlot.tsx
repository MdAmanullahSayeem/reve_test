import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import DelIcon from '@/assets/TrashSimple.svg';
import { useSlotContext } from '@/hooks/useSlotContext';
import { useCallback } from 'react';

export default function DelSlot({ day }: { day: string }) {
  const { updateSlotContext, slotContext } = useSlotContext();
  const { slots, options } = slotContext[day] || {};

  const handleDelete = useCallback(() => {
    const newSlots = slots.slice(1);
    updateSlotContext((prev) => ({
      ...prev,
      [day]: { options, slots: newSlots },
    }));
  }, [day, options, updateSlotContext, slots]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="absolute left-[18%] top-[16px] cursor-pointer flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-md">
          <img src={DelIcon} alt="DelIcon" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
