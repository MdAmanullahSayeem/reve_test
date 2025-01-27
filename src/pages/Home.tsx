import SlotContextProvider from '@/contexts/SlotContextProvider';
import Schedular from './Schedular';

export default function Home() {
  return (
    <SlotContextProvider>
      <Schedular />
    </SlotContextProvider>
  );
}
