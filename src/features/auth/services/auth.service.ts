import type { User, LoginCredentials, RegisterData } from '../types';
import { mockUsers } from '../mock/users.mock';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(800);

    const user = mockUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async register(data: RegisterData): Promise<User> {
    await delay(800);

    const existingUser = mockUsers.find((u) => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: data.email,
      name: data.name,
      role: 'staff',
    };

    return newUser;
  }

  async logout(): Promise<void> {
    await delay(300);
  }

  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    return null;
  }
}

export const authService = new AuthService();
