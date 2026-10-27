'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  EstimateStatsCards,
  EstimateTable,
  mockEstimateStats,
  mockEstimates,
} from '@/features/estimates';

export default function EstimatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="hidden md:block">
          <h1 className="text-2xl font-semibold">Estimates</h1>
          <p className="text-sm text-muted-foreground">
            Create, send, and track customer estimates
          </p>
        </div>
        <Button className="w-full sm:w-auto" render={<Link href="/quotations/new" />}>
          <Plus className="mr-2 h-4 w-4" />
          New Estimate
        </Button>
      </div>

      <EstimateStatsCards stats={mockEstimateStats} />
      <EstimateTable estimates={mockEstimates} />
    </div>
  );
}
