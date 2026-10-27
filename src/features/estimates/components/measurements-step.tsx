'use client';

import { useState } from 'react';
import { LayoutGrid, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/feedback';
import { RoomMeasurementCard } from './room-measurement-card';
import type { EstimateBuilder } from '../hooks/use-estimate-builder';

interface MeasurementsStepProps {
  builder: EstimateBuilder;
}

function MeasurementsStep({ builder }: MeasurementsStepProps) {
  const { draft, addRoom, updateRoom, removeRoom } = builder;
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(
    draft.rooms[0]?.id ?? null
  );

  const handleAddRoom = () => {
    setExpandedRoomId(addRoom());
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Rooms</h2>
        <Button variant="ghost" size="sm" onClick={handleAddRoom} className="text-primary">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Room
        </Button>
      </div>

      {draft.rooms.length === 0 ? (
        <Card>
          <EmptyState
            icon={LayoutGrid}
            title="No rooms added yet"
            description="Add a room to start capturing window measurements for this estimate."
            action={{ label: 'Add Room', onClick: handleAddRoom }}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {draft.rooms.map((room, index) => (
            <RoomMeasurementCard
              key={room.id}
              room={room}
              index={index}
              isExpanded={expandedRoomId === room.id}
              canRemove={draft.rooms.length > 1}
              onToggle={() =>
                setExpandedRoomId((current) =>
                  current === room.id ? null : room.id
                )
              }
              onRoomNameChange={(name) => updateRoom(room.id, { name })}
              onRemoveRoom={() => removeRoom(room.id)}
              onAddMeasurement={() => builder.addMeasurement(room.id)}
              onMeasurementChange={(measurementId, patch) =>
                builder.updateMeasurement(room.id, measurementId, patch)
              }
              onRemoveMeasurement={(measurementId) =>
                builder.removeMeasurement(room.id, measurementId)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { MeasurementsStep };
