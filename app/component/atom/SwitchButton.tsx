'use client';

import { memo, useMemo } from 'react';

interface Props<T> {
  className?: string;
  checked: T;
  options: Option<T>[];
  onChange(value: T): void;
}
const SwitchButton = <T extends string | number>({
  className,
  checked,
  options,
  onChange,
}: Props<T>) => {
  const selectedIndex = useMemo(() => {
    const index = options.findIndex((option) => option.value === checked);
    return index < 0 ? 0 : index;
  }, [checked, options]);

  const selected = useMemo(
    () => options[selectedIndex],
    [selectedIndex, options]
  );

  const onClick = () =>
    onChange(options[selectedIndex + 1]?.value ?? options[0].value);

  return (
    <button className={className ?? ''} onClick={onClick}>
      {selected.label}
    </button>
  );
};

export default memo(SwitchButton);
