'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import type { UserRole } from '@/lib/types';
import {
  Bell,
  Book,
  Calendar,
  Home,
  LogOut,
  Mail,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AppSidebarProps = {
  userRole: UserRole;
};

const studentNav = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Timetable', href: '/timetable', icon: Calendar },
  { name: 'Assignments', href: '/assignments', icon: Book },
  { name: 'Leave Request', href: '/leave', icon: Mail },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

const adminNav = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Timetable', href: '/timetable', icon: Calendar },
  { name: 'Assignments', href: '/assignments', icon: Book },
  { name: 'Leave Requests', href: '/leave', icon: Mail },
];

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname();
  const navItems = userRole === 'student' ? studentNav : adminNav;

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
                <Link href="/login">
                  <LogOut />
                  <span>Logout</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
