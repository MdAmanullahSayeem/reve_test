import { HourToStringT } from '@/types';

export function getFormData(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);
  const data: { [key: string]: FormDataEntryValue } = {};
  for (const [k, v] of formData.entries()) {
    data[k] = v;
  }
  return data;
}

export function minToTimeString(min: number) {
  const hr = (min / 60) | 0;
  const reminder = min % 60;
  const data: HourToStringT = {
    hr: hr === 0 || hr === 24 || hr === 12 ? 12 : hr % 12,
    min: Number(reminder.toFixed(2)),
    amp: hr > 11 && hr < 24 ? 'PM' : 'AM',
  };
  return data;
}
