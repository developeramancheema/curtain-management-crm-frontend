'use client';

import { Phone, Ruler, Scissors, Truck, Wrench } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  PRIORITY_LABELS,
  PRIORITY_STYLES,
  TASK_TYPE_LABELS,
  TASK_TYPE_STYLES,
} from '../utils';
import type { Task, TaskType } from '../types';

interface TasksByCategoryProps {
  tasks: Task[];
  onToggle: (taskId: string, completed: boolean) => void;
  onViewAll: (type: TaskType) => void;
}

const TYPE_ICONS: Record<TaskType, typeof Ruler> = {
  measurement: Ruler,
  stitching: Scissors,
  installation: Wrench,
  delivery: Truck,
  payment: Phone,
};

const CATEGORIES: TaskType[] = [
  'measurement',
  'stitching',
  'installation',
  'delivery',
  'payment',
];

function TasksByCategory({
  tasks,
  onToggle,
  onViewAll,
}: TasksByCategoryProps) {
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[72rem] grid-cols-5 gap-4">
        {CATEGORIES.map((type) => {
          const items = tasks.filter((task) => task.type === type);
          const Icon = TYPE_ICONS[type];

          return (
            <Card key={type} className="min-w-0">
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                      TASK_TYPE_STYLES[type].icon
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="truncate text-sm font-semibold">
                    {TASK_TYPE_LABELS[type]}
                  </h3>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    TASK_TYPE_STYLES[type].badge
                  )}
                >
                  {items.length}
                </span>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {items.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border bg-background p-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => {
                          if (typeof checked === 'boolean') {
                            onToggle(task.id, checked);
                          }
                        }}
                        className="mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            task.completed && 'text-muted-foreground line-through'
                          )}
                        >
                          {task.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {task.detail}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2 pl-6">
                      <span className="text-xs text-muted-foreground">
                        {task.startTime}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant="outline"
                          className={cn('border-0', PRIORITY_STYLES[task.priority])}
                        >
                          {PRIORITY_LABELS[task.priority]}
                        </Badge>
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="bg-primary/10 text-[9px] text-primary">
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto px-0"
                  onClick={() => onViewAll(type)}
                >
                  View all ({items.length})
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export { TasksByCategory };
