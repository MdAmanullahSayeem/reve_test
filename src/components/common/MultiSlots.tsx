import { DefaultProps, RangeDataType } from '@/types';
import InputRange from './InputRange';

interface PropTypes extends DefaultProps {
  slots: RangeDataType[];
}

export default function MultiSlots({ slots, children }: PropTypes) {
  return (
    <>
      {/* <AddSlotForm onSubmit={(data) => console.log(data)}>
            <div className="w-96 py-10">
              <InputRange range={slots[1]} />
              <div className="mt-4">
                <MinSlot strokeWidth={8} />
              </div>
              <div className="mt-[3px]">
                <MinSlot strokeWidth={2} />
              </div>
              <HourSlot />
            </div>
          </AddSlotForm> */}
      <div>
        {slots?.map((slot, i) => (
          <div key={i} className={`w-full`}>
            <InputRange editMode={false} range={slot} />
          </div>
        ))}
      </div>
      {children}
    </>
  );
}
