'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

const priorityVariants = {
  low: 'secondary',
  medium: 'warning',
  high: 'destructive',
} as const;

function TaskList({ tasks: initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 rounded-lg border p-3"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <p
                  className={cn(
                    'text-sm font-medium leading-none',
                    task.completed && 'line-through text-muted-foreground'
                  )}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={priorityVariants[task.priority]}>
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { TaskList };
