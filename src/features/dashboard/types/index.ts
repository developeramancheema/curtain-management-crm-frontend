export interface DashboardStats {
  todaySales: number;
  salesGrowth: number;
  pendingReceivables: number;
  receivablesCustomers: number;
  todayPayments: number;
  paymentsGrowth: number;
  activeOrders: number;
}

export interface WeeklySalesData {
  date: string;
  amount: number;
}

export interface OrderStatusPipeline {
  estimate: number;
  approved: number;
  stitching: number;
  ready: number;
  installed: number;
  completed: number;
}

export interface RecentEstimate {
  id: string;
  estimateNumber: string;
  customer: string;
  project: string;
  items: number;
  amount: number;
  status: 'draft' | 'sent' | 'viewed' | 'approved';
  createdAt: string;
}

export interface PendingFollowup {
  id: string;
  name: string;
  initials: string;
  invoiceNumber: string;
  dueInfo: string;
  amount: number;
}

export interface TodayTask {
  id: string;
  title: string;
  description: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface CustomerInsightsData {
  newCustomers: number;
  newCustomersGrowth: number;
  repeatCustomers: number;
  repeatCustomersGrowth: number;
  avgOrderValue: number;
  avgOrderValueGrowth: number;
  ordersCompleted: number;
  ordersCompletedGrowth: number;
}

export interface RecentActivity {
  id: string;
  type: 'invoice' | 'estimate' | 'order' | 'payment';
  icon: string;
  message: string;
  time: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

export interface OrdersByStatus {
  status: string;
  count: number;
  fill: string;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
}

export interface Activity {
  id: string;
  type: 'order' | 'payment' | 'quotation' | 'customer';
  title: string;
  description: string;
  time: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export interface PendingPayment {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
}

export interface CustomerInsight {
  id: string;
  name: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}
