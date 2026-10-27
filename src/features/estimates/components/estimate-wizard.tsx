'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  ChevronDown,
  Eye,
  Save,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CustomerDetailsStep } from './customer-details-step';
import { CustomerDetailsStrip } from './customer-details-strip';
import { EstimateItemsStep } from './estimate-items-step';
import { EstimateStepper } from './estimate-stepper';
import { EstimateSummary } from './estimate-summary';
import { EstimateTotalsCard } from './estimate-totals-card';
import { MeasurementsStep } from './measurements-step';
import { ReviewStep } from './review-step';
import { useEstimateBuilder } from '../hooks/use-estimate-builder';
import { ESTIMATE_STEPS } from '../mock/estimates.mock';
import { formatInrWithSymbol } from '../utils';
import type { EstimateDraft } from '../types';

interface EstimateWizardProps {
  initialDraft: EstimateDraft;
}

function EstimateWizard({ initialDraft }: EstimateWizardProps) {
  const builder = useEstimateBuilder(initialDraft);
  const { draft, totals, currentStep, stepIndex, isFirstStep, isLastStep } =
    builder;

  const nextStepLabel = ESTIMATE_STEPS[stepIndex + 1]?.shortLabel;
  const previousStepLabel = ESTIMATE_STEPS[stepIndex - 1]?.shortLabel;
  const showDesktopSummary =
    currentStep === 'items' || currentStep === 'review';

  const handleSaveDraft = () => {
    toast.success(`Estimate ${draft.customer.estimateNumber} saved as draft`);
  };

  const handleSend = () => {
    toast.success(
      `Estimate ${draft.customer.estimateNumber} sent to ${draft.customer.customerName}`
    );
  };

  return (
    <div className="space-y-6 pb-36 lg:pb-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Back to estimates"
          render={<Link href="/quotations" />}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">New Estimate</h1>
      </div>

      <Card>
        <CardContent>
          <EstimateStepper
            currentStep={currentStep}
            onStepChange={builder.goToStep}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1 space-y-6">
          {currentStep === 'customer' && (
            <CustomerDetailsStep
              customer={draft.customer}
              onChange={builder.updateCustomer}
            />
          )}

          {currentStep === 'measurements' && (
            <MeasurementsStep builder={builder} />
          )}

          {currentStep === 'items' && (
            <>
              <div className="hidden lg:block">
                <CustomerDetailsStrip customer={draft.customer} />
              </div>
              <EstimateItemsStep builder={builder} />
              <div className="xl:hidden">
                <EstimateTotalsCard draft={draft} totals={totals} />
              </div>
            </>
          )}

          {currentStep === 'review' && (
            <ReviewStep draft={draft} totals={totals} />
          )}
        </div>

        {showDesktopSummary && (
          <aside className="hidden w-[340px] shrink-0 xl:block">
            <div className="xl:sticky xl:top-20">
              <EstimateSummary
                draft={draft}
                totals={totals}
                onDiscountChange={builder.setDiscountPercent}
                onApplyGstChange={builder.setApplyGst}
                onNotesChange={builder.setNotes}
                onTermsChange={builder.setTerms}
              />
            </div>
          </aside>
        )}
      </div>

      <div className="hidden items-center justify-between gap-3 lg:flex">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            variant="outline"
            onClick={() => builder.goToStep('review')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview Estimate
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {!isFirstStep && (
            <Button variant="outline" onClick={builder.goBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {isLastStep ? (
            <Button onClick={handleSend}>
              <Send className="mr-2 h-4 w-4" />
              Send to Customer
            </Button>
          ) : (
            <Button onClick={builder.goNext}>
              Next{nextStepLabel ? `: ${nextStepLabel}` : ''}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 space-y-2 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
        {currentStep === 'measurements' && (
          <Card className="py-3">
            <CardContent className="flex items-center justify-between px-4 py-0">
              <div className="flex items-center gap-2 text-sm">
                <BedDouble className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Rooms</span>
                <span className="font-semibold">{draft.rooms.length}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">Estimated Total</span>
                <span className="font-semibold">
                  {formatInrWithSymbol(totals.grandTotal, false)}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-2">
          {currentStep === 'items' ? (
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          ) : (
            !isFirstStep && (
              <Button
                variant="outline"
                onClick={builder.goBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back{previousStepLabel ? `: ${previousStepLabel}` : ''}
              </Button>
            )
          )}

          {isLastStep ? (
            <Button onClick={handleSend} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          ) : (
            <Button onClick={builder.goNext} className="flex-1">
              Next{nextStepLabel ? `: ${nextStepLabel}` : ''}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export { EstimateWizard };
