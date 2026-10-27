import type { InvoiceStatus } from '../types';

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: 'Paid',
  partial: 'Partially Paid',
  overdue: 'Overdue',
  draft: 'Draft',
};

export const INVOICE_STATUS_STYLES: Record<InvoiceStatus, string> = {
  paid: 'bg-success/10 text-success',
  partial: 'bg-warning/10 text-warning',
  overdue: 'bg-destructive/10 text-destructive',
  draft: 'bg-muted text-muted-foreground',
};

export function formatInr(value: number): string {
  return `₹ ${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
