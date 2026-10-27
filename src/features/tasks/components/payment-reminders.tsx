'use client';

import Link from 'next/link';
import { Calendar, MessageCircle, MoreVertical, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatInr } from '../utils';
import type { PaymentReminder } from '../types';

interface PaymentRemindersProps {
  reminders: PaymentReminder[];
}

function PaymentReminders({ reminders }: PaymentRemindersProps) {
  const totalPending = reminders.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Payment Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Customer / Project</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Pending Amount</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {item.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{item.customerName}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.project}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.invoiceNumber}</TableCell>
                  <TableCell>
                    <p>{item.dueDate}</p>
                    <p
                      className={
                        item.overdue
                          ? 'text-xs text-destructive'
                          : 'text-xs text-muted-foreground'
                      }
                    >
                      {item.dueLabel}
                    </p>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatInr(item.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Call ${item.customerName}`}
                        onClick={() => toast.success(`Calling ${item.customerName}`)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`WhatsApp ${item.customerName}`}
                        onClick={() =>
                          toast.success(`WhatsApp opened for ${item.customerName}`)
                        }
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Schedule follow-up"
                        onClick={() => toast.message('Follow-up scheduled')}
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" aria-label="More actions">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t pt-3 text-sm">
          <p>
            Total Pending{' '}
            <span className="font-semibold">{formatInr(totalPending)}</span>
          </p>
          <Button variant="link" className="h-auto p-0" render={<Link href="/payments" />}>
            View All Reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { PaymentReminders };
