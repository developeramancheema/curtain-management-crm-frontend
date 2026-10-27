'use client';

import Image from 'next/image';
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
      <SidebarHeader className="h-16 justify-center px-4 group-data-[collapsible=icon]:px-2">
        <Link href="/dashboard" className="flex h-full w-full items-center">
          <Image
            src="/kk-carpet-logo.png"
            alt="KK Carpets"
            width={400}
            height={242}
            priority
            className="h-10 w-auto object-contain group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:w-full"
          />
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
