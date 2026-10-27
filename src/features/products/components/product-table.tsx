'use client';

import { ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/common';
import { ProductListCards } from './product-list-cards';
import { ProductTableRow } from './product-table-row';
import type { Product } from '../types';

interface ProductTableProps {
  products: Product[];
  selectedProductId: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onSelect: (product: Product) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductTable({
  products,
  selectedProductId,
  page,
  pageSize,
  totalItems,
  onSelect,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDuplicate,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <span className="inline-flex items-center gap-1">
                  Product Name
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Base Rate (₹)</TableHead>
              <TableHead className="text-right">GST (%)</TableHead>
              <TableHead className="text-right">Final Rate (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated On</TableHead>
              <TableHead className="w-[108px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  isSelected={selectedProductId === product.id}
                  onSelect={() => onSelect(product)}
                  onEdit={() => onEdit(product)}
                  onDuplicate={() => onDuplicate(product)}
                  onDelete={() => onDelete(product)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="lg:hidden">
        <ProductListCards
          products={products}
          selectedProductId={selectedProductId}
          onSelect={onSelect}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      </div>
      <div className="border-t px-4 py-3">
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}

export { ProductTable };
