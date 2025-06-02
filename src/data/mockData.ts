
import { Book, Branch, Order, Student } from '@/types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Advanced Mathematics for Class XII',
    author: 'Dr. Smith Johnson',
    isbn: '978-0123456789',
    price: 450,
    description: 'Comprehensive mathematics textbook for senior secondary students',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop',
    category: 'Academic',
    class: 'XII',
    stock: { 'main': 50, 'branch1': 25, 'branch2': 30 },
    featured: true
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    author: 'Prof. Alice Wilson',
    isbn: '978-0123456790',
    price: 520,
    description: 'Essential physics concepts and problem-solving techniques',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
    category: 'Academic',
    class: 'XI',
    stock: { 'main': 40, 'branch1': 20, 'branch2': 15 },
    featured: true
  },
  {
    id: '3',
    title: 'Medical Entrance Guide 2024',
    author: 'Dr. Medical Expert',
    isbn: '978-0123456791',
    price: 750,
    description: 'Complete preparation guide for medical entrance examinations',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop',
    category: 'Admission',
    stock: { 'main': 35, 'branch1': 15, 'branch2': 20 },
    featured: false
  },
  {
    id: '4',
    title: 'Model Test Papers - Science',
    author: 'Test Series Team',
    isbn: '978-0123456792',
    price: 320,
    description: 'Practice test papers for science stream students',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop',
    category: 'Model Test',
    class: 'X',
    stock: { 'main': 60, 'branch1': 30, 'branch2': 25 }
  }
];

export const mockBranches: Branch[] = [
  {
    id: 'main',
    name: 'Main Inventory',
    location: 'Central Warehouse, City Center',
    contact: '+1234567890'
  },
  {
    id: 'branch1',
    name: 'North Branch',
    location: '123 North Street, North District',
    contact: '+1234567891'
  },
  {
    id: 'branch2',
    name: 'South Branch',
    location: '456 South Avenue, South District',
    contact: '+1234567892'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    studentId: 'STU001',
    books: [{ bookId: '1', quantity: 2, price: 450 }],
    total: 900,
    deliveryMethod: 'delivery',
    address: '123 Student Street, City',
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD002',
    studentId: 'STU002',
    books: [{ bookId: '2', quantity: 1, price: 520 }],
    total: 520,
    deliveryMethod: 'pickup',
    branchId: 'branch1',
    status: 'ready',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    createdAt: '2024-01-14T14:20:00Z'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  },
  {
    id: 'STU002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891'
  }
];
