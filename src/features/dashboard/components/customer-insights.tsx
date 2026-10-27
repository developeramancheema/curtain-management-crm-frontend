'use client';

import { Users, UserCheck, IndianRupee, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { CustomerInsightsData } from '../types';

interface CustomerInsightsProps {
  data: CustomerInsightsData;
}

function CustomerInsights({ data }: CustomerInsightsProps) {
  const metrics = [
    {
      label: 'New Customers',
      value: data.newCustomers,
      growth: data.newCustomersGrowth,
      icon: Users,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      label: 'Repeat Customers',
      value: data.repeatCustomers,
      growth: data.repeatCustomersGrowth,
      icon: UserCheck,
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
    },
    {
      label: 'Avg. Order Value',
      value: `₹ ${data.avgOrderValue.toLocaleString('en-IN')}`,
      growth: data.avgOrderValueGrowth,
      icon: IndianRupee,
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
      isAmount: true,
    },
    {
      label: 'Orders Completed',
      value: data.ordersCompleted,
      growth: data.ordersCompletedGrowth,
      icon: ClipboardCheck,
      iconBg: 'bg-info/10',
      iconColor: 'text-info',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Customer Insights</CardTitle>
        <Select defaultValue="this-month">
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg',
                    metric.iconBg
                  )}
                >
                  <metric.icon className={cn('h-4 w-4', metric.iconColor)} />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-semibold">{metric.value}</p>
                <p className="text-xs text-success">
                  ↑ {metric.growth}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { CustomerInsights };
