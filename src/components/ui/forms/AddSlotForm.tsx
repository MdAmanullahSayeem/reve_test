import { DefaultProps, RangeDataType } from '@/types';
import { getFormData } from '@/utils/helper';
import React, { useCallback } from 'react';

interface PropTypes extends DefaultProps {
  onSubmit: (range: RangeDataType) => void;
}
export default function AddSlotForm({
  onSubmit,
  children,
  className = '',
}: PropTypes) {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = getFormData(e.currentTarget) as unknown;
      onSubmit(formData as RangeDataType);
    },
    [onSubmit]
  );

  return (
    <form className={`${className}`} onSubmit={(e) => handleSubmit(e)}>
      {children}
      <button
        className="px-2 py-1 text-sm border outline-2 hover:outline hover:border-blue-200 hover:outline-blue-200 rounded-md text-blue-600 border-blue-600"
        type="submit"
      >
        Add New
      </button>
    </form>
  );
}
