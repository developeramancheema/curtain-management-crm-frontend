'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { FileText, Pencil, Receipt, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Order } from '../types';

interface OrderDetailActionsProps {
  order: Order;
  onMarkStitching: () => void;
}

function OrderDetailActions({
  order,
  onMarkStitching,
}: OrderDetailActionsProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" render={<Link href="/quotations" />}>
          <FileText className="mr-1.5 h-4 w-4" />
          View Estimate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success(`Invoice created for ${order.orderNumber}`)
          }
        >
          <Receipt className="mr-1.5 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {order.stage === 'approved' && (
        <Button
          variant="outline"
          className="w-full border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:text-violet-800"
          onClick={onMarkStitching}
        >
          <Scissors className="mr-2 h-4 w-4" />
          Mark as Stitching
        </Button>
      )}

      <Button
        className="w-full"
        onClick={() =>
          toast.message('Edit order will be available in a later phase')
        }
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit Order
      </Button>
    </div>
  );
}

export { OrderDetailActions };
