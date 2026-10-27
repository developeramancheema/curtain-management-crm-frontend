'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ESTIMATE_STEPS } from '../mock/estimates.mock';
import type { EstimateStepId } from '../types';

interface EstimateStepperProps {
  currentStep: EstimateStepId;
  onStepChange: (step: EstimateStepId) => void;
}

function EstimateStepper({ currentStep, onStepChange }: EstimateStepperProps) {
  const activeIndex = ESTIMATE_STEPS.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <nav aria-label="Estimate progress">
      <ol className="flex items-center">
        {ESTIMATE_STEPS.map((step, index) => {
          const isComplete = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isLast = index === ESTIMATE_STEPS.length - 1;

          return (
            <li
              key={step.id}
              className={cn('flex items-center', !isLast && 'flex-1')}
            >
              <button
                type="button"
                onClick={() => onStepChange(step.id)}
                aria-current={isCurrent ? 'step' : undefined}
                className="flex shrink-0 flex-col items-center gap-1.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:gap-2"
              >
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                    isComplete && 'border-primary bg-primary text-primary-foreground',
                    isCurrent && 'border-primary bg-primary text-primary-foreground',
                    !isComplete &&
                      !isCurrent &&
                      'border-border bg-background text-muted-foreground'
                  )}
                >
                  {isComplete ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap sm:text-sm',
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.shortLabel}</span>
                </span>
              </button>

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'mx-2 h-px flex-1 sm:mx-4',
                    isComplete ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { EstimateStepper };
