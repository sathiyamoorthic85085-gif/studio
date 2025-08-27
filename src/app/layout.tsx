"use client"; // This must be the very first line

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, setAuthToken, isAuthenticated } from '@/lib/auth';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Your authentication logic here
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
