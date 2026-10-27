export type OrderStage =
  | 'approved'
  | 'stitching'
  | 'ready'
  | 'installation'
  | 'completed';

export type OrderPriority = 'high' | 'medium' | 'low';

export type OrderPaymentStatus = 'advance_paid' | 'balance_due' | 'paid';

export interface OrderAssignee {
  id: string;
  name: string;
  initials: string;
  role: 'tailor' | 'installer';
}

export interface OrderLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  amount: number;
  measurement?: string;
}

export interface OrderTimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  actor: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  roomName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  dueDate: string;
  total: number;
  advancePaid: number;
  balanceDue: number;
  priority: OrderPriority;
  stage: OrderStage;
  paymentStatus: OrderPaymentStatus;
  assignee: OrderAssignee;
  estimateNumber: string;
  items: OrderLineItem[];
  timeline: OrderTimelineEvent[];
}

export interface OrderStageColumn {
  id: OrderStage;
  label: string;
}

export interface OrderStats {
  approvedCount: number;
  approvedValue: number;
  stitchingCount: number;
  stitchingValue: number;
  readyCount: number;
  readyValue: number;
  completedThisWeekCount: number;
  completedThisWeekValue: number;
}

export interface OrderFilters {
  stage: string;
  tailor: string;
  installer: string;
  date: string;
  priority: string;
}
