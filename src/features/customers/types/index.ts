export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  outstandingBalance: number;
  status: 'active' | 'inactive' | 'new' | 'pending';
  lastEstimate: string | null;
  lastEstimateNumber: string | null;
  lastActivity: string;
  lastActivityType: string;
  notes: string;
  createdAt: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface CustomerStats {
  totalCustomers: number;
  totalCustomersGrowth: number;
  activeProjects: number;
  activeProjectsGrowth: number;
  outstandingBalance: number;
  outstandingBalanceGrowth: number;
  repeatCustomers: number;
  repeatCustomersGrowth: number;
}

export interface CustomerEstimate {
  id: string;
  estimateNumber: string;
  project: string;
  date: string;
  amount: number;
  status: 'sent' | 'viewed' | 'draft' | 'approved';
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  project: string;
  date: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'partial';
}
