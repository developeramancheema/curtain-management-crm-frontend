'use client';

import { Calendar, MapPin, Pencil, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCustomers } from '@/features/customers';
import type { EstimateCustomerDetails } from '../types';

interface CustomerDetailsStepProps {
  customer: EstimateCustomerDetails;
  onChange: (patch: Partial<EstimateCustomerDetails>) => void;
}

function CustomerDetailsStep({ customer, onChange }: CustomerDetailsStepProps) {
  const handleCustomerSelect = (customerId: string) => {
    const match = mockCustomers.find((entry) => entry.id === customerId);
    if (!match) return;

    onChange({
      customerId: match.id,
      customerName: match.name,
      phone: match.phone,
      siteAddress: `${match.address}, ${match.city}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Customer &amp; Estimate Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="estimate-customer">Customer Name</Label>
          <Select
            value={customer.customerId}
            onValueChange={(value) => {
              if (value) handleCustomerSelect(value);
            }}
          >
            <SelectTrigger id="estimate-customer" className="w-full">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {!mockCustomers.some((entry) => entry.id === customer.customerId) &&
                customer.customerId && (
                  <SelectItem value={customer.customerId}>
                    {customer.customerName}
                  </SelectItem>
                )}
              {mockCustomers.map((entry) => (
                <SelectItem key={entry.id} value={entry.id}>
                  {entry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimate-address">Site / Address</Label>
          <div className="relative">
            <Input
              id="estimate-address"
              value={customer.siteAddress}
              onChange={(event) => onChange({ siteAddress: event.target.value })}
              placeholder="Site address"
              className="pr-9"
            />
            <MapPin
              className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimate-number">Estimate No.</Label>
          <div className="relative">
            <Input
              id="estimate-number"
              value={customer.estimateNumber}
              onChange={(event) =>
                onChange({ estimateNumber: event.target.value })
              }
              className="pr-9"
            />
            <Pencil
              className="pointer-events-none absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimate-date">Estimate Date</Label>
          <div className="relative">
            <Input
              id="estimate-date"
              type="date"
              value={customer.estimateDate}
              onChange={(event) =>
                onChange({ estimateDate: event.target.value })
              }
              className="pr-9"
            />
            <Calendar
              className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimate-phone">Phone</Label>
          <div className="flex items-center gap-2">
            <Input
              id="estimate-phone"
              value={customer.phone}
              onChange={(event) => onChange({ phone: event.target.value })}
              placeholder="+91 00000 00000"
            />
            <Button
              variant="outline"
              size="icon"
              aria-label={`Call ${customer.customerName || 'customer'}`}
              render={<a href={`tel:${customer.phone.replace(/\s/g, '')}`} />}
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { CustomerDetailsStep };
