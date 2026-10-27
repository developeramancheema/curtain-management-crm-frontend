'use client';

import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PendingPayment } from '../types';

interface PendingPaymentsProps {
  payments: PendingPayment[];
}

function PendingPayments({ payments }: PendingPaymentsProps) {
  const totalOverdue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pending Payments</CardTitle>
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          ${totalOverdue.toLocaleString()} overdue
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{payment.customer}</p>
                <p className="text-xs text-muted-foreground">
                  {payment.invoiceNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  ${payment.amount.toLocaleString()}
                </p>
                <p
                  className={cn(
                    'text-xs',
                    payment.daysOverdue > 7
                      ? 'text-destructive'
                      : 'text-warning'
                  )}
                >
                  {payment.daysOverdue} days overdue
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { PendingPayments };
