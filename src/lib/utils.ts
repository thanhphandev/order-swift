import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict} from 'date-fns'
import { vi } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function relativeDate(from: Date){
  if (isNaN(from.getTime())) {
    return 'Invalid date';
  }
  return formatDistanceToNowStrict(from, { addSuffix: true, locale: vi })
}

export function formatMoney(amount: number){
  return new Intl.NumberFormat('vi-VN',
    { style: 'currency',
     currency: 'VND' }).format(amount)
}

export function toPathLink(text: string): string {
  
  const from = "àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
  const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";
  
  let normalized = text
    .toLowerCase()
    .split('')
    .map(char => {
      const index = from.indexOf(char);
      return index !== -1 ? to[index] : char;
    })
    .join('');
  
  normalized = normalized
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return normalized;
}

export const getSegment = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  return segments;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}
