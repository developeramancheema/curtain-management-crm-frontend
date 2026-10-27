'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ListCardProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

function ListCard({ children, selected, onClick, className }: ListCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-lg border p-3 text-left transition-colors',
        selected ? 'border-primary bg-primary/5' : 'border-border',
        onClick && 'cursor-pointer hover:border-primary/40',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export { ListCard };
