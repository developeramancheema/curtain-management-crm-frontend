import type {
  EstimateItem,
  EstimateRoom,
  EstimateTotals,
  RoomMeasurement,
} from '../types';

export function getItemAmount(item: EstimateItem): number {
  return roundToPaise(item.quantity * item.rate);
}

export function getRoomSubtotal(room: EstimateRoom): number {
  return roundToPaise(
    room.items.reduce((sum, item) => sum + getItemAmount(item), 0)
  );
}

export function getRoomsTotal(rooms: EstimateRoom[]): number {
  return roundToPaise(
    rooms.reduce((sum, room) => sum + getRoomSubtotal(room), 0)
  );
}

interface TotalsInput {
  rooms: EstimateRoom[];
  discountPercent: number;
  applyGst: boolean;
  gstRate: number;
}

export function calculateEstimateTotals({
  rooms,
  discountPercent,
  applyGst,
  gstRate,
}: TotalsInput): EstimateTotals {
  const totalBeforeDiscount = getRoomsTotal(rooms);
  const discountAmount = roundToPaise(
    (totalBeforeDiscount * clampPercent(discountPercent)) / 100
  );
  const taxableAmount = roundToPaise(totalBeforeDiscount - discountAmount);

  // GST on intra-state supply splits evenly between CGST and SGST.
  const halfRate = applyGst ? gstRate / 2 : 0;
  const cgst = roundToPaise((taxableAmount * halfRate) / 100);
  const sgst = cgst;
  const taxAmount = roundToPaise(cgst + sgst);

  return {
    totalBeforeDiscount,
    discountAmount,
    taxableAmount,
    cgst,
    sgst,
    taxAmount,
    grandTotal: roundToPaise(taxableAmount + taxAmount),
  };
}

/**
 * Summarises a room's measurements the way the estimate header displays them,
 * e.g. "L-122.5, CH-149 | 8 Plain Parday, 8 Net Parday".
 */
export function describeRoomMeasurements(room: EstimateRoom): string {
  if (room.measurements.length === 0) return 'No measurements added';

  return room.measurements
    .map((measurement) => {
      const dimensions = `L-${measurement.width}, CH-${measurement.height}`;
      const panels = [
        measurement.plainPanels > 0
          ? `${measurement.plainPanels} Plain Parday`
          : null,
        measurement.netPanels > 0 ? `${measurement.netPanels} Net Parday` : null,
      ]
        .filter(Boolean)
        .join(', ');

      return panels ? `${dimensions} | ${panels}` : dimensions;
    })
    .join(' | ');
}

export function getTotalFabricMeters(measurement: RoomMeasurement): number {
  const panels = measurement.plainPanels + measurement.netPanels;
  return roundToPaise(panels * measurement.fabricPerPanel);
}

const RATE_PLAIN = 400;
const RATE_NET = 250;
const RATE_BLACKOUT = 250;
const RATE_CHANNEL = 130;
const RATE_STITCHING = 500;

/**
 * Turns captured room measurements into priced line items using the
 * standard rate card. Rooms that already have items are left untouched
 * by the caller.
 */
export function buildItemsFromMeasurements(
  measurements: RoomMeasurement[],
  nextId: (prefix: string) => string
): EstimateItem[] {
  const totals = measurements.reduce(
    (acc, measurement) => {
      const fabric = measurement.fabricPerPanel;
      acc.plainMeters += measurement.plainPanels * fabric;
      acc.netMeters += measurement.netPanels * fabric;
      if (measurement.blackoutBack) {
        acc.blackoutMeters += measurement.plainPanels * fabric;
      }
      acc.channelFeet += measurement.channelLength;
      acc.stitching += measurement.stitchingPieces;
      acc.plainPanels += measurement.plainPanels;
      acc.netPanels += measurement.netPanels;
      acc.fabricPerPanel = fabric || acc.fabricPerPanel;
      return acc;
    },
    {
      plainMeters: 0,
      netMeters: 0,
      blackoutMeters: 0,
      channelFeet: 0,
      stitching: 0,
      plainPanels: 0,
      netPanels: 0,
      fabricPerPanel: 3.5,
    }
  );

  const items: EstimateItem[] = [];

  if (totals.plainMeters > 0) {
    items.push({
      id: nextId('i'),
      description: 'Plain Curtain',
      measurementNote: `${totals.plainPanels} × ${totals.fabricPerPanel}`,
      quantity: roundToPaise(totals.plainMeters),
      unit: 'Mtr',
      rate: RATE_PLAIN,
    });
  }

  if (totals.netMeters > 0) {
    items.push({
      id: nextId('i'),
      description: 'Net Curtain',
      measurementNote: `${totals.netPanels} × ${totals.fabricPerPanel}`,
      quantity: roundToPaise(totals.netMeters),
      unit: 'Mtr',
      rate: RATE_NET,
    });
  }

  if (totals.blackoutMeters > 0) {
    items.push({
      id: nextId('i'),
      description: 'Blackout Back',
      measurementNote: '',
      quantity: roundToPaise(totals.blackoutMeters),
      unit: 'Mtr',
      rate: RATE_BLACKOUT,
    });
  }

  if (totals.channelFeet > 0) {
    items.push({
      id: nextId('i'),
      description: 'Channel',
      measurementNote: '',
      quantity: roundToPaise(totals.channelFeet),
      unit: 'Feet',
      rate: RATE_CHANNEL,
    });
  }

  if (totals.stitching > 0) {
    items.push({
      id: nextId('i'),
      description: 'Stitching (Sitting)',
      measurementNote: '',
      quantity: totals.stitching,
      unit: 'Pcs',
      rate: RATE_STITCHING,
    });
  }

  return items;
}

export function roundToPaise(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Turns a raw text input into a usable number, treating blanks as zero. */
export function parseNumber(value: string): number {
  if (value.trim() === '') return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 100);
}
