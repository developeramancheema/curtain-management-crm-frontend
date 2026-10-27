'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { ProductFormFields } from './product-form-fields';
import {
  EMPTY_PRODUCT_FORM,
  productFormSchema,
  type ProductFormData,
} from '../schemas';
import { getSellingRate } from '../utils';
import type { Product } from '../types';
import { toFormValues } from '../services/products.service';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (values: ProductFormData) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ? toFormValues(product) : EMPTY_PRODUCT_FORM,
  });

  const sellingRate = getSellingRate(
    Number(watch('baseRate')) || 0,
    Number(watch('gstPercent')) || 0
  );

  return (
    <form
      className="flex min-h-0 flex-1 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductFormFields
        register={register}
        control={control}
        errors={errors}
        sellingRate={sellingRate}
      />

      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{product ? 'Save Changes' : 'Add Product'}</Button>
      </DialogFooter>
    </form>
  );
}

export { ProductForm };
