'use client';

import { PageHeader, ResponsiveDetail } from '@/components/common';
import { cn } from '@/lib/utils';
import { ProductCategoryTabs } from './product-category-tabs';
import { ProductDetailPanel } from './product-detail-panel';
import { ProductFormDialog } from './product-form-dialog';
import { ProductStatsCards } from './product-stats';
import { ProductTable } from './product-table';
import { ProductToolbar } from './product-toolbar';
import { mockProductStats } from '../mock/products.mock';
import { useProducts } from '../hooks/use-products';

function ProductsBoard() {
  const {
    filters,
    page,
    pageSize,
    filteredCount,
    paginatedProducts,
    selectedProduct,
    editingProduct,
    isFormOpen,
    handleFilterChange,
    clearFilters,
    setPage,
    setPageSize,
    setSelectedProductId,
    openCreateForm,
    openEditForm,
    handleSaveProduct,
    handleDuplicate,
    handleDelete,
    handleDeactivate,
    setIsFormOpen,
    setEditingProduct,
  } = useProducts();

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <PageHeader
        title="Products & Rates"
        description="Manage fabrics, hardware, services, and selling rates"
      />

      <ProductStatsCards stats={mockProductStats} />

      <ProductToolbar
        filters={filters}
        onChange={handleFilterChange}
        onClear={clearFilters}
        onAddProduct={openCreateForm}
      />

      <ProductCategoryTabs
        value={filters.tab}
        stats={mockProductStats}
        onChange={(tab) =>
          handleFilterChange({
            tab,
            category: tab === 'all' ? 'all' : tab,
          })
        }
      />

      <div
        className={cn(
          'grid min-w-0 gap-4',
          selectedProduct && 'lg:grid-cols-[minmax(0,1fr)_22.5rem]'
        )}
      >
        <div className="min-w-0">
          <ProductTable
            products={paginatedProducts}
            selectedProductId={selectedProduct?.id ?? null}
            page={page}
            pageSize={pageSize}
            totalItems={filteredCount}
            onSelect={(product) =>
              setSelectedProductId((current) =>
                current === product.id ? null : product.id
              )
            }
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onEdit={openEditForm}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        </div>

        {selectedProduct && (
          <ResponsiveDetail
            open
            onClose={() => setSelectedProductId(null)}
            className="min-w-0 max-w-full lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
          >
            <ProductDetailPanel
              product={selectedProduct}
              onClose={() => setSelectedProductId(null)}
              onEdit={() => openEditForm(selectedProduct)}
              onDeactivate={() => handleDeactivate(selectedProduct)}
            />
          </ResponsiveDetail>
        )}
      </div>

      <ProductFormDialog
        open={isFormOpen}
        product={editingProduct}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingProduct(null);
        }}
        onSubmit={handleSaveProduct}
      />
    </div>
  );
}

export { ProductsBoard };
