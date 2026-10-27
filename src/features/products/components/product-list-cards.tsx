'use client';

import { Copy, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/common';
import { cn } from '@/lib/utils';
import {
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_STYLES,
  PRODUCT_STATUS_LABELS,
  formatInr,
  getSellingRate,
} from '../utils';
import type { Product } from '../types';

interface ProductListCardsProps {
  products: Product[];
  selectedProductId: string | null;
  onSelect: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductListCards({
  products,
  selectedProductId,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductListCardsProps) {
  if (products.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No products found.
      </p>
    );
  }

  return (
    <div className="space-y-2 p-3">
      {products.map((product) => (
        <ListCard
          key={product.id}
          selected={selectedProductId === product.id}
          onClick={() => onSelect(product)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="h-9 w-9 shrink-0 rounded-md border"
                style={{ backgroundColor: product.thumbnailColor }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sku}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                'border-0',
                product.status === 'active'
                  ? 'bg-success/10 text-success'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {PRODUCT_STATUS_LABELS[product.status]}
            </Badge>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2 text-sm">
            <Badge
              variant="outline"
              className={cn('border-0', PRODUCT_CATEGORY_STYLES[product.category])}
            >
              {PRODUCT_CATEGORY_LABELS[product.category]}
            </Badge>
            <span className="font-semibold">
              {formatInr(getSellingRate(product.baseRate, product.gstPercent))}
            </span>
          </div>
          <div className="mt-2 flex justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit ${product.name}`}
              onClick={(event) => {
                event.stopPropagation();
                onEdit(product);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Duplicate ${product.name}`}
              onClick={(event) => {
                event.stopPropagation();
                onDuplicate(product);
              }}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete ${product.name}`}
              className="text-destructive hover:text-destructive"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(product);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </ListCard>
      ))}
    </div>
  );
}

export { ProductListCards };
