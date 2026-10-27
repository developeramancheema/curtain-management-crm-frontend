'use client';

import { Package, Layers, Truck, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProductStats } from '../types';

interface ProductStatsCardsProps {
  stats: ProductStats;
}

function ProductStatsCards({ stats }: ProductStatsCardsProps) {
  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      growth: stats.totalGrowth,
      icon: Package,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Fabric Items',
      value: stats.fabricItems,
      growth: stats.fabricGrowth,
      icon: Layers,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Hardware Items',
      value: stats.hardwareItems,
      growth: stats.hardwareGrowth,
      icon: Truck,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
    },
    {
      title: 'Services',
      value: stats.services,
      growth: stats.servicesGrowth,
      icon: Wrench,
      iconBg: 'bg-violet-100 dark:bg-violet-950/50',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center justify-between gap-4 pt-4 sm:pt-6">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-xs text-success">
                ↑ {card.growth}% vs Last Month
              </p>
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

export { ProductStatsCards };
