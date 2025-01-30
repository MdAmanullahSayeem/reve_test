import Section from '../ui/Section';
import MinSlot from './MinSlot';
import HourSlot from './HourSlot';
import InputRange from './InputRange';
import { DefaultProps, RangeDataType } from '@/types';

interface PropTypes extends DefaultProps {
  slot?: RangeDataType;
}

export default function SingleSlot({ className = '', slot }: PropTypes) {
  return (
    <div className={`${className}`}>
      <InputRange formElement={true} slot={slot} />
      <Section className="pt-4">
        <MinSlot strokeWidth={8} />
      </Section>
      <Section>
        <MinSlot strokeWidth={2} />
      </Section>
      <Section>
        <HourSlot />
      </Section>
    </div>
  );
}
