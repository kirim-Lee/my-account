'use client';

import { getDateFullString, getDateString } from '@/app/lib/util';
import { useEffect, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

const DateController = <Form extends {}>({
  control,
  name,
  label,
}: UseControllerProps<Form> & { label: string }) => {
  const { field } = useController({
    control,
    name,
    rules: { pattern: /^\d{2}.(0[1-9]|1[0-2]).(0[1-9]|[1-2]\d|3[0-1])$/ },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = getDateString(event.target.value, field.value);
    if (nextValue !== field.value) {
      setValue(nextValue);
      field.onChange(nextValue);
    }
  };

  const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = getDateFullString(event.target.value);
    setValue(nextValue);
    field.onChange(nextValue);
  };

  const [value, setValue] = useState((field.value as string) ?? '');

  useEffect(() => {
    if (value !== field.value) setValue(field.value);
  }, [value, field.value]);

  return (
    <input
      type="text"
      className="text-input"
      placeholder={`${label ?? ''} YY.MM.DD`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default DateController;
