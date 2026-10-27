import { EstimateWizard, mockEstimateDraft } from '@/features/estimates';

export const metadata = {
  title: 'New Estimate',
  description: 'Create a new customer estimate with rooms, measurements, and items',
};

export default function NewEstimatePage() {
  return <EstimateWizard initialDraft={mockEstimateDraft} />;
}
