import type { User } from '@/lib/types';

// This is a mock function. In a real app, you would get this from your auth provider.
export async function getCurrentUser(): Promise<User | null> {
  // You can change the role here to test different user views
  // Possible roles: 'student', 'advisor', 'hod'
  const role = 'hod'; 

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
  
  return {
    id: 'user-hod-01',
    name: 'Dr. Admin',
    email: 'admin@university.edu',
    role: 'hod',
    avatarUrl: 'https://i.pravatar.cc/150?u=hod'
  };
}
