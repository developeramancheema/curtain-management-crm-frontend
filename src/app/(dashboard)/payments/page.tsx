'use client';

import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PaymentTable, mockPayments } from '@/features/payments';

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Track and manage payments">
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </PageHeader>

      <PaymentTable payments={mockPayments} />
    </div>
  );
}
