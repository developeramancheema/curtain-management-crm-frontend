'use client';

import { parseISO } from 'date-fns';
import { Receipt } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '@/components/feedback';
import { InvoiceActions } from './invoice-actions';
import { InvoiceDatePicker } from './invoice-date-picker';
import { InvoiceDocument } from './invoice-document';
import { InvoiceList } from './invoice-list';
import { InvoiceSidebar } from './invoice-sidebar';
import { INVOICE_TODAY, mockInvoices } from '../mock/invoices.mock';
import type { Invoice } from '../types';

function InvoicesBoard() {
  const [search, setSearch] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(
    mockInvoices[0]?.id ?? null
  );
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const selectedDate = parseISO(INVOICE_TODAY);

  const filteredInvoices = useMemo(() => {
    const query = search.toLowerCase();
    return mockInvoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(query) ||
        invoice.customerName.toLowerCase().includes(query)
    );
  }, [search]);

  const paginatedInvoices = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, page, pageSize]);

  const selectedInvoice =
    mockInvoices.find((invoice) => invoice.id === selectedInvoiceId) ?? null;

  const handleSelect = (invoice: Invoice) => {
    setSelectedInvoiceId(invoice.id);
  };

  return (
    <div className="flex min-w-0 flex-col gap-3 xl:h-full xl:min-h-0">
      <div className="flex shrink-0 justify-end">
        <InvoiceDatePicker selectedDate={selectedDate} />
      </div>

      <div className="grid min-h-0 min-w-0 flex-1 gap-4 overflow-hidden xl:grid-cols-[20rem_minmax(0,1fr)_18rem]">
        <div className="min-h-0 min-w-0">
          <InvoiceList
            invoices={paginatedInvoices}
            selectedInvoiceId={selectedInvoice?.id ?? null}
            search={search}
            page={page}
            pageSize={pageSize}
            totalItems={filteredInvoices.length}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onSelect={handleSelect}
            onPageChange={setPage}
          />
        </div>

        {selectedInvoice ? (
          <>
            <div className="min-h-0 min-w-0 overflow-y-auto">
              <InvoiceDocument invoice={selectedInvoice} />
            </div>
            <aside className="min-h-0 min-w-0">
              <InvoiceSidebar invoice={selectedInvoice} />
            </aside>
          </>
        ) : (
          <div className="min-h-0 min-w-0 rounded-xl border bg-card xl:col-span-2">
            <EmptyState
              icon={Receipt}
              title="Select an invoice"
              description="Choose an invoice from the list to view the tax invoice, payment summary, and follow-up actions."
            />
          </div>
        )}
      </div>

      {selectedInvoice && (
        <div className="shrink-0 border-t bg-background pt-3">
          <InvoiceActions invoiceNumber={selectedInvoice.invoiceNumber} />
        </div>
      )}
    </div>
  );
}

export { InvoicesBoard };
