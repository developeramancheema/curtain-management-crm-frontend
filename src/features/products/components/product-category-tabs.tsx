'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORY_LABELS } from '../utils';
import type { ProductCategory, ProductStats } from '../types';

interface ProductCategoryTabsProps {
  value: 'all' | ProductCategory;
  stats: ProductStats;
  onChange: (value: 'all' | ProductCategory) => void;
}

function ProductCategoryTabs({
  value,
  stats,
  onChange,
}: ProductCategoryTabsProps) {
  const tabs: { id: 'all' | ProductCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    {
      id: 'curtain_fabrics',
      label: `${PRODUCT_CATEGORY_LABELS.curtain_fabrics} (${stats.fabricItems})`,
    },
    {
      id: 'hardware',
      label: `${PRODUCT_CATEGORY_LABELS.hardware} (${stats.hardwareItems})`,
    },
    {
      id: 'services',
      label: `${PRODUCT_CATEGORY_LABELS.services} (${stats.services})`,
    },
    {
      id: 'accessories',
      label: `${PRODUCT_CATEGORY_LABELS.accessories} (${stats.accessories})`,
    },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="outline"
          size="sm"
          className={cn(
            'h-8 shrink-0 rounded-full',
            value === tab.id &&
              'border-primary bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
}

export { ProductCategoryTabs };
