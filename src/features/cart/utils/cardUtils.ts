import type { SizeOption } from "../types";
// Helper utility function (or inline)

export const getSizeLabel = (size: string | SizeOption): string => {
  if (typeof size === 'string') return size;
  return size?.label || size?.volume || '';
};