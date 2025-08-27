'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Pages that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password'];

export default function ClientLayoutWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      // If user is not authenticated and trying to access a protected route
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push('/login');
      }
      
      // If user is authenticated and trying to access auth pages
      if (isAuthenticated && publicPaths.includes(pathname)) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
