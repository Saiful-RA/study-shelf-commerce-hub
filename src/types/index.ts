
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  description: string;
  coverImage: string;
  category: string;
  class?: string;
  stock: { [branchId: string]: number };
  featured?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export interface Order {
  id: string;
  studentId: string;
  books: { bookId: string; quantity: number; price: number }[];
  total: number;
  deliveryMethod: 'delivery' | 'pickup';
  branchId?: string;
  address?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'ready' | 'completed';
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'paid';
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
}
