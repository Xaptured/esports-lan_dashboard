import { localDomain } from '@/constants/configuration-constannts';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function domainProvider(endpoint: string) {
  return `${localDomain}${endpoint}`;
}
