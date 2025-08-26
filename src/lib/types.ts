export type UserRole = 'student' | 'advisor' | 'hod';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};

export type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Late';
  course: string;
};

export type LeaveRequest = {
  id: string;
  studentName: string;
  studentId: string;
  dateFrom: string;
  dateTo: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

export type TimetableSlot = {
  day: string;
  time: string;
  subject: string;
  location: string;
};
