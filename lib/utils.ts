import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMegabytes(bytes: number): number {
  return bytes / (1024 * 1024);
}
