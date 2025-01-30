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

export default function DelSlot({ day }: { day: string }) {
  const { delSlot, slotContext } = useSlotContext();
  const { slots } = slotContext[day] || {};

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
          <AlertDialogAction onClick={() => delSlot(slots[0])}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
