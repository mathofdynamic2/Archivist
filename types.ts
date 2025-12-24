
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  authorId: string;
}

export type ViewType = 'landing' | 'signin' | 'signup' | 'dashboard';
