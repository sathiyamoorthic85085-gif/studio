import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, setAuthToken, isAuthenticated } from '@/lib/auth';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = getAuthToken();
    if (token && isAuthenticated()) {
      setAuthToken(token); // Set axios header
    } else if (!isAuthenticated() && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      {/* Your layout code */}
      {children}
    </div>
  );
};

export default Layout;
