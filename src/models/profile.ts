export interface Profile {
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'parent';
    userId: string;
    schoolId: string;
    isParent?: boolean;
    isTeacher?: boolean;
    isAdmin?: boolean;
  }
  