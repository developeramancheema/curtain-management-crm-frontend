'use client';

import { FileText, Clock, IndianRupee, Percent } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatInrWithSymbol } from '../utils';
import type { EstimateStats } from '../types';

interface EstimateStatsCardsProps {
  stats: EstimateStats;
}

function EstimateStatsCards({ stats }: EstimateStatsCardsProps) {
  const cards = [
    {
      title: 'Total Estimates',
      value: stats.totalEstimates.toString(),
      growth: stats.totalEstimatesGrowth,
      icon: FileText,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Pending Approval',
      value: stats.pendingApproval.toString(),
      icon: Clock,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Approved Value',
      value: formatInrWithSymbol(stats.approvedValue, false),
      icon: IndianRupee,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: Percent,
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
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
              <p className="text-xl font-bold">{card.value}</p>
              {card.growth !== undefined && (
                <p className="text-xs text-success">
                  ↑ {card.growth}% vs Last Month
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { EstimateStatsCards };
