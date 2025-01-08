import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function relativeDate(from: Date){
  return formatDistanceToNowStrict(from, { addSuffix: true })
}

export function formatMoney(amount: number){
  return new Intl.NumberFormat('vi-VN',
    { style: 'currency',
     currency: 'VND' }).format(amount)
}
