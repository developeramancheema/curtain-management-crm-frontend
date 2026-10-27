'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MoreVertical, Send, Copy, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableToolbar, DataTablePagination } from '@/components/common';
import { EstimateListCards } from './estimate-list-cards';
import { formatInrWithSymbol } from '../utils';
import type { EstimateListItem, EstimateStatus } from '../types';

interface EstimateTableProps {
  estimates: EstimateListItem[];
}

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

function EstimateTable({ estimates }: EstimateTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredEstimates = useMemo(() => {
    return estimates.filter((estimate) => {
      const matchesSearch =
        estimate.estimateNumber.toLowerCase().includes(search.toLowerCase()) ||
        estimate.customerName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || estimate.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [estimates, search, statusFilter]);

  const paginatedEstimates = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredEstimates.slice(start, start + pageSize);
  }, [filteredEstimates, page, pageSize]);

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <DataTableToolbar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          searchPlaceholder="Search by estimate no. or customer..."
        >
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              if (value) {
                setStatusFilter(value);
                setPage(1);
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </DataTableToolbar>

        <div className="hidden rounded-md border lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEstimates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No estimates found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedEstimates.map((estimate) => (
                  <TableRow key={estimate.id}>
                    <TableCell className="font-medium text-primary">
                      {estimate.estimateNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{estimate.customerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {estimate.siteAddress}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{estimate.roomCount}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatInrWithSymbol(estimate.total)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusVariants[estimate.status]}
                      >
                        {statusLabels[estimate.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(estimate.estimateDate)}</TableCell>
                    <TableCell>{formatDate(estimate.validUntil)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon-sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            render={<Link href="/quotations/new" />}
                          >
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Convert to Order</DropdownMenuItem>
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
          <EstimateListCards estimates={paginatedEstimates} />
        </div>

        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalItems={filteredEstimates.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </CardContent>
    </Card>
  );
}

export { EstimateTable };
