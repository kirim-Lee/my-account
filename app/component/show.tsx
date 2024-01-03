import { memo } from 'react';

const Show = ({
  active,
  children,
}: {
  active: unknown;
  children: React.ReactNode;
}) => {
  if (!active) return null;
  return children;
};

interface SwitchProps {
  condition: unknown;
  children: [positive: React.ReactNode, negative: React.ReactNode];
}

export const Switch = ({
  condition,
  children: [positive, negative],
}: SwitchProps) => {
  if (condition) return positive;
  return negative;
};

export default memo(Show);
