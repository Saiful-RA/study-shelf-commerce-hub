
import { useState } from 'react';
import { Book } from '@/types';
import { mockBooks, mockBranches } from '@/data/mockData';

export const useBookManagement = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    description: '',
    category: '',
    coverImage: '',
    stock: Object.fromEntries(mockBranches.map(branch => [branch.id, 0]))
  });

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isEdit && editingBook) {
          setEditingBook({ ...editingBook, coverImage: imageUrl });
        } else {
          setNewBook({ ...newBook, coverImage: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBook = () => {
    const book: Book = {
      id: (books.length + 1).toString(),
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      price: parseFloat(newBook.price),
      description: newBook.description,
      category: newBook.category,
      coverImage: newBook.coverImage || '/placeholder.svg',
      stock: newBook.stock
    };
    
    setBooks([...books, book]);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      price: '',
      description: '',
      category: '',
      coverImage: '',
      stock: Object.fromEntries(mockBranches.map(branch => [branch.id, 0]))
    });
    setIsAddDialogOpen(false);
  };

  const handleEditBook = () => {
    if (!editingBook) return;
    
    setBooks(books.map(book => 
      book.id === editingBook.id ? editingBook : book
    ));
    setIsEditDialogOpen(false);
    setEditingBook(null);
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setIsEditDialogOpen(true);
  };

  return {
    books,
    filteredBooks,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    editingBook,
    setEditingBook,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    newBook,
    setNewBook,
    handleImageUpload,
    handleAddBook,
    handleEditBook,
    handleDeleteBook,
    openEditDialog
  };
};
