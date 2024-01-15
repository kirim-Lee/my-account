import { memo } from 'react';

interface Props<T> {
  name: string;
  option: Option<T>;
  isChecked: boolean;
  onCheck(value: T): void;
}

const Radio = <T extends string | number>({
  name,
  option: { label, value },
  isChecked,
  onCheck,
}: Props<T>) => {
  return (
    <div className="radio" key={label}>
      <label htmlFor={`${name}_${value}`}>{label}</label>
      <input
        type="radio"
        onChange={() => onCheck(value)}
        id={`${name}_${value}`}
        value={value}
        checked={isChecked}
      />
    </div>
  );
};

export default memo(Radio);
