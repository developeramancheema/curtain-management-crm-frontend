'use client';

import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatInr, shortAssigneeName } from '../utils';
import type { Order, OrderPaymentStatus, OrderPriority } from '../types';

interface OrderCardProps {
  order: Order;
  isSelected: boolean;
  onSelect: () => void;
}

const priorityStyles: Record<OrderPriority, string> = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-success/10 text-success',
};

const paymentStyles: Record<OrderPaymentStatus, string> = {
  advance_paid: 'bg-success/10 text-success',
  balance_due: 'bg-warning/10 text-warning',
  paid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
};

const paymentLabels: Record<OrderPaymentStatus, string> = {
  advance_paid: 'Advance Paid',
  balance_due: 'Balance Due',
  paid: 'Paid',
};

function OrderCard({ order, isSelected, onSelect }: OrderCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full rounded-lg border bg-card p-3 text-left shadow-xs transition-colors',
        isSelected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-primary/40'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-primary">
          {order.orderNumber}
        </span>
        <Badge
          variant="outline"
          className={cn('border-0 capitalize', priorityStyles[order.priority])}
        >
          {order.priority}
        </Badge>
      </div>

      <p className="mt-2 truncate text-sm font-semibold">{order.roomName}</p>
      <p className="truncate text-xs text-muted-foreground">
        {order.customerName}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
          <Calendar className="h-3 w-3 shrink-0" />
          <span className="truncate">Due {order.dueDate}</span>
        </span>
        <span className="shrink-0 font-semibold">{formatInr(order.total)}</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Badge
          variant="outline"
          className={cn('border-0', paymentStyles[order.paymentStatus])}
        >
          {paymentLabels[order.paymentStatus]}
        </Badge>
        <span className="flex min-w-0 items-center gap-1.5">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
              {order.assignee.initials}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-xs text-muted-foreground">
            {shortAssigneeName(order.assignee.name)}
          </span>
        </span>
      </div>
    </button>
  );
}

export { OrderCard, paymentLabels, paymentStyles, priorityStyles };
