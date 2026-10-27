'use client';

import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { ReportsOverview, ReportsSummary } from '@/features/reports';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="View and generate business reports"
      >
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </PageHeader>

      <ReportsSummary />
      <ReportsOverview />
    </div>
  );
}
