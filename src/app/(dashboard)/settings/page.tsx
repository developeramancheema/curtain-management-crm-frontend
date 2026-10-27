'use client';

import { PageHeader } from '@/components/common';
import {
  CompanySettings,
  NotificationSettings,
  AppearanceSettings,
  LocalizationSettings,
} from '@/features/settings';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your application settings"
      />

      <div className="space-y-6">
        <CompanySettings />
        <AppearanceSettings />
        <NotificationSettings />
        <LocalizationSettings />
      </div>
    </div>
  );
}
