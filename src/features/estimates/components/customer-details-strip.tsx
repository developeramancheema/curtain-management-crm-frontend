'use client';

import { Calendar, MapPin, Pencil, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { EstimateCustomerDetails } from '../types';

interface CustomerDetailsStripProps {
  customer: EstimateCustomerDetails;
}

function formatEstimateDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function CustomerDetailsStrip({ customer }: CustomerDetailsStripProps) {
  return (
    <Card>
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StripField label="Customer Name" value={customer.customerName || '—'} />
        <StripField
          label="Site / Address"
          value={customer.siteAddress || '—'}
          icon={MapPin}
        />
        <StripField
          label="Phone"
          value={customer.phone || '—'}
          action={
            customer.phone ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Call ${customer.customerName}`}
                render={<a href={`tel:${customer.phone.replace(/\s/g, '')}`} />}
              >
                <Phone className="h-4 w-4" />
              </Button>
            ) : null
          }
        />
        <StripField
          label="Estimate No."
          value={customer.estimateNumber || '—'}
          icon={Pencil}
        />
        <StripField
          label="Estimate Date"
          value={formatEstimateDate(customer.estimateDate)}
          icon={Calendar}
        />
      </CardContent>
    </Card>
  );
}

interface StripFieldProps {
  label: string;
  value: string;
  icon?: typeof MapPin;
  action?: ReactNode;
}

function StripField({ label, value, icon: Icon, action }: StripFieldProps) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-start gap-1.5">
        <p className="truncate text-sm font-medium">{value}</p>
        {action}
        {Icon && !action && (
          <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
      </div>
    </div>
  );
}

export { CustomerDetailsStrip };
