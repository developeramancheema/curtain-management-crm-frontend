'use client';

import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  FileText,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reportTypes = [
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Revenue, orders, and sales trends analysis',
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 'customers',
    title: 'Customer Report',
    description: 'Customer acquisition and retention metrics',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'orders',
    title: 'Orders Report',
    description: 'Order status, fulfillment, and delivery stats',
    icon: ShoppingCart,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    id: 'revenue',
    title: 'Revenue Report',
    description: 'Detailed revenue breakdown and projections',
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: 'inventory',
    title: 'Inventory Report',
    description: 'Stock levels, movements, and alerts',
    icon: Package,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: 'invoices',
    title: 'Invoice Report',
    description: 'Invoice status, aging, and collection rates',
    icon: FileText,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

function ReportsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reportTypes.map((report) => (
        <Card key={report.id} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${report.bgColor}`}
            >
              <report.icon className={`h-5 w-5 ${report.color}`} />
            </div>
            <Button variant="ghost" size="icon-sm">
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {report.description}
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                View Report
              </Button>
              <Button variant="ghost" size="sm">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ReportsSummary() {
  const summaryStats = [
    {
      title: 'Total Revenue (MTD)',
      value: '$45,231',
      change: '+18%',
      isPositive: true,
    },
    {
      title: 'Orders Completed',
      value: '245',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'New Customers',
      value: '56',
      change: '+8%',
      isPositive: true,
    },
    {
      title: 'Pending Payments',
      value: '$11,500',
      change: '-5%',
      isPositive: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Quick Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat) => (
            <div key={stat.title} className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span
                  className={`text-sm font-medium ${
                    stat.isPositive ? 'text-success' : 'text-destructive'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { ReportsOverview, ReportsSummary };
