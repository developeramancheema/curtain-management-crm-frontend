'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TASK_TYPE_LABELS, toDisplayTime } from '../utils';
import { mockAssignees, mockCustomers } from '../mock/tasks.mock';
import type { Task, TaskPriority, TaskType } from '../types';

interface QuickAddTaskProps {
  date: string;
  onAdd: (task: Task) => void;
}

interface QuickAddState {
  type: TaskType;
  customerName: string;
  date: string;
  time: string;
  assigneeId: string;
  priority: TaskPriority;
  notes: string;
}

function QuickAddTask({ date, onAdd }: QuickAddTaskProps) {
  const [form, setForm] = useState<QuickAddState>({
    type: 'measurement',
    customerName: mockCustomers[0],
    date,
    time: '10:00',
    assigneeId: mockAssignees[0].id,
    priority: 'medium',
    notes: '',
  });

  useEffect(() => {
    setForm((current) => ({ ...current, date }));
  }, [date]);

  const update = (patch: Partial<QuickAddState>) => {
    setForm((current) => ({ ...current, ...patch }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const assignee =
      mockAssignees.find((person) => person.id === form.assigneeId) ??
      mockAssignees[0];

    onAdd({
      id: `t-${Date.now()}`,
      title: TASK_TYPE_LABELS[form.type],
      detail: form.notes.trim() || form.customerName,
      type: form.type,
      priority: form.priority,
      assignee,
      date: form.date,
      startTime: toDisplayTime(form.time),
      completed: false,
      customerName: form.customerName,
    });
    toast.success('Task added');
    update({ notes: '', time: '10:00' });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Add Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Field label="Task Type">
              <TypeSelect
                value={form.type}
                onChange={(value) => update({ type: value as TaskType })}
              />
            </Field>
            <Field label="Customer / Project">
              <Select
                value={form.customerName}
                onValueChange={(value) => {
                  if (value) update({ customerName: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{form.customerName}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={form.date}
                onChange={(event) => update({ date: event.target.value })}
              />
            </Field>
            <Field label="Time">
              <Input
                type="time"
                value={form.time}
                onChange={(event) => update({ time: event.target.value })}
              />
            </Field>
            <Field label="Assign To">
              <Select
                value={form.assigneeId}
                onValueChange={(value) => {
                  if (value) update({ assigneeId: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {mockAssignees.find((person) => person.id === form.assigneeId)
                      ?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {mockAssignees.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Priority">
              <Select
                value={form.priority}
                onValueChange={(value) => {
                  if (value) update({ priority: value as TaskPriority });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="capitalize">{form.priority}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <Textarea
                  rows={1}
                  placeholder="Add notes..."
                  value={form.notes}
                  onChange={(event) => update({ notes: event.target.value })}
                />
              </Field>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Add Task</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function TypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue>{TASK_TYPE_LABELS[value as TaskType]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(TASK_TYPE_LABELS) as TaskType[]).map((type) => (
          <SelectItem key={type} value={type}>
            {TASK_TYPE_LABELS[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { QuickAddTask };
