'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ListCard } from '@/components/common';
import { cn } from '@/lib/utils';
import type { RecentEstimate } from '../types';

interface RecentEstimatesProps {
  estimates: RecentEstimate[];
}

const statusVariants = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-info/10 text-info',
  viewed: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
} as const;

const statusLabels = {
  draft: 'Draft',
  sent: 'Sent',
  viewed: 'Viewed',
  approved: 'Approved',
};

function RecentEstimates({ estimates }: RecentEstimatesProps) {
  const totalEstimates = estimates.length;
  const totalItems = estimates.reduce((sum, e) => sum + e.items, 0);
  const totalAmount = estimates.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Recent Estimates</CardTitle>
        <Link
          href="/quotations"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent className="px-0">
        <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Estimate #</TableHead>
              <TableHead>Customer / Project</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="pr-6 text-right">Created On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimates.map((estimate) => (
              <TableRow key={estimate.id}>
                <TableCell className="pl-6 font-medium">
                  {estimate.estimateNumber}
                </TableCell>
                <TableCell>{estimate.customer}</TableCell>
                <TableCell className="text-center">
                  {estimate.items} Items
                </TableCell>
                <TableCell className="text-right">
                  ₹ {estimate.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={cn('border-0', statusVariants[estimate.status])}
                  >
                    {statusLabels[estimate.status]}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  {format(new Date(estimate.createdAt), 'd MMM yyyy')}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableCell className="pl-6 font-medium">Total</TableCell>
              <TableCell>{totalEstimates} Estimates</TableCell>
              <TableCell className="text-center">{totalItems} Items</TableCell>
              <TableCell className="text-right font-semibold">
                ₹ {totalAmount.toLocaleString('en-IN')}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
        <div className="space-y-2 px-4 lg:hidden">
          {estimates.map((estimate) => (
            <ListCard key={estimate.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">{estimate.estimateNumber}</p>
                  <p className="truncate text-sm">{estimate.customer}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn('border-0', statusVariants[estimate.status])}
                >
                  {statusLabels[estimate.status]}
                </Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {estimate.items} items · {format(new Date(estimate.createdAt), 'd MMM yyyy')}
                </span>
                <span className="font-semibold">
                  ₹ {estimate.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </ListCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { RecentEstimates };
