'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderCard } from './order-card';
import { formatInr } from '../utils';
import type { Order, OrderStageColumn } from '../types';

interface OrderKanbanColumnProps {
  column: OrderStageColumn;
  orders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (order: Order) => void;
}

function OrderKanbanColumn({
  column,
  orders,
  selectedOrderId,
  onSelectOrder,
}: OrderKanbanColumnProps) {
  const total = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <section className="flex min-w-0 flex-col gap-3">
      <header className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm leading-snug font-semibold">{column.label}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatInr(total)}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
            {orders.length}
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-2.5">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isSelected={selectedOrderId === order.id}
            onSelect={() => onSelectOrder(order)}
          />
        ))}

        <Button
          variant="ghost"
          size="sm"
          className="h-8 justify-center bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
          render={<Link href="/quotations/new" />}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add Order
        </Button>
      </div>
    </section>
  );
}

export { OrderKanbanColumn };
