'use client';

import { format, isSameDay, parseISO } from 'date-fns';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INVOICE_TODAY } from '../mock/invoices.mock';

interface InvoiceDatePickerProps {
  selectedDate: Date;
}

function InvoiceDatePicker({ selectedDate }: InvoiceDatePickerProps) {
  const today = parseISO(INVOICE_TODAY);
  const label = isSameDay(selectedDate, today)
    ? `Today, ${format(selectedDate, 'dd MMM yyyy')}`
    : format(selectedDate, 'EEE, dd MMM yyyy');

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-9 gap-2 px-3"
      aria-label="Select invoice date"
    >
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <span className="font-medium">{label}</span>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}

export { InvoiceDatePicker };
