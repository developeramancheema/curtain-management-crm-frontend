'use client';

import { format } from 'date-fns';
import { MoreHorizontal, Receipt, RefreshCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Payment } from '../types';

const statusVariants = {
  completed: 'success',
  pending: 'warning',
  failed: 'destructive',
  refunded: 'secondary',
} as const;

const statusLabels = {
  completed: 'Completed',
  pending: 'Pending',
  failed: 'Failed',
  refunded: 'Refunded',
};

const methodLabels = {
  cash: 'Cash',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
  check: 'Check',
  other: 'Other',
};

interface PaymentListCardsProps {
  payments: Payment[];
}

function PaymentListCards({ payments }: PaymentListCardsProps) {
  if (payments.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No payments found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {payments.map((payment) => (
        <ListCard key={payment.id}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium">{payment.paymentNumber}</p>
              <p className="text-sm">{payment.customerName}</p>
              <p className="text-xs text-muted-foreground">
                {payment.invoiceNumber} · {methodLabels[payment.method]}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant={statusVariants[payment.status]}>
                {statusLabels[payment.status]}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Receipt className="mr-2 h-4 w-4" />
                    View Invoice
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refund Payment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {format(new Date(payment.paymentDate), 'd MMM yyyy')}
            </span>
            <span className="font-semibold">
              ₹ {payment.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </ListCard>
      ))}
    </div>
  );
}

export { PaymentListCards };
