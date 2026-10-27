'use client';

import { ChevronDown, Copy, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { EstimateItemCard } from './estimate-item-card';
import { EstimateItemRow } from './estimate-item-row';
import { MOCK_RATE_CARD } from '../mock/estimates.mock';
import {
  describeRoomMeasurements,
  formatInrWithSymbol,
  getRoomSubtotal,
} from '../utils';
import type { EstimateItem, EstimateRoom } from '../types';

interface EstimateRoomItemsProps {
  room: EstimateRoom;
  index: number;
  isExpanded: boolean;
  canRemove: boolean;
  onToggle: () => void;
  onDuplicate: () => void;
  onRemove: () => void;
  onAddItem: (preset?: Partial<Omit<EstimateItem, 'id'>>) => void;
  onItemChange: (
    itemId: string,
    patch: Partial<Omit<EstimateItem, 'id'>>
  ) => void;
  onItemRemove: (itemId: string) => void;
}

function EstimateRoomItems({
  room,
  index,
  isExpanded,
  canRemove,
  onToggle,
  onDuplicate,
  onRemove,
  onAddItem,
  onItemChange,
  onItemRemove,
}: EstimateRoomItemsProps) {
  const subtotal = getRoomSubtotal(room);
  const bodyId = `room-items-body-${room.id}`;

  return (
    <Card className="overflow-hidden py-0">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {index + 1}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          className="flex min-w-0 flex-1 items-center gap-2 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">
              {room.name || 'Untitled Room'}
            </span>
            <span className="hidden truncate text-xs text-muted-foreground lg:block">
              {describeRoomMeasurements(room)}
            </span>
          </span>
          <span className="text-sm font-semibold whitespace-nowrap">
            {formatInrWithSymbol(subtotal, false)}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
              !isExpanded && '-rotate-90'
            )}
          />
        </button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDuplicate}
          aria-label={`Duplicate ${room.name}`}
          className="hidden text-muted-foreground md:inline-flex"
        >
          <Copy className="h-4 w-4" />
        </Button>

        {canRemove && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onRemove}
            aria-label={`Remove ${room.name}`}
            className="hidden text-muted-foreground hover:text-destructive md:inline-flex"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div id={bodyId} className="border-t">
          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Item Description</TableHead>
                  <TableHead>Measurement / Qty</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Rate (₹)</TableHead>
                  <TableHead>Calculation</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {room.items.map((item) => (
                  <EstimateItemRow
                    key={item.id}
                    item={item}
                    onChange={(patch) => onItemChange(item.id, patch)}
                    onRemove={() => onItemRemove(item.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="divide-y px-3 md:hidden">
            {room.items.map((item) => (
              <EstimateItemCard
                key={item.id}
                item={item}
                onRemove={() => onItemRemove(item.id)}
              />
            ))}
          </div>

          {room.items.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No items in this room yet.
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-3">
            <AddItemMenu onAddItem={onAddItem} />

            <div className="hidden items-center gap-3 md:flex">
              <span className="text-xs text-muted-foreground">
                Room Subtotal
              </span>
              <span className="text-sm font-semibold">
                {formatInrWithSymbol(subtotal)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

interface AddItemMenuProps {
  onAddItem: (preset?: Partial<Omit<EstimateItem, 'id'>>) => void;
}

function AddItemMenu({ onAddItem }: AddItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-full border-dashed border-primary/40 text-primary md:w-auto"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Item
          </Button>
        }
      />
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>From rate card</DropdownMenuLabel>
        {MOCK_RATE_CARD.map((preset) => (
          <DropdownMenuItem
            key={preset.description}
            onClick={() =>
              onAddItem({
                description: preset.description,
                unit: preset.unit,
                rate: preset.rate,
              })
            }
          >
            <span className="flex-1">{preset.description}</span>
            <span className="text-xs text-muted-foreground">
              ₹{preset.rate}/{preset.unit}
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onAddItem()}>
          Blank item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { EstimateRoomItems };
