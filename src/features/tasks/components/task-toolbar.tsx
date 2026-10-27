'use client';

import { addDays, format, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_TYPE_LABELS } from '../utils';
import { mockAssignees, TASK_TODAY } from '../mock/tasks.mock';
import type { AgendaView, TaskFilters, TaskType } from '../types';

interface TaskToolbarProps {
  filters: TaskFilters;
  selectedDate: Date;
  view: AgendaView;
  onFiltersChange: (patch: Partial<TaskFilters>) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: AgendaView) => void;
}

function TaskToolbar({
  filters,
  selectedDate,
  view,
  onFiltersChange,
  onDateChange,
  onViewChange,
}: TaskToolbarProps) {
  const today = parseISO(TASK_TODAY);
  const dateLabel = isSameDay(selectedDate, today)
    ? `Today, ${format(selectedDate, 'dd MMM yyyy')}`
    : format(selectedDate, 'EEE, dd MMM yyyy');

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="grid grid-cols-2 gap-2 sm:contents">
      <FilterSelect
        value={filters.type}
        placeholder="Task Type"
        options={[
          { value: 'all', label: 'All Types' },
          ...(Object.entries(TASK_TYPE_LABELS) as [TaskType, string][]).map(
            ([value, label]) => ({ value, label })
          ),
        ]}
        onChange={(value) => onFiltersChange({ type: value })}
      />
      <FilterSelect
        value={filters.priority}
        placeholder="Priority"
        options={[
          { value: 'all', label: 'All Priorities' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' },
        ]}
        onChange={(value) => onFiltersChange({ priority: value })}
      />
      <FilterSelect
        value={filters.assignee}
        placeholder="Assigned To"
        options={[
          { value: 'all', label: 'All Assignees' },
          ...mockAssignees.map((person) => ({
            value: person.id,
            label: person.name,
          })),
        ]}
        onChange={(value) => onFiltersChange({ assignee: value })}
      />
      </div>

      <div className="flex w-full items-center rounded-lg border bg-background sm:w-auto">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Previous day"
          onClick={() => onDateChange(addDays(selectedDate, -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="min-w-0 flex-1 px-2 text-center text-sm font-medium sm:min-w-[10.5rem] sm:flex-none">
          {dateLabel}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Next day"
          onClick={() => onDateChange(addDays(selectedDate, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex w-full rounded-lg border p-0.5 sm:w-auto">
        {(['day', 'week', 'month'] as const).map((option) => (
          <Button
            key={option}
            variant={view === option ? 'default' : 'ghost'}
            size="sm"
            className="h-8 flex-1 capitalize sm:flex-none"
            onClick={() => onViewChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-9 w-full sm:ml-auto sm:w-auto"
        onClick={() =>
          toast.message('Use task type, priority, and assignee filters')
        }
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>
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

export { TaskToolbar };
