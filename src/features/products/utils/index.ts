import type { ProductCategory, ProductStatus } from '../types';

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  curtain_fabrics: 'Curtain Fabrics',
  hardware: 'Hardware',
  services: 'Services',
  accessories: 'Accessories',
};

export const PRODUCT_CATEGORY_STYLES: Record<ProductCategory, string> = {
  curtain_fabrics: 'bg-primary/10 text-primary',
  hardware: 'bg-warning/10 text-warning',
  services: 'bg-pink-100 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400',
  accessories: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400',
};

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
};

export const PRODUCT_UNITS = [
  'Mtr',
  'Feet',
  'Pack',
  'Visit',
  'Trip',
  'Pcs',
] as const;

export function formatInr(value: number): string {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function getSellingRate(baseRate: number, gstPercent: number): number {
  return Math.round(baseRate * (1 + gstPercent / 100) * 100) / 100;
}
