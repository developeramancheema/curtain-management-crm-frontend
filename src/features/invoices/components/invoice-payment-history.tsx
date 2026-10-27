'use client';

import { Banknote, Building2, Smartphone, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatInr } from '../utils';
import type { InvoicePayment, PaymentMethod } from '../types';

const PAYMENT_ICONS: Record<PaymentMethod, LucideIcon> = {
  upi: Smartphone,
  bank_transfer: Building2,
  cash: Banknote,
};

interface InvoicePaymentHistoryProps {
  payments: InvoicePayment[];
}

function InvoicePaymentHistory({ payments }: InvoicePaymentHistoryProps) {
  return (
    <Card size="sm" className="gap-2 py-2">
      <CardHeader className="pb-0">
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <ol className="space-y-2">
            {payments.map((payment) => {
              const Icon = PAYMENT_ICONS[payment.method];

              return (
                <li
                  key={payment.id}
                  className="flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {payment.timestamp}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs">
                      <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">
                        {payment.methodLabel} · {payment.methodDetail} ·{' '}
                        {payment.recordedBy}
                      </span>
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-success">
                    {formatInr(payment.amount)}
                  </p>
                </li>
              );
            })}
          </ol>
        )}
        <Button
          variant="link"
          className="mt-1 h-auto px-0 text-xs"
          onClick={() =>
            toast.message('Full payment history will be available later')
          }
        >
          View All Payments
        </Button>
      </CardContent>
    </Card>
  );
}

export { InvoicePaymentHistory };
