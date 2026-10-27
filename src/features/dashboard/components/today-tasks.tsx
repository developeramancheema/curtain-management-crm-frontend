'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ruler, Scissors, Wrench, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TodayTask } from '../types';

interface TodayTasksProps {
  tasks: TodayTask[];
}

const priorityVariants = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
} as const;

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const taskIcons: Record<string, typeof Ruler> = {
  'Measurement Visit': Ruler,
  'Stitching Update': Scissors,
  'Installation': Wrench,
  'Follow-up Call': Phone,
};

function TodayTasks({ tasks: initialTasks }: TodayTasksProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getTaskIcon = (title: string) => {
    const Icon = taskIcons[title] || Ruler;
    return Icon;
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Today&apos;s Tasks</CardTitle>
        <Link href="/tasks" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => {
            const TaskIcon = getTaskIcon(task.title);
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-0.5"
                />
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <TaskIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      task.completed && 'line-through text-muted-foreground'
                    )}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {task.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {task.time}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] px-1.5 py-0', priorityVariants[task.priority])}
                  >
                    {priorityLabels[task.priority]}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { TodayTasks };
