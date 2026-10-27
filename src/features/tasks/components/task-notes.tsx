'use client';

import { StickyNote } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TaskNote } from '../types';

interface TaskNotesProps {
  notes: TaskNote[];
}

function TaskNotes({ notes }: TaskNotesProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Notes & Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="flex gap-3 rounded-lg border p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <StickyNote className="h-4 w-4 text-muted-foreground" />
            </span>
            <div className="min-w-0">
              <p className="text-sm">{note.text}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Added by {note.addedBy} • {note.timestamp}
              </p>
            </div>
          </div>
        ))}
        <Button
          variant="link"
          className="h-auto px-0"
          onClick={() => toast.message('All notes will be available later')}
        >
          View All Notes
        </Button>
      </CardContent>
    </Card>
  );
}

export { TaskNotes };
