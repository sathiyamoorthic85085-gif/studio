import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My App',
  description: 'Welcome to my application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}"use client"; // Add this directive at the top

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
