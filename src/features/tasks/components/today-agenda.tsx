'use client';

import { Phone, Ruler, Scissors, Truck, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AGENDA_HOURS, hourKey, TASK_TYPE_STYLES } from '../utils';
import type { Task, TaskType } from '../types';

interface TodayAgendaProps {
  tasks: Task[];
}

const TYPE_ICONS: Record<TaskType, typeof Ruler> = {
  measurement: Ruler,
  stitching: Scissors,
  installation: Wrench,
  delivery: Truck,
  payment: Phone,
};

function TodayAgenda({ tasks }: TodayAgendaProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Today&apos;s Agenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {AGENDA_HOURS.map((hour) => {
            const slotTasks = tasks.filter(
              (task) => hourKey(task.startTime) === hour
            );

            return (
              <div key={hour} className="grid grid-cols-[4.75rem_1fr] gap-3">
                <p className="pt-2 text-xs font-medium text-muted-foreground">
                  {hour}
                </p>
                <div className="min-h-10 space-y-2">
                  {slotTasks.map((task) => {
                    const Icon = TYPE_ICONS[task.type];
                    return (
                      <div
                        key={task.id}
                        className={cn(
                          'flex items-center gap-3 rounded-lg border px-3 py-2',
                          TASK_TYPE_STYLES[task.type].bar,
                          task.completed && 'opacity-60'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                            TASK_TYPE_STYLES[task.type].icon
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {task.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {task.detail}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-medium">
                          {task.startTime}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { TodayAgenda };
