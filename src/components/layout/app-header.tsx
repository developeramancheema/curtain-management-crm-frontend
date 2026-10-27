'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Plus, Bell, HelpCircle, X } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { sidebarNavigation } from '@/config/navigation';
import { useAuthStore } from '@/stores';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith('/quotations/new')) return 'New Estimate';
  const match = sidebarNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return match?.title ?? 'Dashboard';
}

function AppHeader() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="shrink-0 border-b bg-background">
      <div className="flex h-14 items-center gap-2 px-3 sm:h-16 sm:gap-4 sm:px-4">
        <SidebarTrigger className="-ml-1" />
        <h1 className="min-w-0 truncate text-base font-semibold sm:text-lg">
          {title}
        </h1>

        <div className="mx-4 hidden max-w-md flex-1 md:block">
          <SearchField />
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            aria-label={mobileSearchOpen ? 'Close search' : 'Search'}
            onClick={() => setMobileSearchOpen((open) => !open)}
          >
            {mobileSearchOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
          <Button size="icon" className="h-9 w-9 rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 lg:inline-flex"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {user && (
            <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-sm">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t px-3 py-2 md:hidden">
          <SearchField />
        </div>
      )}
    </header>
  );
}

function SearchField() {
  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search customers, orders, invoices..."
        className="h-9 w-full bg-muted/50 pr-12 pl-9"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        ⌘K
      </kbd>
    </div>
  );
}

export { AppHeader };
