'use client';

import { X, Phone, Mail, MapPin, Plus, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Customer, CustomerEstimate, CustomerInvoice } from '../types';

interface CustomerDetailPanelProps {
  customer: Customer;
  estimates: CustomerEstimate[];
  invoices: CustomerInvoice[];
  onClose: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const statusVariants = {
  active: 'bg-success/10 text-success',
  inactive: 'bg-muted text-muted-foreground',
  new: 'bg-info/10 text-info',
  pending: 'bg-warning/10 text-warning',
} as const;

const estimateStatusVariants = {
  sent: 'bg-info/10 text-info',
  viewed: 'bg-warning/10 text-warning',
  draft: 'bg-muted text-muted-foreground',
  approved: 'bg-success/10 text-success',
} as const;

const invoiceStatusVariants = {
  paid: 'bg-success/10 text-success',
  unpaid: 'bg-destructive/10 text-destructive',
  partial: 'bg-warning/10 text-warning',
} as const;

function CustomerDetailPanel({
  customer,
  estimates,
  invoices,
  onClose,
}: CustomerDetailPanelProps) {
  const pendingBalance = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Card className="h-fit sticky top-6">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{customer.name}</h3>
              <Badge
                variant="outline"
                className={statusVariants[customer.status]}
              >
                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Phone className="h-3 w-3" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{customer.email}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="text-muted-foreground">
            {customer.address}, {customer.city}, Uttar Pradesh - 226024
          </span>
        </div>

        {/* Notes */}
        {customer.notes && (
          <p className="text-sm text-muted-foreground italic">
            {customer.notes}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" render={<Link href="/quotations/new" />}>
            <Plus className="h-4 w-4 mr-1" />
            New Estimate
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
        </div>

        <Button variant="link" className="p-0 h-auto text-primary">
          View Ledger
        </Button>

        <Separator />

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Total Estimates</p>
            <p className="text-lg font-semibold">{estimates.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Invoices</p>
            <p className="text-lg font-semibold">{invoices.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="text-lg font-semibold text-destructive">
              ₹ {customer.outstandingBalance.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <Separator />

        {/* Recent Estimates */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Recent Estimates</h4>
            <Button variant="link" className="p-0 h-auto text-xs text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {estimates.slice(0, 4).map((estimate) => (
              <div
                key={estimate.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <span className="font-medium">{estimate.estimateNumber}</span>
                  <span className="text-muted-foreground ml-2">
                    {estimate.project}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{estimate.date}</span>
                  <span className="font-medium">
                    ₹ {estimate.amount.toLocaleString('en-IN')}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${estimateStatusVariants[estimate.status]}`}
                  >
                    {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Recent Invoices */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Recent Invoices</h4>
            <Button variant="link" className="p-0 h-auto text-xs text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {invoices.slice(0, 3).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <span className="font-medium">{invoice.invoiceNumber}</span>
                  <span className="text-muted-foreground ml-2">
                    {invoice.project}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{invoice.date}</span>
                  <span className="font-medium">
                    ₹ {invoice.amount.toLocaleString('en-IN')}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${invoiceStatusVariants[invoice.status]}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Pending Balance */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pending Balance</p>
            <p className="text-xl font-bold text-destructive">
              ₹ {pendingBalance.toLocaleString('en-IN')}
            </p>
          </div>
          <Button>View Ledger</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { CustomerDetailPanel };
