'use client';

import type { ReactNode } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsBelowLg } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ResponsiveDetailProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function ResponsiveDetail({
  open,
  onClose,
  children,
  className,
}: ResponsiveDetailProps) {
  const isBelowLg = useIsBelowLg();

  if (!open) {
    return null;
  }

  if (isBelowLg) {
    return (
      <Sheet
        open
        onOpenChange={(next) => {
          if (!next) onClose();
        }}
      >
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 overflow-y-auto p-4 sm:max-w-md"
        >
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return <div className={cn('hidden min-w-0 lg:block', className)}>{children}</div>;
}

export { ResponsiveDetail };
