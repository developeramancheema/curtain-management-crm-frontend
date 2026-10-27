import type {
  DashboardStats,
  WeeklySalesData,
  OrderStatusPipeline,
  RecentEstimate,
  PendingFollowup,
  TodayTask,
  CustomerInsightsData,
  RecentActivity,
} from '../types';

export const mockDashboardStats: DashboardStats = {
  todaySales: 38760,
  salesGrowth: 18,
  pendingReceivables: 124890,
  receivablesCustomers: 12,
  todayPayments: 29350,
  paymentsGrowth: 24,
  activeOrders: 17,
};

export const mockWeeklySales: WeeklySalesData[] = [
  { date: '10 May', amount: 15000 },
  { date: '11 May', amount: 22000 },
  { date: '12 May', amount: 18000 },
  { date: '13 May', amount: 28000 },
  { date: '14 May', amount: 32000 },
  { date: '15 May', amount: 35000 },
  { date: '16 May', amount: 38760 },
];

export const mockOrderStatusPipeline: OrderStatusPipeline = {
  estimate: 12,
  approved: 8,
  stitching: 5,
  ready: 3,
  installed: 6,
  completed: 24,
};

export const mockRecentEstimates: RecentEstimate[] = [
  {
    id: '1',
    estimateNumber: 'EST-1029',
    customer: 'Dadaji Room',
    project: 'Dadaji Room',
    items: 5,
    amount: 34890,
    status: 'sent',
    createdAt: '2025-05-16',
  },
  {
    id: '2',
    estimateNumber: 'EST-1028',
    customer: 'D.Room',
    project: 'D.Room',
    items: 4,
    amount: 24225,
    status: 'sent',
    createdAt: '2025-05-16',
  },
  {
    id: '3',
    estimateNumber: 'EST-1027',
    customer: 'Bed Room Chacha Ji',
    project: 'Bed Room Chacha Ji',
    items: 4,
    amount: 27890,
    status: 'viewed',
    createdAt: '2025-05-15',
  },
  {
    id: '4',
    estimateNumber: 'EST-1026',
    customer: 'Mander',
    project: 'Mander',
    items: 3,
    amount: 17338,
    status: 'draft',
    createdAt: '2025-05-15',
  },
  {
    id: '5',
    estimateNumber: 'EST-1025',
    customer: 'Living Room - Mr. Soni',
    project: 'Living Room - Mr. Soni',
    items: 6,
    amount: 46215,
    status: 'approved',
    createdAt: '2025-05-14',
  },
];

export const mockPendingFollowups: PendingFollowup[] = [
  {
    id: '1',
    name: 'Ramesh Gupta',
    initials: 'RG',
    invoiceNumber: 'INV-2248',
    dueInfo: 'Due 8 days ago',
    amount: 24850,
  },
  {
    id: '2',
    name: 'Pooja Sharma',
    initials: 'PS',
    invoiceNumber: 'INV-2251',
    dueInfo: 'Due 6 days ago',
    amount: 18600,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    initials: 'AK',
    invoiceNumber: 'INV-2243',
    dueInfo: 'Due 5 days ago',
    amount: 16750,
  },
  {
    id: '4',
    name: 'Sunita Singh',
    initials: 'SS',
    invoiceNumber: 'INV-2255',
    dueInfo: 'Due 3 days ago',
    amount: 14500,
  },
];

export const mockTodayTasks: TodayTask[] = [
  {
    id: '1',
    title: 'Measurement Visit',
    description: 'D.Room - L-122.5, CH-72',
    time: '10:30 AM',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Stitching Update',
    description: 'Dadaji Room - Stitching',
    time: '12:00 PM',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Installation',
    description: 'Bed Room Chacha Ji',
    time: '03:00 PM',
    priority: 'high',
    completed: false,
  },
  {
    id: '4',
    title: 'Follow-up Call',
    description: 'Pooja Sharma - Payment',
    time: '05:30 PM',
    priority: 'low',
    completed: false,
  },
];

export const mockCustomerInsightsData: CustomerInsightsData = {
  newCustomers: 8,
  newCustomersGrowth: 14,
  repeatCustomers: 15,
  repeatCustomersGrowth: 25,
  avgOrderValue: 22850,
  avgOrderValueGrowth: 12,
  ordersCompleted: 31,
  ordersCompletedGrowth: 19,
};

export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'invoice',
    icon: '📄',
    message: 'Invoice INV-2257 for ₹ 28,700.00 has been paid by Rajesh Verma.',
    time: '11:45 AM',
  },
  {
    id: '2',
    type: 'estimate',
    icon: '📋',
    message: 'Estimate EST-1028 (D.Room) viewed by Pooja Sharma.',
    time: '10:20 AM',
  },
  {
    id: '3',
    type: 'order',
    icon: '📦',
    message: 'Order ORD-1014 moved to Stitching by Tailor - Ramesh.',
    time: '09:15 AM',
  },
  {
    id: '4',
    type: 'payment',
    icon: '💰',
    message: 'Payment reminder sent to Amit Kumar for ₹ 16,750.00',
    time: 'Yesterday, 06:30 PM',
  },
  {
    id: '5',
    type: 'order',
    icon: '✅',
    message: 'Order ORD-1008 marked as Completed.',
    time: 'Yesterday, 04:10 PM',
  },
];
