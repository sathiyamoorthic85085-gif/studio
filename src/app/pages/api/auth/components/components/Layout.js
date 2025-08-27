import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, isAuthenticated, getUserFromToken, logout } from '@/lib/auth';
import Header from './Header';

const Layout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      
      if (!token || !isAuthenticated()) {
        if (router.pathname !== '/login') {
          router.push('/login');
        }
        setLoading(false);
        return;
      }
      
      // Get user data from token
      const userData = await getUserFromToken(token);
      setUser(userData);
      
      // Redirect to login if not authenticated
      if (!userData && router.pathname !== '/login') {
        router.push('/login');
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (router.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
