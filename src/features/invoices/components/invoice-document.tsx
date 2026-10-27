'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { shopProfile } from '../mock/invoices.mock';
import {
  INVOICE_STATUS_LABELS,
  INVOICE_STATUS_STYLES,
  formatInr,
} from '../utils';
import type { Invoice } from '../types';

interface InvoiceDocumentProps {
  invoice: Invoice;
}

function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-5 pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{shopProfile.name}</p>
            <p className="text-sm text-muted-foreground">{shopProfile.tagline}</p>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">
              {shopProfile.address}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              GSTIN {shopProfile.gstin} • PAN {shopProfile.pan}
            </p>
            <p className="text-xs text-muted-foreground">
              {shopProfile.phone} • {shopProfile.email}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              TAX INVOICE
            </p>
            <p className="text-xl font-semibold">{invoice.invoiceNumber}</p>
            <Badge
              variant="outline"
              className={cn('mt-2 border-0', INVOICE_STATUS_STYLES[invoice.status])}
            >
              {INVOICE_STATUS_LABELS[invoice.status]}
            </Badge>
            <div className="mt-3 space-y-1 text-sm">
              <p>Invoice Date: {invoice.invoiceDate}</p>
              <p>Due Date: {invoice.dueDate}</p>
              {invoice.overdueLabel && (
                <p className="font-medium text-destructive">{invoice.overdueLabel}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              BILL TO
            </p>
            <p className="mt-1 font-medium">{invoice.customerName}</p>
            <p className="text-sm text-muted-foreground">{invoice.customerAddress}</p>
            <p className="text-sm text-muted-foreground">{invoice.customerPhone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              PLACE OF SUPPLY
            </p>
            <p className="mt-1 font-medium">{invoice.placeOfSupply}</p>
            <p className="text-sm text-muted-foreground">
              GSTIN/UIN {invoice.customerGstin || 'Unregistered'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10">#</TableHead>
                <TableHead>Item Description</TableHead>
                <TableHead>Qty / Measurement</TableHead>
                <TableHead className="text-right">Rate (₹)</TableHead>
                <TableHead className="text-right">Amount (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>{item.measurement}</TableCell>
                  <TableCell className="text-right">{formatInr(item.rate)}</TableCell>
                  <TableCell className="text-right">{formatInr(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="ml-auto w-full max-w-sm space-y-1.5 text-sm">
          <TotalRow label="Subtotal" value={formatInr(invoice.subtotal)} />
          <TotalRow
            label={`Discount (${invoice.discountPercent.toFixed(2)}%)`}
            value={`- ${formatInr(invoice.discountAmount)}`}
          />
          <TotalRow label="Taxable Amount" value={formatInr(invoice.taxableAmount)} />
          <TotalRow
            label={`CGST (${invoice.cgstPercent}%)`}
            value={formatInr(invoice.cgstAmount)}
          />
          <TotalRow
            label={`SGST (${invoice.sgstPercent}%)`}
            value={formatInr(invoice.sgstAmount)}
          />
          <TotalRow label="Round Off" value={formatInr(invoice.roundOff)} />
          <Separator />
          <TotalRow label="Total Amount" value={formatInr(invoice.total)} strong />
          <TotalRow label="Advance Paid" value={formatInr(invoice.paidAmount)} />
          <TotalRow
            label="Balance Due"
            value={formatInr(invoice.dueAmount)}
            strong
            danger={invoice.dueAmount > 0}
          />
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground">
            NOTES
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{invoice.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TotalRow({
  label,
  value,
  strong,
  danger,
}: {
  label: string;
  value: string;
  strong?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          strong && 'font-semibold',
          danger && 'text-destructive'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export { InvoiceDocument };
