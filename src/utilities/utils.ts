import { localDomain } from '@/constants/configuration-constannts';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function domainProvider(endpoint: string) {
  return `${localDomain}${endpoint}`;
}

export function getGreeting(): string {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'Good morning';
  } else if (hours < 18) {
    return 'Good afternoon';
  } else if (hours < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
}

type GreetingCallback = (message: string) => void;

export function startGreetingInterval(callback: GreetingCallback): void {
  // Set an interval to check every 5 minutes (300000 ms)
  setInterval(() => {
    callback(getGreeting());
  }, 300000);
}
