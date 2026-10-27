'use client';

import {
  StatsCards,
  WeeklySalesChart,
  PendingFollowups,
  TodayTasks,
  RecentEstimates,
  OrderStatusOverview,
  CustomerInsights,
  RecentActivities,
  mockDashboardStats,
  mockWeeklySales,
  mockPendingFollowups,
  mockTodayTasks,
  mockRecentEstimates,
  mockOrderStatusPipeline,
  mockCustomerInsightsData,
  mockRecentActivities,
} from '@/features/dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Row */}
      <StatsCards stats={mockDashboardStats} />

      {/* Main Content - 3 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Weekly Sales */}
        <WeeklySalesChart data={mockWeeklySales} />

        {/* Middle Column - Pending Followups */}
        <PendingFollowups followups={mockPendingFollowups} />

        {/* Right Column - Today's Tasks */}
        <TodayTasks tasks={mockTodayTasks} />
      </div>

      {/* Recent Estimates & Order Status - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Estimates Table */}
        <RecentEstimates estimates={mockRecentEstimates} />

        {/* Order Status & Customer Insights */}
        <div className="space-y-6">
          <OrderStatusOverview data={mockOrderStatusPipeline} />
          <CustomerInsights data={mockCustomerInsightsData} />
        </div>
      </div>

      {/* Recent Activities - Full Width */}
      <RecentActivities activities={mockRecentActivities} />
    </div>
  );
}
