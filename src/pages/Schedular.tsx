import MultiSlots from '@/components/common/MultiSlots';
import OverFlow from '@/components/ui/OverFlow';
import { useSlotContext } from '@/hooks/useSlotContext';

export default function Schedular() {
  const { slotContext } = useSlotContext();
  const keys = Object.keys(slotContext);
  const hasSlots = keys.map((k) => slotContext[k].slots.length);

  return (
    <OverFlow>
      <div className="min-w-[768px] p-4 lg:p-16">
        {keys?.map((day, i) => (
          <div key={i} className="my-14 grid grid-cols-12 gap-2 justify-center">
            <div className="col-span-1 -mt-4">
              <div
                className={`w-[59px] h-[32px] rounded-full text-center place-content-center text-[13px] ${
                  hasSlots[i]
                    ? 'bg-[#E1EDFF] text-[#004FFF]'
                    : 'bg-[#F3F3F3] text-[#4D657C]'
                }`}
              >
                {day}
              </div>
            </div>
            <div className="col-span-11 ">
              <MultiSlots day={day} />
            </div>
          </div>
        ))}
      </div>
    </OverFlow>
  );
}
