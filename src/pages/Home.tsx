import HourSlot from '@/components/common/HourSlot';
import InputRange from '@/components/common/InputRange';
import MinSlot from '@/components/common/MinSlot';
import AddSlotForm from '@/components/ui/forms/AddSlotForm';
import { useState } from 'react';
const defaultSlots = [
  { start: 20, end: 50 },
  { start: 70, end: 100 },
];
export default function Home() {
  const [slots, updatedSlots] = useState(defaultSlots);
  return (
    <div className="">
      <AddSlotForm onSubmit={(data) => console.log(data)}>
        <div className="w-96 py-10">
          <InputRange />
          <div className="mt-4">
            <MinSlot />
            <HourSlot />
          </div>
        </div>
      </AddSlotForm>

      <div className="flex">
        {slots?.map((_, i) => (
          <div key={i} className={`w-16`}>
            <InputRange editMode={false} range={{ start: 0, end: 100 }} />
          </div>
        ))}
      </div>
      {/* <div className="w-52">
        <InputRange />
      </div>
      <div className="w-52">
        <InputRange />
      </div>
      <div className="w-52">
        <InputRange />
      </div> */}
    </div>
  );
}
