import { OrdersBoard } from '@/features/orders';

export const metadata = {
  title: 'Orders',
  description: 'Track orders across approved, stitching, ready, installation, and completed stages',
};

export default function OrdersPage() {
  return <OrdersBoard />;
}
