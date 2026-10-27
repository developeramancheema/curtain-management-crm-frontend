'use client';

import { AlertTriangle, Phone, Target, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatInr } from '../utils';
import type { TaskStats } from '../types';

interface TaskStatsCardsProps {
  stats: TaskStats;
}

function TaskStatsCards({ stats }: TaskStatsCardsProps) {
  const cards = [
    {
      title: 'Tasks Due Today',
      value: stats.dueToday,
      subtitle: stats.dueTodayLabel,
      icon: Target,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Installations Today',
      value: stats.installationsToday,
      subtitle: `${stats.installationsCompleted} Completed • ${stats.installationsPending} Pending`,
      icon: Wrench,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Payment Follow-ups',
      value: stats.paymentFollowups,
      subtitle: `${formatInr(stats.paymentPendingAmount)} Pending`,
      icon: Phone,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Overdue Tasks',
      value: stats.overdue,
      subtitle: 'Requires immediate attention',
      icon: AlertTriangle,
      iconBg: 'bg-destructive/10',
      iconColor: 'text-destructive',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center justify-between gap-4 pt-4 sm:pt-6">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                card.iconBg
              )}
            >
              <card.icon className={cn('h-6 w-6', card.iconColor)} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { TaskStatsCards };
