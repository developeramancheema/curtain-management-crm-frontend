'use client';

import { Download, Plus, Search, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PRODUCT_CATEGORY_LABELS, PRODUCT_UNITS } from '../utils';
import type { ProductCategory, ProductFilters } from '../types';

interface ProductToolbarProps {
  filters: ProductFilters;
  onChange: (patch: Partial<ProductFilters>) => void;
  onClear: () => void;
  onAddProduct: () => void;
}

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  ...(Object.entries(PRODUCT_CATEGORY_LABELS) as [ProductCategory, string][]).map(
    ([value, label]) => ({ value, label })
  ),
];

function ProductToolbar({
  filters,
  onChange,
  onClear,
  onAddProduct,
}: ProductToolbarProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.unit !== 'all' ||
    filters.status !== 'all';

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full min-w-0 flex-1 md:max-w-sm">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Search products by name, code..."
          className="h-9 pl-9"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:contents">
      <FilterSelect
        value={filters.category}
        placeholder="All Categories"
        options={CATEGORY_OPTIONS}
        onChange={(value) =>
          onChange({
            category: value,
            tab: value === 'all' ? 'all' : (value as ProductCategory),
          })
        }
      />
      <FilterSelect
        value={filters.unit}
        placeholder="All Units"
        options={[
          { value: 'all', label: 'All Units' },
          ...PRODUCT_UNITS.map((unit) => ({ value: unit, label: unit })),
        ]}
        onChange={(value) => onChange({ unit: value })}
      />
      <FilterSelect
        value={filters.status}
        placeholder="All Status"
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
        onChange={(value) => onChange({ status: value })}
      />
      </div>

      {hasActiveFilters && (
        <Button variant="link" size="sm" className="h-9 px-1" onClick={onClear}>
          Clear Filters
        </Button>
      )}

      <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-9 flex-1 sm:flex-none"
          onClick={() => toast.success('Products imported')}
        >
          <Upload className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Import</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 flex-1 sm:flex-none"
          onClick={() => toast.success('Products exported')}
        >
          <Download className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button size="sm" className="h-9 flex-1 sm:flex-none" onClick={onAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({
  value,
  placeholder,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger className="h-9 w-full sm:w-[150px]">
        <SelectValue placeholder={placeholder}>
          {options.find((option) => option.value === value)?.label ?? placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { ProductToolbar };
