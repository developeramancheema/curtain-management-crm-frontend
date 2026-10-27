'use client';

import {
  Bell,
  ChevronRight,
  FileText,
  NotebookPen,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { InvoicePaymentHistory } from './invoice-payment-history';
import { formatInr } from '../utils';
import type { Invoice } from '../types';

interface InvoiceSidebarProps {
  invoice: Invoice;
}

function InvoiceSidebar({ invoice }: InvoiceSidebarProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <Card size="sm" className="gap-2 py-2">
        <CardHeader className="pb-0">
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <SummaryRow label="Total Amount" value={formatInr(invoice.total)} />
          <SummaryRow label="Paid Amount" value={formatInr(invoice.paidAmount)} />
          <div className="rounded-lg bg-primary/5 px-3 py-1.5">
            <p className="text-xs text-muted-foreground">Remaining Balance</p>
            <p
              className={cn(
                'text-lg font-semibold leading-tight',
                invoice.dueAmount > 0 ? 'text-destructive' : 'text-success'
              )}
            >
              {formatInr(invoice.dueAmount)}
            </p>
          </div>
        </CardContent>
      </Card>

      <InvoicePaymentHistory payments={invoice.payments} />

      <Card size="sm" className="gap-2 py-2">
        <CardHeader className="pb-0">
          <CardTitle>Reminder & Follow-up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <SummaryRow label="Due Date" value={invoice.dueDate} />
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Status</span>
            <Badge
              variant="outline"
              className={cn(
                'border-0',
                invoice.overdueDays > 0
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-success/10 text-success'
              )}
            >
              {invoice.overdueDays > 0 ? 'Overdue' : 'On Track'}
            </Badge>
          </div>
          {invoice.overdueDays > 0 && (
            <SummaryRow
              label="Overdue Days"
              value={`${invoice.overdueDays} day${invoice.overdueDays === 1 ? '' : 's'}`}
              danger
            />
          )}
          <SummaryRow label="Next Follow-up" value={invoice.nextFollowUp} />
          <Button
            variant="outline"
            size="sm"
            className="mt-1 h-7 w-full"
            onClick={() =>
              toast.success(`Reminder sent for ${invoice.invoiceNumber}`)
            }
          >
            <Bell className="mr-2 h-4 w-4" />
            Send Reminder Now
          </Button>
        </CardContent>
      </Card>

      <Card size="sm" className="gap-2 py-2">
        <CardHeader className="pb-0">
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <QuickLink
            icon={FileText}
            label="View Invoice Timeline"
            onClick={() => toast.message('Timeline will be available later')}
          />
          <QuickLink
            icon={Truck}
            label="Create Delivery Challan"
            onClick={() =>
              toast.message('Delivery challan will be available later')
            }
          />
          <QuickLink
            icon={NotebookPen}
            label="Add Internal Note"
            onClick={() =>
              toast.message('Internal notes will be available later')
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('font-medium', danger && 'text-destructive')}>
        {value}
      </span>
    </div>
  );
}

function QuickLink({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-sm hover:bg-muted"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

export { InvoiceSidebar };
