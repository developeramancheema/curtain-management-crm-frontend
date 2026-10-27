import { format } from 'date-fns';
import type { Product, ProductCategory } from '../types';
import type { ProductFormData } from '../schemas';

const CATEGORY_THUMBNAILS: Record<ProductCategory, string> = {
  curtain_fabrics: '#c4b5a0',
  hardware: '#9aa3ad',
  services: '#7c6a9a',
  accessories: '#c9a227',
};

function formatTimestamp(date = new Date()): string {
  return format(date, 'dd MMM yyyy, hh:mm a');
}

function assertUniqueSku(
  sku: string,
  products: readonly Product[],
  ignoreId?: string
): void {
  const exists = products.some(
    (product) =>
      product.id !== ignoreId &&
      product.sku.toLowerCase() === sku.toLowerCase()
  );

  if (exists) {
    throw new Error('A product with this SKU already exists');
  }
}

function toFormValues(product: Product): ProductFormData {
  return {
    name: product.name,
    sku: product.sku,
    category: product.category,
    unit: product.unit,
    baseRate: product.baseRate,
    gstPercent: product.gstPercent,
    hsnCode: product.hsnCode,
    minOrderQty: product.minOrderQty,
    stockTracking: product.stockTracking,
    status: product.status,
    description: product.description,
    notes: product.notes,
  };
}

function createProduct(
  values: ProductFormData,
  products: readonly Product[]
): Product {
  assertUniqueSku(values.sku, products);
  const timestamp = formatTimestamp();

  return {
    id: `p-${Date.now()}`,
    ...values,
    thumbnailColor: CATEGORY_THUMBNAILS[values.category],
    usedInEstimatesThisMonth: 0,
    usedInEstimatesGrowth: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function updateProduct(
  product: Product,
  values: ProductFormData,
  products: readonly Product[]
): Product {
  assertUniqueSku(values.sku, products, product.id);

  return {
    ...product,
    ...values,
    updatedAt: formatTimestamp(),
  };
}

export { toFormValues, createProduct, updateProduct };
