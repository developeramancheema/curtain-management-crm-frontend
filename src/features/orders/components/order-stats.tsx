'use client';

import { CheckCircle2, Gift, Scissors, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatInr } from '../utils';
import type { OrderStats } from '../types';

interface OrderStatsCardsProps {
  stats: OrderStats;
}

function OrderStatsCards({ stats }: OrderStatsCardsProps) {
  const cards = [
    {
      title: 'Approved Orders',
      count: stats.approvedCount,
      value: stats.approvedValue,
      icon: CheckCircle2,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'In Stitching',
      count: stats.stitchingCount,
      value: stats.stitchingValue,
      icon: Scissors,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Ready for Installation',
      count: stats.readyCount,
      value: stats.readyValue,
      icon: Gift,
      iconBg: 'bg-violet-100 dark:bg-violet-950/50',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      title: 'Completed This Week',
      count: stats.completedThisWeekCount,
      value: stats.completedThisWeekValue,
      icon: Award,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center gap-4 pt-4 sm:pt-6">
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                card.iconBg
              )}
            >
              <card.icon className={cn('h-6 w-6', card.iconColor)} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-xl font-bold">{card.count}</p>
              <p className="text-xs text-muted-foreground">
                {formatInr(card.value)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { OrderStatsCards };
