import type { User } from '../types';

export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@curtainshop.com',
    password: 'admin123',
    name: 'John Smith',
    role: 'admin',
  },
  {
    id: '2',
    email: 'manager@curtainshop.com',
    password: 'manager123',
    name: 'Sarah Johnson',
    role: 'manager',
  },
  {
    id: '3',
    email: 'staff@curtainshop.com',
    password: 'staff123',
    name: 'Mike Wilson',
    role: 'staff',
  },
];
