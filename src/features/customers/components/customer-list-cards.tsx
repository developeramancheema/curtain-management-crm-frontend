'use client';

import { MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ListCard } from '@/components/common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Customer } from '../types';

const statusVariants = {
  active: 'bg-success/10 text-success',
  inactive: 'bg-muted text-muted-foreground',
  new: 'bg-info/10 text-info',
  pending: 'bg-warning/10 text-warning',
} as const;

const statusLabels = {
  active: 'Active',
  inactive: 'Inactive',
  new: 'New',
  pending: 'Pending',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface CustomerListCardsProps {
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelect: (customer: Customer) => void;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
}

function CustomerListCards({
  customers,
  selectedCustomerId,
  onSelect,
  onView,
  onEdit,
}: CustomerListCardsProps) {
  if (customers.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No customers found.
      </p>
    );
  }

  return (
    <div className="space-y-2 p-3">
      {customers.map((customer) => (
        <ListCard
          key={customer.id}
          selected={selectedCustomerId === customer.id}
          onClick={() => onSelect(customer)}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-sm text-primary">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className={cn('border-0 text-xs', statusVariants[customer.status])}
              >
                {statusLabels[customer.status]}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(customer)}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(customer)}>
                    Edit Customer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{customer.city}</span>
            {customer.outstandingBalance > 0 ? (
              <span className="font-medium text-destructive">
                ₹ {customer.outstandingBalance.toLocaleString('en-IN')}
              </span>
            ) : (
              <span className="text-success">₹ 0.00</span>
            )}
          </div>
        </ListCard>
      ))}
    </div>
  );
}

export { CustomerListCards };
