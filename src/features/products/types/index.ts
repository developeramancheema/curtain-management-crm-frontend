export type ProductCategory =
  | 'curtain_fabrics'
  | 'hardware'
  | 'services'
  | 'accessories';

export type ProductUnit = 'Mtr' | 'Feet' | 'Pack' | 'Visit' | 'Trip' | 'Pcs';

export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  unit: ProductUnit;
  baseRate: number;
  gstPercent: number;
  hsnCode: string;
  minOrderQty: number;
  stockTracking: boolean;
  status: ProductStatus;
  description: string;
  notes: string;
  thumbnailColor: string;
  usedInEstimatesThisMonth: number;
  usedInEstimatesGrowth: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStats {
  totalProducts: number;
  totalGrowth: number;
  fabricItems: number;
  fabricGrowth: number;
  hardwareItems: number;
  hardwareGrowth: number;
  services: number;
  servicesGrowth: number;
  accessories: number;
}

export interface ProductFilters {
  search: string;
  category: string;
  unit: string;
  status: string;
  tab: 'all' | ProductCategory;
}
