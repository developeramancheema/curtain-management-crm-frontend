import { InvoicesBoard } from '@/features/invoices';

export const metadata = {
  title: 'Invoices & Payments',
  description: 'View tax invoices, record payments, and follow up on balances',
};

export default function InvoicesPage() {
  return (
    <div className="h-full min-h-0">
      <InvoicesBoard />
    </div>
  );
}
