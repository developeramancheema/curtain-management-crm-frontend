'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, ResponsiveDetail } from '@/components/common';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DEFAULT_FILTERS, OrderBoardFilters } from './order-filters';
import { OrderDetailPanel } from './order-detail-panel';
import { OrderKanbanBoard } from './order-kanban';
import { OrderStatsCards } from './order-stats';
import { mockOrderStats, mockOrders } from '../mock/orders.mock';
import type { Order, OrderFilters } from '../types';

function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filters, setFilters] = useState<OrderFilters>(DEFAULT_FILTERS);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStage =
        filters.stage === 'all' || order.stage === filters.stage;
      const matchesPriority =
        filters.priority === 'all' || order.priority === filters.priority;
      const matchesTailor =
        filters.tailor === 'all' ||
        (order.assignee.role === 'tailor' &&
          order.assignee.id === filters.tailor);
      const matchesInstaller =
        filters.installer === 'all' ||
        (order.assignee.role === 'installer' &&
          order.assignee.id === filters.installer);
      return (
        matchesStage && matchesPriority && matchesTailor && matchesInstaller
      );
    });
  }, [orders, filters]);

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? null;

  const handleMarkStitching = () => {
    if (!selectedOrder) return;
    setOrders((current) =>
      current.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, stage: 'stitching' }
          : order
      )
    );
    toast.success(`${selectedOrder.orderNumber} moved to Stitching`);
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrderId((current) =>
      current === order.id ? null : order.id
    );
  };

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageHeader title="Orders">
        <Button
          variant="outline"
          size="sm"
          className="h-9 flex-1 sm:flex-none"
          onClick={() => toast.success('Orders exported')}
        >
          <Download className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 flex-1 sm:flex-none"
          onClick={() =>
            toast.message('Use the stage, tailor, and date filters below')
          }
        >
          <Filter className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
        <Button
          size="sm"
          className="h-9 flex-1 sm:flex-none"
          render={<Link href="/quotations/new" />}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </PageHeader>

      <OrderStatsCards stats={mockOrderStats} />

      <OrderBoardFilters
        filters={filters}
        onChange={(patch) =>
          setFilters((current) => ({ ...current, ...patch }))
        }
        onClear={() => setFilters(DEFAULT_FILTERS)}
      />

      <div
        className={cn(
          'grid min-w-0 gap-4',
          selectedOrder && 'lg:grid-cols-[minmax(0,1fr)_22.5rem]'
        )}
      >
        <div className="min-w-0 overflow-x-auto">
          <OrderKanbanBoard
            orders={filteredOrders}
            selectedOrderId={selectedOrder?.id ?? null}
            onSelectOrder={handleSelectOrder}
          />
        </div>

        {selectedOrder && (
          <ResponsiveDetail
            open
            onClose={() => setSelectedOrderId(null)}
            className="min-w-0 max-w-full lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
          >
            <OrderDetailPanel
              order={selectedOrder}
              onClose={() => setSelectedOrderId(null)}
              onMarkStitching={handleMarkStitching}
            />
          </ResponsiveDetail>
        )}
      </div>
    </div>
  );
}

export { OrdersBoard };
