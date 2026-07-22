import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, country?: string) {
  const activeCountry = country || (typeof window !== 'undefined' ? localStorage.getItem('zenhogar_country') : null) || 'CO';
  
  if (activeCountry === 'EC' || activeCountry === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatPriceForAPI(value: number) {
  return Math.round(value);
}

export function cleanPromoName(name: string) {
  return name.replace(/^(Combo|Oferta)\s*N°\s*\d+\s*/i, '');
}
