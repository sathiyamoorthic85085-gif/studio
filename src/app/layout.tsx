"use client"; // Add this directive at the top

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router'
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
