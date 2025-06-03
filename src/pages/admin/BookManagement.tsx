import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockBooks, mockBranches } from '@/data/mockData';
import { Book } from '@/types';
import { Plus, Pencil, Trash2, Package, Upload } from 'lucide-react';

export const BookManagement: React.FC = () => {
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

  const categories = ['Academic', 'Admission', 'Model Test', 'Reference', 'Literature'];

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

  const getTotalStock = (book: Book) => {
    return Object.values(book.stock).reduce((sum, stock) => sum + stock, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Book Management</h1>
          <p className="text-muted-foreground">Manage your book catalog and inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
              <DialogDescription>
                Add a new book to your catalog with inventory levels by branch.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newBook.category} onValueChange={(value) => setNewBook({ ...newBook, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Or enter image URL:</div>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={newBook.coverImage}
                    onChange={(e) => setNewBook({ ...newBook, coverImage: e.target.value })}
                  />
                  {newBook.coverImage && (
                    <div className="flex justify-center">
                      <img
                        src={newBook.coverImage}
                        alt="Cover preview"
                        className="w-24 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Stock by Branch</Label>
                <div className="grid grid-cols-2 gap-4">
                  {mockBranches.map((branch) => (
                    <div key={branch.id} className="space-y-1">
                      <Label className="text-sm">{branch.name}</Label>
                      <Input
                        type="number"
                        value={newBook.stock[branch.id] || 0}
                        onChange={(e) => setNewBook({
                          ...newBook,
                          stock: { ...newBook.stock, [branch.id]: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBook}>Add Book</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Books Catalog</CardTitle>
          <CardDescription>
            Manage your book inventory and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => {
                const totalStock = getTotalStock(book);
                return (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.category}</Badge>
                    </TableCell>
                    <TableCell>${book.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span>{totalStock}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={totalStock > 0 ? 'default' : 'destructive'}>
                        {totalStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingBook(book);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update book information and inventory levels.
            </DialogDescription>
          </DialogHeader>
          {editingBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-isbn">ISBN</Label>
                  <Input
                    id="edit-isbn"
                    value={editingBook.isbn}
                    onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingBook.price}
                    onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select value={editingBook.category} onValueChange={(value) => setEditingBook({ ...editingBook, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingBook.description}
                  onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Or enter image URL:</div>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={editingBook.coverImage}
                    onChange={(e) => setEditingBook({ ...editingBook, coverImage: e.target.value })}
                  />
                  {editingBook.coverImage && (
                    <div className="flex justify-center">
                      <img
                        src={editingBook.coverImage}
                        alt="Cover preview"
                        className="w-24 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Stock by Branch</Label>
                <div className="grid grid-cols-2 gap-4">
                  {mockBranches.map((branch) => (
                    <div key={branch.id} className="space-y-1">
                      <Label className="text-sm">{branch.name}</Label>
                      <Input
                        type="number"
                        value={editingBook.stock[branch.id] || 0}
                        onChange={(e) => setEditingBook({
                          ...editingBook,
                          stock: { ...editingBook.stock, [branch.id]: parseInt(e.target.value) || 0 }
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBook}>Update Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
