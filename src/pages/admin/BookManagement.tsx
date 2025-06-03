
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { BookForm } from '@/components/admin/BookForm';
import { BookTable } from '@/components/admin/BookTable';
import { BookFilters } from '@/components/admin/BookFilters';
import { useBookManagement } from '@/hooks/useBookManagement';

export const BookManagement: React.FC = () => {
  const {
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
  } = useBookManagement();

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
            <BookForm
              book={newBook}
              onBookChange={setNewBook}
              onImageUpload={(e) => handleImageUpload(e, false)}
            />
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
          <BookFilters
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategoryFilter}
          />
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
          <BookTable
            books={filteredBooks}
            onEditBook={openEditDialog}
            onDeleteBook={handleDeleteBook}
          />
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
            <BookForm
              book={editingBook}
              onBookChange={setEditingBook}
              onImageUpload={(e) => handleImageUpload(e, true)}
              isEdit={true}
            />
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
