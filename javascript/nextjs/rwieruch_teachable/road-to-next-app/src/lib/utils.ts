import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(maxMs: number, minMs?: number) {
  const ms = Math.random() * (maxMs - (minMs || 0)) + (minMs || 0);
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export const delayQuery = () => delay(2000, 200);
