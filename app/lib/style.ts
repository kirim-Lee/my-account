import { CSSProperties } from 'react';

export const getGridColSpan = (num: number): CSSProperties => ({
  gridColumn: `span ${num} / span ${num}`,
});
