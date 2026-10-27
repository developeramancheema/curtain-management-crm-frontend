'use client';

import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { mockProducts } from '../mock/products.mock';
import {
  createProduct,
  toFormValues,
  updateProduct,
} from '../services/products.service';
import type { ProductFormData } from '../schemas';
import type { Product, ProductFilters } from '../types';

const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  category: 'all',
  unit: 'all',
  status: 'all',
  tab: 'all',
};

function useProducts() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const categoryValue =
        filters.tab !== 'all' ? filters.tab : filters.category;
      const matchesCategory =
        categoryValue === 'all' || product.category === categoryValue;
      const matchesUnit =
        filters.unit === 'all' || product.unit === filters.unit;
      const matchesStatus =
        filters.status === 'all' || product.status === filters.status;
      return matchesSearch && matchesCategory && matchesUnit && matchesStatus;
    });
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page, pageSize]);

  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? null;

  const handleFilterChange = (patch: Partial<ProductFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setSelectedProductId(product.id);
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (values: ProductFormData) => {
    try {
      if (editingProduct) {
        const next = updateProduct(editingProduct, values, products);
        setProducts((current) =>
          current.map((item) => (item.id === next.id ? next : item))
        );
        toast.success(`${next.name} updated`);
      } else {
        const created = createProduct(values, products);
        setProducts((current) => [created, ...current]);
        setSelectedProductId(created.id);
        setPage(1);
        toast.success(`${created.name} added`);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Unable to save product'
      );
    }
  };

  const handleDuplicate = (product: Product) => {
    try {
      const created = createProduct(
        {
          ...toFormValues(product),
          name: `${product.name} (Copy)`,
          sku: `${product.sku}-COPY`,
        },
        products
      );
      setProducts((current) => [created, ...current]);
      setSelectedProductId(created.id);
      setPage(1);
      toast.success(`${product.name} duplicated`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Unable to duplicate product'
      );
    }
  };

  const handleDelete = (product: Product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id));
    if (selectedProductId === product.id) {
      setSelectedProductId(null);
    }
    toast.success(`${product.name} deleted`);
  };

  const handleDeactivate = (product: Product) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === product.id ? { ...item, status: 'inactive' } : item
      )
    );
  };

  return {
    filters,
    page,
    pageSize,
    filteredCount: filteredProducts.length,
    paginatedProducts,
    selectedProduct,
    editingProduct,
    isFormOpen,
    handleFilterChange,
    clearFilters: () => {
      setFilters(DEFAULT_FILTERS);
      setPage(1);
    },
    setPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(1);
    },
    setSelectedProductId,
    openCreateForm,
    openEditForm,
    handleSaveProduct,
    handleDuplicate,
    handleDelete,
    handleDeactivate,
    setIsFormOpen,
    setEditingProduct,
  };
}

export { useProducts };
