'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductForm } from './product-form';
import type { ProductFormData } from '../schemas';
import type { Product } from '../types';

interface ProductFormDialogProps {
  open: boolean;
  product?: Product | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormData) => void;
}

function ProductFormDialog({
  open,
  product,
  onOpenChange,
  onSubmit,
}: ProductFormDialogProps) {
  const isEdit = Boolean(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update rates, GST, and product details. Selling rate is calculated automatically.'
              : 'Add a fabric, hardware item, service, or accessory. Selling rate is calculated automatically.'}
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          key={product?.id ?? 'new-product'}
          product={product}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export { ProductFormDialog };
