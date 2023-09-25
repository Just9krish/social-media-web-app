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

export interface Dhaga {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  image?: string;
  user: User;
}
