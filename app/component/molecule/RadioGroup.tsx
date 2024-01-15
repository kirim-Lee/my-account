import { memo } from 'react';
import Radio from '../atom/Radio';

interface Props<T = unknown> {
  name: string;
  options: Option<T>[];
  checked: T;
  onCheck(value: T): void;
}

const RadioGroup = <T extends string | number>({
  checked,
  name,
  options,
  onCheck,
}: Props<T>) => {
  return (
    <div className="wrap-radio">
      {options.map((option) => (
        <Radio
          key={option.label}
          name={name}
          option={option}
          onCheck={onCheck}
          isChecked={checked === option.value}
        />
      ))}
    </div>
  );
};

export default memo(RadioGroup);
