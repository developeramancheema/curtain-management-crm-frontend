export type InvoiceStatus = 'paid' | 'partial' | 'overdue' | 'draft';

export type PaymentMethod = 'upi' | 'bank_transfer' | 'cash';

export interface InvoiceLineItem {
  id: string;
  description: string;
  measurement: string;
  rate: number;
  amount: number;
}

export interface InvoicePayment {
  id: string;
  amount: number;
  method: PaymentMethod;
  methodLabel: string;
  methodDetail: string;
  timestamp: string;
  recordedBy: string;
}

export interface ShopProfile {
  name: string;
  tagline: string;
  address: string;
  gstin: string;
  pan: string;
  phone: string;
  email: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerGstin: string;
  placeOfSupply: string;
  invoiceDate: string;
  dueDate: string;
  overdueLabel: string | null;
  overdueDays: number;
  nextFollowUp: string;
  items: InvoiceLineItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxableAmount: number;
  cgstPercent: number;
  cgstAmount: number;
  sgstPercent: number;
  sgstAmount: number;
  roundOff: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  payments: InvoicePayment[];
  notes: string;
}
