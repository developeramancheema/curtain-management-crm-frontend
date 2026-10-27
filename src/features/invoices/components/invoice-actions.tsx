'use client';

import {
  Bell,
  Download,
  MessageCircle,
  Printer,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface InvoiceActionsProps {
  invoiceNumber: string;
}

function InvoiceActions({ invoiceNumber }: InvoiceActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
      <Button
        size="lg"
        className="col-span-2 h-9 px-4 sm:col-auto"
        onClick={() => toast.success(`Payment recorded for ${invoiceNumber}`)}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Record Payment
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-9 px-3 sm:px-4"
        onClick={() => toast.message(`Printing ${invoiceNumber}`)}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print Invoice
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-9 px-3 sm:px-4"
        onClick={() => toast.success(`${invoiceNumber} PDF downloaded`)}
      >
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-9 px-3 sm:px-4"
        onClick={() => toast.success(`${invoiceNumber} shared on WhatsApp`)}
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        Share on WhatsApp
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="h-9 px-3 sm:px-4"
        onClick={() => toast.success(`Reminder sent for ${invoiceNumber}`)}
      >
        <Bell className="mr-2 h-4 w-4" />
        Send Reminder
      </Button>
    </div>
  );
}

export { InvoiceActions };
