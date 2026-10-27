'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatInrWithSymbol } from '../utils';
import type { EstimateDraft, EstimateTotals } from '../types';

interface EstimateTotalsCardProps {
  draft: EstimateDraft;
  totals: EstimateTotals;
}

function EstimateTotalsCard({ draft, totals }: EstimateTotalsCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <TotalsRow
          label="Subtotal"
          value={formatInrWithSymbol(totals.totalBeforeDiscount)}
        />
        <TotalsRow
          label="Discount"
          value={formatInrWithSymbol(totals.discountAmount)}
        />
        <TotalsRow
          label={`GST (${draft.applyGst ? draft.gstRate : 0}%)`}
          value={formatInrWithSymbol(totals.taxAmount)}
        />
        <Separator />
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">Grand Total</span>
          <span className="text-lg font-bold">
            {formatInrWithSymbol(totals.grandTotal)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

interface TotalsRowProps {
  label: string;
  value: string;
}

function TotalsRow({ label, value }: TotalsRowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export { EstimateTotalsCard };
