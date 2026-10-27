'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { RecentActivity } from '../types';

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Recent Activities</CardTitle>
        <Link href="/activities" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-4 py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{activity.icon}</span>
                <p className="text-sm text-muted-foreground">{activity.message}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { RecentActivities };
