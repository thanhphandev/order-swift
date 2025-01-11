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


