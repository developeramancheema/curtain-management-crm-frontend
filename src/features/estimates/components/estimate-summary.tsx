'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  amountToWords,
  formatInrWithSymbol,
  parseNumber,
} from '../utils';
import type { EstimateDraft, EstimateTotals } from '../types';

const NOTES_MAX_LENGTH = 500;

interface EstimateSummaryProps {
  draft: EstimateDraft;
  totals: EstimateTotals;
  onDiscountChange: (percent: number) => void;
  onApplyGstChange: (applyGst: boolean) => void;
  onNotesChange: (notes: string) => void;
  onTermsChange: (terms: string[]) => void;
}

function EstimateSummary({
  draft,
  totals,
  onDiscountChange,
  onApplyGstChange,
  onNotesChange,
  onTermsChange,
}: EstimateSummaryProps) {
  const [termsDraft, setTermsDraft] = useState<string | null>(null);
  const halfGstRate = draft.gstRate / 2;

  const saveTerms = () => {
    if (termsDraft !== null) {
      onTermsChange(
        termsDraft
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
      );
    }
    setTermsDraft(null);
  };

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="text-base">Estimate Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SummaryRow
          label="Total (Before Discount)"
          value={formatInrWithSymbol(totals.totalBeforeDiscount)}
        />

        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="estimate-discount" className="font-normal">
            Discount
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative w-24">
              <Input
                id="estimate-discount"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step="0.01"
                value={draft.discountPercent || ''}
                placeholder="0.00"
                onChange={(event) =>
                  onDiscountChange(parseNumber(event.target.value))
                }
                className="h-8 pr-7 text-right"
              />
              <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-muted-foreground">
                %
              </span>
            </div>
            <span className="w-20 text-right text-sm text-muted-foreground">
              {formatInrWithSymbol(totals.discountAmount)}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="estimate-gst" className="font-normal">
            Apply GST ({draft.gstRate}%)
          </Label>
          <Switch
            id="estimate-gst"
            checked={draft.applyGst}
            onCheckedChange={onApplyGstChange}
          />
        </div>

        {draft.applyGst && (
          <div className="space-y-3">
            <SummaryRow
              label="Taxable Amount"
              value={formatInrWithSymbol(totals.taxableAmount)}
            />
            <SummaryRow
              label={`CGST (${halfGstRate}%)`}
              value={formatInrWithSymbol(totals.cgst)}
            />
            <SummaryRow
              label={`SGST (${halfGstRate}%)`}
              value={formatInrWithSymbol(totals.sgst)}
            />
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-sm font-semibold">Grand Total</span>
            <span className="text-xl font-bold">
              {formatInrWithSymbol(totals.grandTotal)}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {amountToWords(totals.grandTotal)}
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="estimate-notes" className="font-normal">
              Notes
            </Label>
            <span className="text-xs text-muted-foreground">
              {draft.notes.length} / {NOTES_MAX_LENGTH}
            </span>
          </div>
          <Textarea
            id="estimate-notes"
            value={draft.notes}
            maxLength={NOTES_MAX_LENGTH}
            placeholder="Add any notes for internal use..."
            onChange={(event) => onNotesChange(event.target.value)}
            className="min-h-24 resize-none"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">
            Terms &amp; Conditions{' '}
            <span className="font-normal text-muted-foreground">
              (for customer)
            </span>
          </h3>

          {termsDraft === null ? (
            <>
              <ol className="list-decimal space-y-1.5 pl-4 text-xs leading-relaxed text-muted-foreground">
                {draft.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ol>
              <Button
                variant="link"
                size="sm"
                onClick={() => setTermsDraft(draft.terms.join('\n'))}
                className="h-auto p-0 text-xs"
              >
                Edit Terms
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Textarea
                aria-label="Terms and conditions"
                value={termsDraft}
                onChange={(event) => setTermsDraft(event.target.value)}
                placeholder="One term per line"
                className="min-h-28 text-xs"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveTerms}>
                  Save Terms
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTermsDraft(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export { EstimateSummary };
