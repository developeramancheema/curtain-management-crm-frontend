'use client';

import { OrderKanbanColumn } from './order-kanban-column';
import { ORDER_STAGES } from '../mock/orders.mock';
import type { Order, OrderStage } from '../types';

interface OrderKanbanBoardProps {
  orders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (order: Order) => void;
}

function OrderKanbanBoard({
  orders,
  selectedOrderId,
  onSelectOrder,
}: OrderKanbanBoardProps) {
  const ordersByStage = ORDER_STAGES.reduce(
    (acc, column) => {
      acc[column.id] = orders.filter((order) => order.stage === column.id);
      return acc;
    },
    {} as Record<OrderStage, Order[]>
  );

  return (
    <div className="grid w-full min-w-[90rem] grid-cols-5 gap-4">
      {ORDER_STAGES.map((column) => (
        <OrderKanbanColumn
          key={column.id}
          column={column}
          orders={ordersByStage[column.id]}
          selectedOrderId={selectedOrderId}
          onSelectOrder={onSelectOrder}
        />
      ))}
    </div>
  );
}

export { OrderKanbanBoard };
