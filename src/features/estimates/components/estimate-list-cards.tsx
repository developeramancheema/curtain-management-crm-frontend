'use client';

import Link from 'next/link';
import { Copy, FileText, MoreVertical, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatInrWithSymbol } from '../utils';
import type { EstimateListItem, EstimateStatus } from '../types';

const statusVariants: Record<EstimateStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-info/10 text-info',
  viewed: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
  expired: 'bg-muted text-muted-foreground',
};

const statusLabels: Record<EstimateStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  viewed: 'Viewed',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

interface EstimateListCardsProps {
  estimates: EstimateListItem[];
}

function EstimateListCards({ estimates }: EstimateListCardsProps) {
  if (estimates.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No estimates found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {estimates.map((estimate) => (
        <ListCard key={estimate.id}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-primary">{estimate.estimateNumber}</p>
              <p className="truncate text-sm">{estimate.customerName}</p>
              <p className="text-xs text-muted-foreground">{estimate.siteAddress}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className={statusVariants[estimate.status]}
              >
                {statusLabels[estimate.status]}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem render={<Link href="/quotations/new" />}>
                    <FileText className="mr-2 h-4 w-4" />
                    View / Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Send className="mr-2 h-4 w-4" />
                    Send to Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {estimate.roomCount} rooms · {formatDate(estimate.estimateDate)}
            </span>
            <span className="font-semibold">
              {formatInrWithSymbol(estimate.total)}
            </span>
          </div>
        </ListCard>
      ))}
    </div>
  );
}

export { EstimateListCards };
