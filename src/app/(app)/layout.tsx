import { getCurrentUser } from '@/lib/auth';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { UserNav } from '@/components/user-nav';
import { redirect } from 'next/navigation';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar userRole={user.role} />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md sm:px-8">
              <SidebarTrigger className="md:hidden" />
              <div className="hidden font-headline text-xl font-bold md:block">
                  Welcome, {user.name.split(' ')[0]}!
              </div>
            <UserNav user={user} />
          </header>
          <main className="flex-1 p-4 sm:p-8">
            <SidebarInset>{children}</SidebarInset>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
