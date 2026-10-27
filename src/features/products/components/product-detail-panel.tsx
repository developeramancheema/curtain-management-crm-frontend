'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Pencil, Plus, Trash2, TrendingUp, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  PRODUCT_CATEGORY_LABELS,
  PRODUCT_CATEGORY_STYLES,
  PRODUCT_STATUS_LABELS,
  formatInr,
  getSellingRate,
} from '../utils';
import type { Product } from '../types';

interface ProductDetailPanelProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
  onDeactivate: () => void;
}

function ProductDetailPanel({
  product,
  onClose,
  onEdit,
  onDeactivate,
}: ProductDetailPanelProps) {
  const sellingRate = getSellingRate(product.baseRate, product.gstPercent);

  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className="h-12 w-12 shrink-0 rounded-md border"
            style={{ backgroundColor: product.thumbnailColor }}
            aria-hidden
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold">{product.name}</h3>
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
            <p className="mt-1 text-xs text-muted-foreground">{product.sku}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close product details"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2.5 text-sm">
          <InfoRow
            label="Category"
            value={
              <Badge
                variant="outline"
                className={cn(
                  'border-0',
                  PRODUCT_CATEGORY_STYLES[product.category]
                )}
              >
                {PRODUCT_CATEGORY_LABELS[product.category]}
              </Badge>
            }
          />
          <InfoRow label="Unit" value={product.unit} />
          <InfoRow label="Base Rate (₹)" value={formatInr(product.baseRate)} />
          <InfoRow label="GST" value={`${product.gstPercent}%`} />
          <InfoRow
            label="Selling Rate (₹)"
            value={<span className="font-semibold">{formatInr(sellingRate)}</span>}
          />
          <InfoRow label="SKU/Code" value={product.sku} />
          <InfoRow label="HSN Code" value={product.hsnCode} />
          <InfoRow
            label="Min. Order Qty"
            value={`${product.minOrderQty} ${product.unit}`}
          />
          <InfoRow
            label="Stock Tracking"
            value={product.stockTracking ? 'Enabled' : 'Disabled'}
          />
          <InfoRow label="Created On" value={product.createdAt} />
          <InfoRow label="Updated On" value={product.updatedAt} />
        </div>

        <Separator />

        <section>
          <h4 className="mb-1.5 text-sm font-semibold">Product Description</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </section>

        <section>
          <h4 className="mb-1.5 text-sm font-semibold">Notes</h4>
          <p className="text-sm text-muted-foreground">{product.notes}</p>
        </section>

        <div className="rounded-lg border border-success/20 bg-success/5 p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium">
              Used in {product.usedInEstimatesThisMonth} estimates this month
            </p>
            <TrendingUp className="h-4 w-4 shrink-0 text-success" />
          </div>
          <p className="mt-1 text-xs text-success">
            ↑ {product.usedInEstimatesGrowth}% vs last month
          </p>
        </div>

        <div className="space-y-2">
          <Button className="w-full" onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
          <Button
            variant="outline"
            className="w-full"
            render={<Link href="/quotations/new" />}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Estimate Item
          </Button>
          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              onDeactivate();
              toast.success(`${product.name} deactivated`);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Deactivate Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export { ProductDetailPanel };
