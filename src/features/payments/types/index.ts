export interface Payment {
  id: string;
  paymentNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: 'cash' | 'card' | 'bank_transfer' | 'check' | 'other';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  reference: string;
  notes: string;
  paymentDate: string;
  createdAt: string;
}
