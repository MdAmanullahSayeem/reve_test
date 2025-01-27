import HourSlot from '@/components/common/HourSlot';
import MinSlot from '@/components/common/MinSlot';
import MultiSlots from '@/components/common/MultiSlots';
import Section from '@/components/ui/Section';

const defaultSlots = [
  { start: 100, end: 500 },
  { start: 700, end: 1400 },
];

export default function Home() {
  return (
    <div className="">
      <div className="mt-10">
        <MultiSlots slots={defaultSlots}>
          <Section className="pt-4">
            <MinSlot strokeWidth={8} />
          </Section>
          <Section>
            <MinSlot strokeWidth={2} />
          </Section>
          <Section>
            <HourSlot />
          </Section>
        </MultiSlots>
      </div>
    </div>
  );
}
