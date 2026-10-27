'use client';

import Link from 'next/link';
import {
  FileText,
  CheckCircle,
  Scissors,
  Package,
  Truck,
  CircleCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { OrderStatusPipeline } from '../types';

interface OrderStatusPipelineProps {
  data: OrderStatusPipeline;
}

function OrderStatusOverview({ data }: OrderStatusPipelineProps) {
  const stages = [
    {
      key: 'estimate',
      label: 'Estimate',
      count: data.estimate,
      icon: FileText,
      color: 'text-muted-foreground',
      bg: 'bg-muted',
    },
    {
      key: 'approved',
      label: 'Approved',
      count: data.approved,
      icon: CheckCircle,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      key: 'stitching',
      label: 'Stitching',
      count: data.stitching,
      icon: Scissors,
      color: 'text-info',
      bg: 'bg-info/10',
    },
    {
      key: 'ready',
      label: 'Ready',
      count: data.ready,
      icon: Package,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      key: 'installed',
      label: 'Installed',
      count: data.installed,
      icon: Truck,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      key: 'completed',
      label: 'Completed',
      count: data.completed,
      icon: CircleCheck,
      color: 'text-success',
      bg: 'bg-success/10',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Order Status Overview
        </CardTitle>
        <Link href="/orders" className="text-sm text-primary hover:underline">
          View All Orders
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2">
          {stages.map((stage) => (
            <div
              key={stage.key}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${stage.bg}`}
              >
                <stage.icon className={`h-5 w-5 ${stage.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stage.label}</p>
                <p className="text-lg font-semibold">{stage.count}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { OrderStatusOverview };
