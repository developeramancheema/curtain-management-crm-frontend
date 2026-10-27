'use client';

import { useState } from 'react';
import { Maximize2, Minimize2, PackageOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/feedback';
import { EstimateRoomItems } from './estimate-room-items';
import type { EstimateBuilder } from '../hooks/use-estimate-builder';

interface EstimateItemsStepProps {
  builder: EstimateBuilder;
}

function EstimateItemsStep({ builder }: EstimateItemsStepProps) {
  const { draft, addRoom, duplicateRoom, removeRoom } = builder;
  const [collapsedRoomIds, setCollapsedRoomIds] = useState<ReadonlySet<string>>(
    new Set()
  );

  const allCollapsed =
    draft.rooms.length > 0 && collapsedRoomIds.size === draft.rooms.length;

  const toggleRoom = (roomId: string) => {
    setCollapsedRoomIds((current) => {
      const next = new Set(current);
      if (next.has(roomId)) {
        next.delete(roomId);
      } else {
        next.add(roomId);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setCollapsedRoomIds(
      allCollapsed ? new Set() : new Set(draft.rooms.map((room) => room.id))
    );
  };

  const handleAddRoom = () => {
    const roomId = addRoom();
    setCollapsedRoomIds((current) => {
      const next = new Set(current);
      next.delete(roomId);
      return next;
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Rooms</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddRoom}
            className="text-primary"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add Room
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAll}
            disabled={draft.rooms.length === 0}
            className="hidden md:inline-flex"
          >
            {allCollapsed ? (
              <Maximize2 className="mr-1.5 h-4 w-4" />
            ) : (
              <Minimize2 className="mr-1.5 h-4 w-4" />
            )}
            {allCollapsed ? 'Expand All' : 'Collapse All'}
          </Button>
        </div>
      </div>

      {draft.rooms.length === 0 ? (
        <Card>
          <EmptyState
            icon={PackageOpen}
            title="No rooms to price yet"
            description="Add a room and its line items to build up the estimate total."
            action={{ label: 'Add Room', onClick: handleAddRoom }}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {draft.rooms.map((room, index) => (
            <EstimateRoomItems
              key={room.id}
              room={room}
              index={index}
              isExpanded={!collapsedRoomIds.has(room.id)}
              canRemove={draft.rooms.length > 1}
              onToggle={() => toggleRoom(room.id)}
              onDuplicate={() => duplicateRoom(room.id)}
              onRemove={() => removeRoom(room.id)}
              onAddItem={(preset) => builder.addItem(room.id, preset)}
              onItemChange={(itemId, patch) =>
                builder.updateItem(room.id, itemId, patch)
              }
              onItemRemove={(itemId) => builder.removeItem(room.id, itemId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { EstimateItemsStep };
