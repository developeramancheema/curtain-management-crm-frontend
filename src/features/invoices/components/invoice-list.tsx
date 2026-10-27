'use client';

import { Filter, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InvoicePagination } from './invoice-pagination';
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_STYLES, formatInr } from '../utils';
import type { Invoice } from '../types';

interface InvoiceListProps {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  search: string;
  page: number;
  pageSize: number;
  totalItems: number;
  onSearchChange: (value: string) => void;
  onSelect: (invoice: Invoice) => void;
  onPageChange: (page: number) => void;
}

function InvoiceList({
  invoices,
  selectedInvoiceId,
  search,
  page,
  pageSize,
  totalItems,
  onSearchChange,
  onSelect,
  onPageChange,
}: InvoiceListProps) {
  return (
    <Card className="flex h-full min-w-0 flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <h2 className="text-base font-semibold">All Invoices</h2>
        <Button
          size="sm"
          onClick={() =>
            toast.message('New invoice will be available in a later phase')
          }
        >
          <Plus className="mr-1 h-4 w-4" />
          New Invoice
        </Button>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search invoices..."
            className="h-9 pr-9 pl-9"
          />
          <Filter className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {invoices.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No invoices found.
            </p>
          ) : (
            invoices.map((invoice) => (
              <button
                key={invoice.id}
                type="button"
                onClick={() => onSelect(invoice)}
                className={cn(
                  'w-full rounded-lg border p-3 text-left transition-colors',
                  selectedInvoiceId === invoice.id
                    ? 'border-primary border-l-[3px] bg-primary/5'
                    : 'border-border hover:border-primary/40'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-primary">
                    {invoice.invoiceNumber}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      'border-0',
                      INVOICE_STATUS_STYLES[invoice.status]
                    )}
                  >
                    {INVOICE_STATUS_LABELS[invoice.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-sm">{invoice.customerName}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {invoice.invoiceDate}
                </p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total {formatInr(invoice.total)}
                  </span>
                  <span className="font-semibold">
                    {formatInr(invoice.dueAmount)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        <InvoicePagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
}

export { InvoiceList };
