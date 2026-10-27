'use client';

import {
  ShoppingCart,
  CreditCard,
  FileText,
  UserPlus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Activity } from '../types';

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  order: ShoppingCart,
  payment: CreditCard,
  quotation: FileText,
  customer: UserPlus,
};

const activityColors = {
  order: 'bg-primary/10 text-primary',
  payment: 'bg-success/10 text-success',
  quotation: 'bg-warning/10 text-warning',
  customer: 'bg-info/10 text-info',
};

function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    activityColors[activity.type]
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { ActivityFeed };
