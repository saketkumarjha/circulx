import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



// Utility function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers with proper thousand separators
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

// Format currency values in USD without decimal places
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

