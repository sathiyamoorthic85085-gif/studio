'use server';

import type { User, UserRole } from '@/lib/types';
import { cookies } from 'next/headers';

const USER_COOKIE_KEY = 'user_role';

export async function setAuthCookie(role: UserRole) {
  cookies().set(USER_COOKIE_KEY, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function logout() {
  cookies().delete(USER_COOKIE_KEY);
}

// This is a mock function. In a real app, you would get this from your auth provider.
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const role = cookieStore.get(USER_COOKIE_KEY)?.value as UserRole | undefined;

  if (!role) {
    return null;
  }

  if (role === 'student') {
    return {
      id: 'user-student-01',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      role: 'student',
      avatarUrl: 'https://i.pravatar.cc/150?u=student'
    };
  }

  if (role === 'advisor') {
    return {
      id: 'user-advisor-01',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@university.edu',
      role: 'advisor',
      avatarUrl: 'https://i.pravatar.cc/150?u=advisor'
    };
  }
  
  if (role === 'hod') {
    return {
      id: 'user-hod-01',
      name: 'Dr. Admin',
      email: 'admin@esecdca.com',
      role: 'hod',
      avatarUrl: 'https://i.pravatar.cc/150?u=hod'
    };
  }

  return null;
}