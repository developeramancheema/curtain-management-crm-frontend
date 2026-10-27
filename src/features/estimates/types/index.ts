export type EstimateStatus =
  | 'draft'
  | 'sent'
  | 'viewed'
  | 'approved'
  | 'rejected'
  | 'expired';

export type EstimateUnit = 'Mtr' | 'Feet' | 'Pcs' | 'Nos' | 'Sqft';

export type EstimateStepId =
  | 'customer'
  | 'measurements'
  | 'items'
  | 'review';

export interface EstimateStep {
  readonly id: EstimateStepId;
  readonly label: string;
  readonly shortLabel: string;
}

export interface EstimateCustomerDetails {
  customerId: string;
  customerName: string;
  phone: string;
  siteAddress: string;
  estimateNumber: string;
  estimateDate: string;
}

/**
 * A single window/opening measured inside a room. A room can hold several of
 * these when windows differ in size (e.g. "L-122.5 / CH-50 (3 Parday)").
 */
export interface RoomMeasurement {
  id: string;
  windowName: string;
  width: number;
  height: number;
  plainPanels: number;
  netPanels: number;
  fabricPerPanel: number;
  blackoutBack: boolean;
  channelLength: number;
  stitchingPieces: number;
  notes: string;
}

export interface EstimateItem {
  id: string;
  description: string;
  /** Human readable breakdown shown next to the qty, e.g. "8 × 3.5". */
  measurementNote: string;
  quantity: number;
  unit: EstimateUnit;
  rate: number;
}

export interface EstimateRoom {
  id: string;
  name: string;
  measurements: RoomMeasurement[];
  items: EstimateItem[];
}

export interface EstimateTotals {
  totalBeforeDiscount: number;
  discountAmount: number;
  taxableAmount: number;
  cgst: number;
  sgst: number;
  taxAmount: number;
  grandTotal: number;
}

export interface EstimateDraft {
  customer: EstimateCustomerDetails;
  rooms: EstimateRoom[];
  discountPercent: number;
  applyGst: boolean;
  gstRate: number;
  notes: string;
  terms: string[];
}

export interface EstimateListItem {
  id: string;
  estimateNumber: string;
  customerName: string;
  siteAddress: string;
  roomCount: number;
  total: number;
  status: EstimateStatus;
  estimateDate: string;
  validUntil: string;
}

export interface EstimateStats {
  totalEstimates: number;
  totalEstimatesGrowth: number;
  pendingApproval: number;
  approvedValue: number;
  conversionRate: number;
}
