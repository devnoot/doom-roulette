import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomFromArray(items: any[]) {
  return items[Math.floor(Math.random() * items.length)]
}
