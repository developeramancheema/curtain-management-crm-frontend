'use client';

import type { LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FieldTone = 'neutral' | 'blue' | 'green' | 'amber' | 'rose' | 'violet';

const toneStyles: Record<FieldTone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400',
  green:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400',
  violet:
    'bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400',
};

interface MeasurementFieldProps {
  id: string;
  icon: LucideIcon;
  label: string;
  unit?: string;
  tone?: FieldTone;
  children?: React.ReactNode;
  value?: string | number;
  onValueChange?: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  step?: string;
}

function MeasurementField({
  id,
  icon: Icon,
  label,
  unit,
  tone = 'neutral',
  children,
  value,
  onValueChange,
  type = 'text',
  placeholder,
  step,
}: MeasurementFieldProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          toneStyles[tone]
        )}
      >
        <Icon className="h-4 w-4" />
      </span>

      <Label
        htmlFor={id}
        className="w-32 shrink-0 text-sm font-normal text-muted-foreground"
      >
        {label}
      </Label>

      {children ?? (
        <div className="relative flex-1">
          <Input
            id={id}
            type={type}
            inputMode={type === 'number' ? 'decimal' : undefined}
            step={step}
            min={type === 'number' ? 0 : undefined}
            value={value ?? ''}
            placeholder={placeholder}
            onChange={(event) => onValueChange?.(event.target.value)}
            className={cn(unit && 'pr-16')}
          />
          {unit && (
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { MeasurementField };
