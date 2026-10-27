import type { TaskPriority, TaskType } from '../types';

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  measurement: 'Measurement',
  stitching: 'Stitching',
  installation: 'Installation',
  delivery: 'Delivery',
  payment: 'Payment Reminder',
};

export const TASK_TYPE_STYLES: Record<
  TaskType,
  { bar: string; icon: string; badge: string }
> = {
  measurement: {
    bar: 'border-primary/20 bg-primary/10',
    icon: 'bg-primary/15 text-primary',
    badge: 'bg-primary/10 text-primary',
  },
  stitching: {
    bar: 'border-success/20 bg-success/10',
    icon: 'bg-success/15 text-success',
    badge: 'bg-success/10 text-success',
  },
  installation: {
    bar: 'border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/40',
    icon: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400',
  },
  delivery: {
    bar: 'border-warning/20 bg-warning/10',
    icon: 'bg-warning/15 text-warning',
    badge: 'bg-warning/10 text-warning',
  },
  payment: {
    bar: 'border-destructive/20 bg-destructive/10',
    icon: 'bg-destructive/15 text-destructive',
    badge: 'bg-destructive/10 text-destructive',
  },
};

export const PRIORITY_STYLES: Record<TaskPriority, string> = {
  high: 'bg-destructive/10 text-destructive',
  medium: 'bg-warning/10 text-warning',
  low: 'bg-success/10 text-success',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const AGENDA_HOURS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
] as const;

export function formatInr(value: number): string {
  return `₹ ${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function hourKey(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;
  const hour = Number(match[1]);
  const period = match[3].toUpperCase();
  return `${hour}:00 ${period}`;
}

export function toDisplayTime(value: string): string {
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`;
}
