'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  amountToWords,
  describeRoomMeasurements,
  formatInr,
  formatInrWithSymbol,
  getItemAmount,
  getRoomSubtotal,
} from '../utils';
import type { EstimateDraft, EstimateTotals } from '../types';

interface ReviewStepProps {
  draft: EstimateDraft;
  totals: EstimateTotals;
}

function ReviewStep({ draft, totals }: ReviewStepProps) {
  const halfGstRate = draft.gstRate / 2;

  return (
    <Card>
      <CardContent className="space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Estimate Preview</h2>
            <p className="text-sm text-muted-foreground">
              This is what your customer will receive.
            </p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-semibold">{draft.customer.estimateNumber}</p>
            <p className="text-muted-foreground">
              {formatEstimateDate(draft.customer.estimateDate)}
            </p>
          </div>
        </header>

        <Separator />

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Billed To
            </dt>
            <dd className="mt-1 font-medium">{draft.customer.customerName}</dd>
            <dd className="text-sm text-muted-foreground">
              {draft.customer.phone}
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">
              Site / Address
            </dt>
            <dd className="mt-1 text-sm">{draft.customer.siteAddress}</dd>
          </div>
        </dl>

        <Separator />

        <div className="space-y-6">
          {draft.rooms.map((room, index) => (
            <section key={room.id} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  {index + 1}. {room.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {describeRoomMeasurements(room)}
                  </span>
                </h3>
                <span className="text-sm font-semibold">
                  {formatInrWithSymbol(getRoomSubtotal(room))}
                </span>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="text-right">Rate (₹)</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {room.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.description}
                          {item.measurementNote && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({item.measurementNote})
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.quantity}
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">
                          {formatInr(item.rate)}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatInr(getItemAmount(item))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          ))}
        </div>

        <Separator />

        <div className="ml-auto w-full max-w-sm space-y-2 text-sm">
          <PreviewRow
            label="Subtotal"
            value={formatInrWithSymbol(totals.totalBeforeDiscount)}
          />
          <PreviewRow
            label={`Discount (${draft.discountPercent}%)`}
            value={`− ${formatInrWithSymbol(totals.discountAmount)}`}
          />
          {draft.applyGst && (
            <>
              <PreviewRow
                label={`CGST (${halfGstRate}%)`}
                value={formatInrWithSymbol(totals.cgst)}
              />
              <PreviewRow
                label={`SGST (${halfGstRate}%)`}
                value={formatInrWithSymbol(totals.sgst)}
              />
            </>
          )}
          <Separator />
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Grand Total</span>
            <span className="text-lg font-bold">
              {formatInrWithSymbol(totals.grandTotal)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {amountToWords(totals.grandTotal)}
          </p>
        </div>

        {draft.notes && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold">Notes</h3>
              <p className="mt-1 text-sm whitespace-pre-line text-muted-foreground">
                {draft.notes}
              </p>
            </div>
          </>
        )}

        <Separator />

        <div>
          <h3 className="text-sm font-semibold">Terms &amp; Conditions</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
            {draft.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

interface PreviewRowProps {
  label: string;
  value: string;
}

function PreviewRow({ label, value }: PreviewRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatEstimateDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export { ReviewStep };
