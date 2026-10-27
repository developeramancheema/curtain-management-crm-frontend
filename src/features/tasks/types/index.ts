export type TaskType =
  | 'measurement'
  | 'stitching'
  | 'installation'
  | 'delivery'
  | 'payment';

export type TaskPriority = 'high' | 'medium' | 'low';

export type AgendaView = 'day' | 'week' | 'month';

export interface TaskAssignee {
  id: string;
  name: string;
  initials: string;
}

export interface Task {
  id: string;
  title: string;
  detail: string;
  type: TaskType;
  priority: TaskPriority;
  assignee: TaskAssignee;
  date: string;
  startTime: string;
  completed: boolean;
  customerName: string;
}

export interface PaymentReminder {
  id: string;
  customerName: string;
  project: string;
  initials: string;
  invoiceNumber: string;
  dueDate: string;
  dueLabel: string;
  overdue: boolean;
  amount: number;
  phone: string;
}

export interface TaskNote {
  id: string;
  text: string;
  addedBy: string;
  timestamp: string;
}

export interface TaskStats {
  dueToday: number;
  dueTodayLabel: string;
  installationsToday: number;
  installationsCompleted: number;
  installationsPending: number;
  paymentFollowups: number;
  paymentPendingAmount: number;
  overdue: number;
}

export interface TaskFilters {
  type: string;
  priority: string;
  assignee: string;
}
