'use client';

import type { ReactNode } from 'react';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_STYLES,
  PRODUCT_STATUS_LABELS,
  formatInr,
  getSellingRate,
} from '../utils';
import type { Product } from '../types';

interface ProductTableRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function ProductTableRow({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductTableRowProps) {
  const sellingRate = getSellingRate(product.baseRate, product.gstPercent);

  return (
    <TableRow
      className={cn('cursor-pointer', isSelected && 'bg-primary/5')}
      onClick={onSelect}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <span
            className="h-9 w-9 shrink-0 rounded-md border"
            style={{ backgroundColor: product.thumbnailColor }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.sku}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={cn('border-0', PRODUCT_CATEGORY_STYLES[product.category])}
        >
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </Badge>
      </TableCell>
      <TableCell>{product.unit}</TableCell>
      <TableCell className="text-right">{formatInr(product.baseRate)}</TableCell>
      <TableCell className="text-right">{product.gstPercent}%</TableCell>
      <TableCell className="text-right font-semibold">
        {formatInr(sellingRate)}
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {product.updatedAt}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-0.5">
          <IconAction label={`Edit ${product.name}`} onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </IconAction>
          <IconAction label={`Duplicate ${product.name}`} onClick={onDuplicate}>
            <Copy className="h-4 w-4" />
          </IconAction>
          <IconAction
            label={`Delete ${product.name}`}
            onClick={onDelete}
            destructive
          >
            <Trash2 className="h-4 w-4" />
          </IconAction>
        </div>
      </TableCell>
    </TableRow>
  );
}

function IconAction({
  label,
  onClick,
  destructive,
  children,
}: {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      className={destructive ? 'text-destructive hover:text-destructive' : undefined}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {children}
    </Button>
  );
}

export { ProductTableRow };
