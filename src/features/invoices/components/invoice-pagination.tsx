'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InvoicePaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function getVisiblePages(page: number, totalPages: number, max = 5): number[] {
  if (totalPages <= max) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.min(Math.max(1, page - 2), totalPages - max + 1);
  return Array.from({ length: max }, (_, index) => start + index);
}

function InvoicePagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: InvoicePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);
  const pages = getVisiblePages(page, totalPages);

  return (
    <div className="shrink-0 space-y-2 border-t pt-3">
      <p className="text-center text-xs text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} invoices
      </p>
      <div className="flex items-center justify-center gap-1">
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            type="button"
            variant={pageNumber === page ? 'default' : 'outline'}
            size="icon-sm"
            className={cn(pageNumber === page && 'pointer-events-none')}
            aria-current={pageNumber === page ? 'page' : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Next page"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export { InvoicePagination };
