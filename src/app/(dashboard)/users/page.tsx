'use client';

import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { UserTable, mockUsers } from '@/features/users';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage user accounts and permissions"
      >
        <Button className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </PageHeader>

      <UserTable users={mockUsers} />
    </div>
  );
}
