import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  category: z.enum(['curtain_fabrics', 'hardware', 'services', 'accessories']),
  unit: z.enum(['Mtr', 'Feet', 'Pack', 'Visit', 'Trip', 'Pcs']),
  baseRate: z.number().min(0, 'Enter a valid base rate'),
  gstPercent: z.number().min(0).max(100, 'GST must be between 0 and 100'),
  hsnCode: z.string().min(1, 'HSN code is required'),
  minOrderQty: z
    .number()
    .int('Minimum quantity must be a whole number')
    .min(1, 'Minimum quantity must be at least 1'),
  stockTracking: z.boolean(),
  status: z.enum(['active', 'inactive']),
  description: z.string().min(1, 'Description is required'),
  notes: z.string(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  name: '',
  sku: '',
  category: 'curtain_fabrics',
  unit: 'Mtr',
  baseRate: 0,
  gstPercent: 18,
  hsnCode: '',
  minOrderQty: 1,
  stockTracking: true,
  status: 'active',
  description: '',
  notes: '',
};
