import { DefaultProps } from '@/types';

export default function Section({ children, className }: DefaultProps) {
  return <div className={`my-[3px] w-full ${className || ''}`}>{children}</div>;
}
