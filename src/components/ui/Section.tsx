import { DefaultProps } from '@/types';

export default function Section({ children, className }: DefaultProps) {
  return (
    <div className={`my-[-1px] w-full ${className || ''}`}>{children}</div>
  );
}
