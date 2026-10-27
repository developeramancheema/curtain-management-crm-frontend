'use client';

import { Users, Briefcase, IndianRupee, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { CustomerStats } from '../types';

interface CustomerStatsProps {
  stats: CustomerStats;
}

function CustomerStatsCards({ stats }: CustomerStatsProps) {
  const cards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      growth: stats.totalCustomersGrowth,
      icon: Users,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Active Projects',
      value: stats.activeProjects.toString(),
      growth: stats.activeProjectsGrowth,
      icon: Briefcase,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Outstanding Balance',
      value: `₹ ${stats.outstandingBalance.toLocaleString('en-IN')}`,
      growth: stats.outstandingBalanceGrowth,
      icon: IndianRupee,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Repeat Customers',
      value: stats.repeatCustomers.toString(),
      growth: stats.repeatCustomersGrowth,
      icon: UserCheck,
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
              <p className="text-xs text-success">
                ↑ {card.growth}% vs Last Month
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { CustomerStatsCards };
