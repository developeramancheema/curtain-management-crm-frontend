export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  customerName: string;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected' | 'expired';
  validUntil: string;
  notes: string;
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
