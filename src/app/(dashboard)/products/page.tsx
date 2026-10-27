import { ProductsBoard } from '@/features/products';

export const metadata = {
  title: 'Products & Rates',
  description: 'Manage fabrics, hardware, services, and selling rates',
};

export default function ProductsPage() {
  return <ProductsBoard />;
}
