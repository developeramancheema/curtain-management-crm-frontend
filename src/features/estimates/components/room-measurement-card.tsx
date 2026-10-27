'use client';

import {
  ChevronDown,
  FileText,
  Grid3x3,
  Home,
  Layers,
  MoveHorizontal,
  MoveVertical,
  PanelTop,
  Plus,
  Ruler,
  Scissors,
  Sun,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { MeasurementField } from './measurement-field';
import { describeRoomMeasurements, parseNumber } from '../utils';
import type { EstimateRoom, RoomMeasurement } from '../types';

interface RoomMeasurementCardProps {
  room: EstimateRoom;
  index: number;
  isExpanded: boolean;
  canRemove: boolean;
  onToggle: () => void;
  onRoomNameChange: (name: string) => void;
  onRemoveRoom: () => void;
  onAddMeasurement: () => void;
  onMeasurementChange: (
    measurementId: string,
    patch: Partial<Omit<RoomMeasurement, 'id'>>
  ) => void;
  onRemoveMeasurement: (measurementId: string) => void;
}

function RoomMeasurementCard({
  room,
  index,
  isExpanded,
  canRemove,
  onToggle,
  onRoomNameChange,
  onRemoveRoom,
  onAddMeasurement,
  onMeasurementChange,
  onRemoveMeasurement,
}: RoomMeasurementCardProps) {
  const bodyId = `room-measurement-body-${room.id}`;

  return (
    <Card className="overflow-hidden py-0">
      <div className="flex items-center gap-3 p-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {index + 1}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="min-w-0">
            <span className="block truncate font-medium">
              {room.name || 'Untitled Room'}
            </span>
            {isExpanded && (
              <span className="block truncate text-xs text-muted-foreground">
                {describeRoomMeasurements(room)}
              </span>
            )}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        </button>

        {canRemove && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onRemoveRoom}
            aria-label={`Remove ${room.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div id={bodyId} className="space-y-4 border-t px-4 pt-4 pb-4">
          <MeasurementField
            id={`${room.id}-name`}
            icon={Home}
            label="Room Name"
            tone="blue"
            value={room.name}
            onValueChange={onRoomNameChange}
            placeholder="e.g. Master Bedroom"
          />

          {room.measurements.map((measurement, measurementIndex) => (
            <div key={measurement.id} className="space-y-4">
              {room.measurements.length > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {measurement.windowName || `Window ${measurementIndex + 1}`}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveMeasurement(measurement.id)}
                    className="h-7 text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              )}

              <MeasurementField
                id={`${measurement.id}-width`}
                icon={MoveHorizontal}
                label="Width (L)"
                unit="Inch"
                tone="violet"
                type="number"
                step="0.5"
                value={measurement.width || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    width: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-height`}
                icon={MoveVertical}
                label="Height (CH)"
                unit="Inch"
                tone="violet"
                type="number"
                step="0.5"
                value={measurement.height || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    height: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-plain`}
                icon={PanelTop}
                label="Plain Curtain Panels"
                unit="Panels"
                tone="blue"
                type="number"
                value={measurement.plainPanels || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    plainPanels: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-net`}
                icon={Grid3x3}
                label="Net Curtain Panels"
                unit="Panels"
                tone="green"
                type="number"
                value={measurement.netPanels || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    netPanels: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-fabric`}
                icon={Layers}
                label="Fabric per Panel"
                unit="Mtr"
                tone="rose"
                type="number"
                step="0.1"
                value={measurement.fabricPerPanel || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    fabricPerPanel: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-blackout`}
                icon={Sun}
                label="Blackout Back"
                tone="amber"
              >
                <div className="flex flex-1 justify-end">
                  <Switch
                    id={`${measurement.id}-blackout`}
                    checked={measurement.blackoutBack}
                    onCheckedChange={(checked) =>
                      onMeasurementChange(measurement.id, {
                        blackoutBack: checked,
                      })
                    }
                  />
                </div>
              </MeasurementField>

              <MeasurementField
                id={`${measurement.id}-channel`}
                icon={Ruler}
                label="Channel Length"
                unit="Feet"
                tone="blue"
                type="number"
                step="0.1"
                value={measurement.channelLength || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    channelLength: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-stitching`}
                icon={Scissors}
                label="Stitching Pieces"
                unit="Pieces"
                tone="rose"
                type="number"
                value={measurement.stitchingPieces || ''}
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, {
                    stitchingPieces: parseNumber(value),
                  })
                }
              />

              <MeasurementField
                id={`${measurement.id}-notes`}
                icon={FileText}
                label="Notes"
                tone="neutral"
                value={measurement.notes}
                placeholder="Optional note for this window"
                onValueChange={(value) =>
                  onMeasurementChange(measurement.id, { notes: value })
                }
              />

              {measurementIndex < room.measurements.length - 1 && <Separator />}
            </div>
          ))}

          <Button
            variant="outline"
            onClick={onAddMeasurement}
            className="w-full border-dashed"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Window / Measurement
          </Button>
        </div>
      )}
    </Card>
  );
}

export { RoomMeasurementCard };
