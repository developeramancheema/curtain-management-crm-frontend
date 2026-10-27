'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { PageHeader } from '@/components/common';
import { PaymentReminders } from './payment-reminders';
import { QuickAddTask } from './quick-add-task';
import { TaskNotes } from './task-notes';
import { TaskStatsCards } from './task-stats';
import { TaskToolbar } from './task-toolbar';
import { TasksByCategory } from './tasks-by-category';
import { TodayAgenda } from './today-agenda';
import {
  mockPaymentReminders,
  mockTaskNotes,
  mockTaskStats,
  mockTasks,
  TASK_TODAY,
} from '../mock/tasks.mock';
import type { AgendaView, Task, TaskFilters, TaskType } from '../types';

const DEFAULT_FILTERS: TaskFilters = {
  type: 'all',
  priority: 'all',
  assignee: 'all',
};

function TasksBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [selectedDate, setSelectedDate] = useState(() => parseISO(TASK_TODAY));
  const [view, setView] = useState<AgendaView>('day');

  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesDate = task.date === dateKey;
      const matchesType = filters.type === 'all' || task.type === filters.type;
      const matchesPriority =
        filters.priority === 'all' || task.priority === filters.priority;
      const matchesAssignee =
        filters.assignee === 'all' || task.assignee.id === filters.assignee;
      return matchesDate && matchesType && matchesPriority && matchesAssignee;
    });
  }, [tasks, dateKey, filters]);

  const handleToggle = (taskId: string, completed: boolean) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageHeader
        title="Tasks & Reminders"
        description="Plan visits, stitching, installations, and payment follow-ups"
      />

      <TaskStatsCards stats={mockTaskStats} />

      <TaskToolbar
        filters={filters}
        selectedDate={selectedDate}
        view={view}
        onFiltersChange={(patch) =>
          setFilters((current) => ({ ...current, ...patch }))
        }
        onDateChange={setSelectedDate}
        onViewChange={setView}
      />

      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <TodayAgenda tasks={filteredTasks} />
        <PaymentReminders reminders={mockPaymentReminders} />
      </div>

      <TasksByCategory
        tasks={filteredTasks}
        onToggle={handleToggle}
        onViewAll={(type: TaskType) =>
          setFilters((current) => ({ ...current, type }))
        }
      />

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <QuickAddTask
          date={dateKey}
          onAdd={(task) => setTasks((current) => [task, ...current])}
        />
        <TaskNotes notes={mockTaskNotes} />
      </div>
    </div>
  );
}

export { TasksBoard };
