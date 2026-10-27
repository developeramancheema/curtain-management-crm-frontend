'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { sidebarNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { UserNav } from './user-nav';

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="h-16 px-4">
        <Link
          href="/dashboard"
          className="flex h-full items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-6 w-6 text-white"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6l2-2h12l2 2" />
              <path d="M8 10v6M12 10v6M16 10v6" />
            </svg>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="text-base font-semibold text-sidebar-foreground">
              Shree Curtains
            </div>
            <div className="text-xs text-sidebar-foreground/60">
              Drapery Studio
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {sidebarNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        'w-full',
                        isActive && 'font-medium'
                      )}
                    />
                  }
                  className={cn(
                    'h-10 gap-3 rounded-lg px-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                    isActive &&
                      'bg-sidebar-accent text-sidebar-foreground font-medium'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <UserNav />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export { AppSidebar };
