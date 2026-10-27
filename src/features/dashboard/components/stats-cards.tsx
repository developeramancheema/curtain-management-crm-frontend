'use client';

import {
  TrendingUp,
  TrendingDown,
  Receipt,
  CreditCard,
  ClipboardList,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { DashboardStats } from '../types';

interface StatsCardsProps {
  stats: DashboardStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Today's Sales",
      value: formatCurrency(stats.todaySales),
      change: stats.salesGrowth,
      changeLabel: 'vs Yesterday',
      icon: TrendingUp,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Pending Receivables',
      value: formatCurrency(stats.pendingReceivables),
      subtitle: `From ${stats.receivablesCustomers} Customers`,
      icon: Receipt,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: "Today's Payments",
      value: formatCurrency(stats.todayPayments),
      change: stats.paymentsGrowth,
      changeLabel: 'vs Yesterday',
      icon: CreditCard,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders.toString(),
      subtitle: 'Across all stages',
      icon: ClipboardList,
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <p className="text-xl font-bold sm:text-2xl">{card.value}</p>
                {card.change !== undefined && (
                  <div className="flex items-center gap-1 text-xs">
                    {card.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={cn(
                        'font-medium',
                        card.change >= 0 ? 'text-success' : 'text-destructive'
                      )}
                    >
                      {card.change >= 0 ? '+' : ''}
                      {card.change}%
                    </span>
                    <span className="text-muted-foreground">
                      {card.changeLabel}
                    </span>
                  </div>
                )}
                {card.subtitle && (
                  <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                )}
              </div>
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  card.iconBg
                )}
              >
                <card.icon className={cn('h-5 w-5', card.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { StatsCards };
