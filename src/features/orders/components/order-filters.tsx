'use client';

import type { ReactNode } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ORDER_STAGES, mockInstallers, mockTailors } from '../mock/orders.mock';
import type { OrderFilters } from '../types';

interface OrderBoardFiltersProps {
  filters: OrderFilters;
  onChange: (patch: Partial<OrderFilters>) => void;
  onClear: () => void;
}

const DEFAULT_FILTERS: OrderFilters = {
  stage: 'all',
  tailor: 'all',
  installer: 'all',
  date: 'this-week',
  priority: 'all',
};

function OrderBoardFilters({
  filters,
  onChange,
  onClear,
}: OrderBoardFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
      <FilterSelect
        value={filters.stage}
        placeholder="All Stages"
        onChange={(value) => onChange({ stage: value })}
        options={[
          { value: 'all', label: 'All Stages' },
          ...ORDER_STAGES.map((stage) => ({
            value: stage.id,
            label: stage.label,
          })),
        ]}
      />
      <FilterSelect
        value={filters.tailor}
        placeholder="Tailor"
        onChange={(value) => onChange({ tailor: value })}
        options={[
          { value: 'all', label: 'All Tailors' },
          ...mockTailors.map((tailor) => ({
            value: tailor.id,
            label: tailor.name,
          })),
        ]}
      />
      <FilterSelect
        value={filters.installer}
        placeholder="Installer"
        onChange={(value) => onChange({ installer: value })}
        options={[
          { value: 'all', label: 'All Installers' },
          ...mockInstallers.map((installer) => ({
            value: installer.id,
            label: installer.name,
          })),
        ]}
      />
      <FilterSelect
        value={filters.date}
        placeholder="Date"
        onChange={(value) => onChange({ date: value })}
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        options={[
          { value: 'this-week', label: 'This Week' },
          { value: 'this-month', label: 'This Month' },
          { value: 'all', label: 'All Dates' },
        ]}
      />
      <FilterSelect
        value={filters.priority}
        placeholder="Priority"
        onChange={(value) => onChange({ priority: value })}
        options={[
          { value: 'all', label: 'All Priorities' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]}
      />
      <Button
        variant="link"
        size="sm"
        onClick={onClear}
        className="col-span-2 h-9 px-1 sm:col-auto"
      >
        Clear All
      </Button>
    </div>
  );
}

interface FilterSelectProps {
  value: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}

function FilterSelect({
  value,
  placeholder,
  options,
  onChange,
  icon,
}: FilterSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger className="h-9 w-full sm:w-[168px]">
        {icon}
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

export { OrderBoardFilters, DEFAULT_FILTERS };
