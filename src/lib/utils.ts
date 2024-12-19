import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCardNumber(value: string): string {
  return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
}

export function validateBIN(bin: string): boolean {
  return /^\d{6}$/.test(bin);
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}