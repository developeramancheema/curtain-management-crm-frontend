'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ESTIMATE_UNITS } from '../mock/estimates.mock';
import { formatInr, getItemAmount, parseNumber } from '../utils';
import type { EstimateItem, EstimateUnit } from '../types';

/** Keeps table inputs looking like plain text until the user interacts. */
const inlineInput =
  'h-8 border-transparent bg-transparent px-2 shadow-none hover:border-input focus-visible:border-ring';

interface EstimateItemRowProps {
  item: EstimateItem;
  onChange: (patch: Partial<Omit<EstimateItem, 'id'>>) => void;
  onRemove: () => void;
}

function EstimateItemRow({ item, onChange, onRemove }: EstimateItemRowProps) {
  const amount = getItemAmount(item);

  return (
    <TableRow className="group">
      <TableCell className="min-w-[180px]">
        <Input
          aria-label="Item description"
          value={item.description}
          placeholder="Item description"
          onChange={(event) => onChange({ description: event.target.value })}
          className={cn(inlineInput, 'font-medium')}
        />
      </TableCell>

      <TableCell className="min-w-[170px]">
        <div className="flex items-center gap-1">
          <Input
            aria-label="Quantity"
            type="number"
            inputMode="decimal"
            step="0.1"
            min={0}
            value={item.quantity || ''}
            onChange={(event) =>
              onChange({ quantity: parseNumber(event.target.value) })
            }
            className={cn(inlineInput, 'w-16 text-right')}
          />
          <Input
            aria-label="Measurement breakdown"
            value={item.measurementNote}
            placeholder="8 × 3.5"
            onChange={(event) =>
              onChange({ measurementNote: event.target.value })
            }
            className={cn(inlineInput, 'flex-1 text-xs text-muted-foreground')}
          />
        </div>
      </TableCell>

      <TableCell className="w-[96px]">
        <Select
          value={item.unit}
          onValueChange={(value) => {
            if (value) onChange({ unit: value as EstimateUnit });
          }}
        >
          <SelectTrigger
            aria-label="Unit"
            className="h-8 border-transparent bg-transparent px-2 shadow-none hover:border-input"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ESTIMATE_UNITS.map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell className="w-[110px]">
        <Input
          aria-label="Rate"
          type="number"
          inputMode="decimal"
          step="0.01"
          min={0}
          value={item.rate || ''}
          onChange={(event) => onChange({ rate: parseNumber(event.target.value) })}
          className={cn(inlineInput, 'text-right')}
        />
      </TableCell>

      <TableCell className="w-[120px] text-sm whitespace-nowrap text-muted-foreground">
        {item.quantity > 0 && item.rate > 0
          ? `${item.quantity} × ${item.rate}`
          : '—'}
      </TableCell>

      <TableCell className="w-[120px] text-right text-sm font-medium whitespace-nowrap">
        {formatInr(amount)}
      </TableCell>

      <TableCell className="w-[44px]">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label={`Remove ${item.description || 'item'}`}
          className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export { EstimateItemRow };
