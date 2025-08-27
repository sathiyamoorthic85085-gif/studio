"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, setAuthToken, isAuthenticated } from '@/lib/auth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Your authentication logic here
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
