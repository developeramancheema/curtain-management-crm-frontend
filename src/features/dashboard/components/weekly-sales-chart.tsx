'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { WeeklySalesData } from '../types';

interface WeeklySalesChartProps {
  data: WeeklySalesData[];
}

function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `₹ ${(amount / 1000).toFixed(0)}K`;
  }
  return `₹ ${amount}`;
}

function WeeklySalesChart({ data }: WeeklySalesChartProps) {
  const latestData = data[data.length - 1];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Weekly Sales Overview
        </CardTitle>
        <Select defaultValue="this-week">
          <SelectTrigger className="h-8 w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#1a4d7c"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="#1a4d7c"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
                tickFormatter={formatCurrency}
                tick={{ fontSize: 11 }}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value) => [
                  `₹ ${Number(value).toLocaleString('en-IN')}`,
                  'Sales',
                ]}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#1a4d7c"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {latestData && (
          <div className="mt-2 flex items-center justify-end gap-2 text-sm">
            <span className="text-muted-foreground">{latestData.date}</span>
            <span className="font-semibold">
              ₹ {latestData.amount.toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { WeeklySalesChart };
