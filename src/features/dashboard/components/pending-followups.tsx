'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { PendingFollowup } from '../types';

interface PendingFollowupsProps {
  followups: PendingFollowup[];
}

function PendingFollowups({ followups }: PendingFollowupsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Pending Payment Follow-ups
        </CardTitle>
        <Link
          href="/payments"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {followups.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.invoiceNumber} • {item.dueInfo}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-destructive">
                  ₹ {item.amount.toLocaleString('en-IN')}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { PendingFollowups };
