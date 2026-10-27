'use client';

import { cn } from '@/lib/utils';
import type { OrderTimelineEvent } from '../types';

interface OrderTimelineProps {
  events: OrderTimelineEvent[];
}

function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <ol className="relative space-y-4 border-l-2 border-border ml-1.5 pl-4">
      {events.map((event, index) => (
        <li key={event.id} className="relative">
          <span
            className={cn(
              'absolute top-1 -left-[1.31rem] h-2.5 w-2.5 rounded-full border-2 border-background',
              index === 0 ? 'bg-primary' : 'bg-muted-foreground/40'
            )}
          />
          <p className="text-sm font-medium">{event.title}</p>
          <p className="text-xs text-muted-foreground">{event.timestamp}</p>
          <p className="text-xs text-muted-foreground">by {event.actor}</p>
        </li>
      ))}
    </ol>
  );
}

export { OrderTimeline };
