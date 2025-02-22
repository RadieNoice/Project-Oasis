export interface User {
  id: string;
  email: string;
  username: string;
  studyTime: number;
  createdAt: string;
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  subject: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
}

export interface StudyMaterial {
  id: string;
  userId: string;
  title: string;
  description: string;
  url: string;
  category: string;
  createdAt: string;
}

export interface Event {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high';
}