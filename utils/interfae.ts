export interface AuthState {
  email: string;
  name?: string;
  username?: string;
  password: string;
  confirmPassword?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
}

export interface Comment {
  id: string;
  user: User;
  userId: string;
  thread: thread;
  threadId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface thread {
  id: string;
  user: User;
  userId: string;
  content: string;
  image?: string;
  commentCount: number;
  comment: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
}
