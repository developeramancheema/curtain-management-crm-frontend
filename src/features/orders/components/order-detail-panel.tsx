'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Calendar, Phone, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { buildItemSummary, formatDueWithWeekday, formatInr } from '../utils';
import { paymentLabels, priorityStyles } from './order-card';
import { OrderDetailActions } from './order-detail-actions';
import { OrderTimeline } from './order-timeline';
import { ORDER_STAGES } from '../mock/orders.mock';
import type { Order } from '../types';

interface OrderDetailPanelProps {
  order: Order;
  onClose: () => void;
  onMarkStitching: () => void;
}

function OrderDetailPanel({
  order,
  onClose,
  onMarkStitching,
}: OrderDetailPanelProps) {
  const stageLabel =
    ORDER_STAGES.find((stage) => stage.id === order.stage)?.label ?? order.stage;
  const itemsTotal = order.items.reduce((sum, item) => sum + item.amount, 0);
  const advancePercent =
    order.total > 0 ? Math.round((order.advancePaid / order.total) * 100) : 0;

  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
            <Badge
              variant="outline"
              className={cn('border-0 capitalize', priorityStyles[order.priority])}
            >
              {order.priority}
            </Badge>
          </div>
          <Badge className="mt-2 border-0 bg-primary/10 text-primary hover:bg-primary/10">
            {stageLabel}
          </Badge>
          <p className="mt-2 text-base font-semibold">{order.roomName}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close order details"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <InfoRow
            label="Customer"
            value={
              <span className="inline-flex items-center gap-2">
                {order.customerName}
                <a
                  href={`tel:${order.customerPhone}`}
                  className="text-primary"
                  aria-label={`Call ${order.customerName}`}
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
              </span>
            }
          />
          <InfoRow
            label="Due Date"
            value={
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {formatDueWithWeekday(order.dueDate)}
              </span>
            }
          />
          <InfoRow
            label="Assigned Tailor"
            value={
              <span className="inline-flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                    {order.assignee.initials}
                  </AvatarFallback>
                </Avatar>
                {order.assignee.name}
              </span>
            }
          />
        </div>

        <Separator />

        <div className="space-y-2.5 text-sm">
          <InfoRow
            label="Amount"
            value={<span className="font-semibold">{formatInr(order.total)}</span>}
          />
          <InfoRow
            label="Payment Status"
            value={
              <span className="font-medium text-success">
                {paymentLabels[order.paymentStatus]}
              </span>
            }
          />
          <InfoRow
            label="Advance Paid"
            value={`${formatInr(order.advancePaid)} (${advancePercent}%)`}
          />
          <InfoRow
            label="Balance Due"
            value={
              <span
                className={
                  order.balanceDue > 0 ? 'font-medium text-destructive' : undefined
                }
              >
                {formatInr(order.balanceDue)}
              </span>
            }
          />
        </div>

        <Separator />

        <div>
          <div className="mb-1 flex items-center justify-between">
            <h4 className="text-sm font-semibold">Order Summary</h4>
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0"
              render={<Link href="/quotations" />}
            >
              View Estimate
            </Button>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            {buildItemSummary(order.items)}
          </p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium">{item.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.measurement ?? `${item.quantity} ${item.unit}`}
                  </p>
                </div>
                <span className="shrink-0 font-medium">
                  {formatInr(item.amount, false)}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 text-sm font-semibold">
              <span>Total Amount</span>
              <span>{formatInr(itemsTotal)}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="mb-3 text-sm font-semibold">Status Timeline</h4>
          <OrderTimeline events={order.timeline} />
        </div>

        <Separator />

        <OrderDetailActions
          order={order}
          onMarkStitching={onMarkStitching}
        />
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

export { OrderDetailPanel };
