import { TasksBoard } from '@/features/tasks';

export const metadata = {
  title: 'Tasks & Reminders',
  description: 'Plan visits, stitching, installations, and payment follow-ups',
};

export default function TasksPage() {
  return <TasksBoard />;
}
