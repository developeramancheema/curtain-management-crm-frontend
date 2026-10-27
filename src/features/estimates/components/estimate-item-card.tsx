'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  formatInrWithSymbol,
  getItemAmount,
  getItemToneClass,
  getItemVisual,
} from '../utils';
import type { EstimateItem } from '../types';

interface EstimateItemCardProps {
  item: EstimateItem;
  onRemove: () => void;
}

function EstimateItemCard({ item, onRemove }: EstimateItemCardProps) {
  const visual = getItemVisual(item.description);
  const Icon = visual.icon;
  const amount = getItemAmount(item);

  return (
    <div className="flex items-center gap-3 py-2">
      <span
        aria-hidden="true"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          getItemToneClass(visual.tone)
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {item.description || 'Untitled item'}
        </p>
        <p className="text-xs text-muted-foreground">
          {item.quantity} {item.unit} x {formatInrWithSymbol(item.rate, false)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold whitespace-nowrap">
          {formatInrWithSymbol(amount, false)}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label={`Remove ${item.description || 'item'}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export { EstimateItemCard };
