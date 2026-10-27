'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Upload,
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import {
  CustomerStatsCards,
  CustomerListCards,
  mockCustomers,
  mockCustomerStats,
  mockCustomerEstimates,
  mockCustomerInvoices,
} from '@/features/customers';
import { ResponsiveDetail } from '@/components/common';
import type { Customer, CustomerEstimate, CustomerInvoice } from '@/features/customers';

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

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface CustomerDetailProps {
  customer: Customer;
  estimates: CustomerEstimate[];
  invoices: CustomerInvoice[];
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onCancelEdit: () => void;
}

function CustomerDetailPanel({
  customer,
  estimates,
  invoices,
  isEditing,
  onClose,
  onEdit,
  onCancelEdit,
}: CustomerDetailProps) {
  const pendingBalance = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  if (isEditing) {
    return (
      <Card className="h-fit">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <h3 className="text-lg font-semibold">Edit Customer</h3>
          <Button variant="ghost" size="icon" onClick={onCancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input defaultValue={customer.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" defaultValue={customer.email} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input defaultValue={customer.phone} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input defaultValue={customer.city} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input defaultValue={customer.address} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue={customer.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes</label>
            <Input defaultValue={customer.notes || ''} placeholder="Add notes..." />
          </div>
          <Separator />
          <div className="flex gap-2">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" onClick={onCancelEdit}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-amber-100 text-amber-700 text-xl font-semibold">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              <Badge
                variant="outline"
                className={cn('text-xs', statusVariants[customer.status])}
              >
                {statusLabels[customer.status]}
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
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onEdit} title="Edit Customer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <span className="text-muted-foreground">
            {customer.address}, {customer.city}, Uttar Pradesh - 226024
          </span>
        </div>

        {customer.notes && (
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            {customer.notes}
          </p>
        )}

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" render={<Link href="/quotations/new" />}>
            <Plus className="h-4 w-4 mr-1" />
            New Estimate
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="text-success border-success/30 hover:bg-success/10">
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
        </div>

        <Button variant="link" className="p-0 h-auto text-primary text-sm">
          View Ledger
        </Button>

        <Separator />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Total Estimates</p>
            <p className="text-xl font-bold">{estimates.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Invoices</p>
            <p className="text-xl font-bold">{invoices.length}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="text-xl font-bold text-destructive">
              ₹ {customer.outstandingBalance.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Recent Estimates</h4>
            <Button variant="link" className="p-0 h-auto text-xs text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {estimates.slice(0, 4).map((estimate) => (
              <div
                key={estimate.id}
                className="flex items-center justify-between text-sm py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary">{estimate.estimateNumber}</span>
                  <span className="text-muted-foreground">{estimate.project}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">{estimate.date}</span>
                  <span className="font-medium">₹ {estimate.amount.toLocaleString('en-IN')}</span>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] px-1.5', estimateStatusVariants[estimate.status])}
                  >
                    {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Recent Invoices</h4>
            <Button variant="link" className="p-0 h-auto text-xs text-primary">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {invoices.slice(0, 3).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between text-sm py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary">{invoice.invoiceNumber}</span>
                  <span className="text-muted-foreground">{invoice.project}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">{invoice.date}</span>
                  <span className="font-medium">₹ {invoice.amount.toLocaleString('en-IN')}</span>
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] px-1.5', invoiceStatusVariants[invoice.status])}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pending Balance</p>
            <p className="text-2xl font-bold text-destructive">
              ₹ {pendingBalance.toLocaleString('en-IN')}
            </p>
          </div>
          <Button>View Ledger</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    mockCustomers[0]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditing(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(mockCustomers.map((c) => c.city))];
    return uniqueCities.sort();
  }, []);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search);
      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;
      const matchesStatus =
        statusFilter === 'all' || customer.status === statusFilter;
      return matchesSearch && matchesCity && matchesStatus;
    });
  }, [search, cityFilter, statusFilter]);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page, pageSize]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const clearFilters = () => {
    setSearch('');
    setCityFilter('all');
    setStatusFilter('all');
    setPage(1);
  };

  const hasActiveFilters =
    search !== '' || cityFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <h1 className="hidden text-2xl font-semibold lg:mr-4 lg:block">
          Customers
        </h1>

        <div className="relative w-full lg:w-[220px]">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-9 pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:contents">
        <Select
          value={cityFilter}
          onValueChange={(value) => {
            if (value) {
              setCityFilter(value);
              setPage(1);
            }
          }}
        >
          <SelectTrigger className="h-9 w-full lg:w-[130px]">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            if (value) {
              setStatusFilter(value);
              setPage(1);
            }
          }}
        >
          <SelectTrigger className="h-9 w-full lg:w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="link"
            size="sm"
            onClick={clearFilters}
            className="text-primary h-9"
          >
            Clear
          </Button>
        )}

        <div className="flex w-full items-center gap-2 lg:ml-auto lg:w-auto">
          <Button variant="outline" size="sm" className="h-9 flex-1 lg:flex-none">
            <Upload className="h-4 w-4 lg:mr-2" />
            <span className="hidden sm:inline">Import Customers</span>
            <span className="sm:hidden">Import</span>
          </Button>
          <Button size="sm" className="h-9 flex-1 lg:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <CustomerStatsCards stats={mockCustomerStats} />

      {/* Main Content */}
      <div className="flex min-w-0 gap-6">
        <Card className="min-w-0 flex-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[180px]">Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Last Estimate</TableHead>
                    <TableHead className="text-right">Outstanding</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className={cn(
                          'cursor-pointer',
                          selectedCustomer?.id === customer.id &&
                            'bg-primary/5 border-l-2 border-l-primary'
                        )}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {customer.phone}
                        </TableCell>
                        <TableCell className="text-sm">{customer.city}</TableCell>
                        <TableCell>
                          {customer.lastEstimateNumber ? (
                            <div>
                              <div className="font-medium text-primary text-sm">
                                {customer.lastEstimateNumber}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.lastEstimate}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {customer.outstandingBalance > 0 ? (
                            <span className="font-medium text-destructive">
                              ₹ {customer.outstandingBalance.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-success">₹ 0.00</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{customer.lastActivity}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.lastActivityType}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn('border-0 text-xs', statusVariants[customer.status])}
                          >
                            {statusLabels[customer.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(customer)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                                Edit Customer
                              </DropdownMenuItem>
                              <DropdownMenuItem render={<Link href="/quotations/new" />}>
                                New Estimate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="lg:hidden">
              <CustomerListCards
                customers={paginatedCustomers}
                selectedCustomerId={selectedCustomer?.id ?? null}
                onSelect={setSelectedCustomer}
                onView={handleViewDetails}
                onEdit={handleEditCustomer}
              />
            </div>

            <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing {(page - 1) * pageSize + 1} to{' '}
                {Math.min(page * pageSize, filteredCustomers.length)} of{' '}
                {filteredCustomers.length} customers
              </p>
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? 'default' : 'outline'}
                      size="icon-sm"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 3 && (
                  <>
                    <span className="px-1 text-muted-foreground">...</span>
                    <Button
                      variant={page === totalPages ? 'default' : 'outline'}
                      size="icon-sm"
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    if (value) {
                      setPageSize(Number(value));
                      setPage(1);
                    }
                  }}
                >
                  <SelectTrigger className="ml-2 hidden h-8 w-[100px] sm:flex">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 / page</SelectItem>
                    <SelectItem value="20">20 / page</SelectItem>
                    <SelectItem value="50">50 / page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <ResponsiveDetail
          open={!!selectedCustomer}
          onClose={() => {
            setSelectedCustomer(null);
            setIsEditing(false);
          }}
          className="w-[380px] shrink-0"
        >
          {selectedCustomer && (
            <CustomerDetailPanel
              customer={selectedCustomer}
              estimates={mockCustomerEstimates}
              invoices={mockCustomerInvoices}
              isEditing={isEditing}
              onClose={() => {
                setSelectedCustomer(null);
                setIsEditing(false);
              }}
              onEdit={() => setIsEditing(true)}
              onCancelEdit={() => setIsEditing(false)}
            />
          )}
        </ResponsiveDetail>
      </div>
    </div>
  );
}
