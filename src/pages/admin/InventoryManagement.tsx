
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockBooks, mockBranches } from '@/data/mockData';
import { Book, Branch } from '@/types';
import { Package, Edit, Building } from 'lucide-react';

export const InventoryManagement: React.FC = () => {
  const [books] = useState<Book[]>(mockBooks);
  const [branches] = useState<Branch[]>(mockBranches);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isUpdateStockOpen, setIsUpdateStockOpen] = useState(false);
  const [stockUpdates, setStockUpdates] = useState<{ [branchId: string]: number }>({});

  const getTotalStock = (book: Book) => {
    return Object.values(book.stock).reduce((sum, stock) => sum + stock, 0);
  };

  const getLowStockBooks = () => {
    return books.filter(book => getTotalStock(book) < 10);
  };

  const handleUpdateStock = (book: Book) => {
    setSelectedBook(book);
    setStockUpdates(book.stock);
    setIsUpdateStockOpen(true);
  };

  const handleStockChange = (branchId: string, value: string) => {
    setStockUpdates(prev => ({
      ...prev,
      [branchId]: parseInt(value) || 0
    }));
  };

  const handleSaveStockUpdates = () => {
    console.log('Stock updates saved for book:', selectedBook?.title, stockUpdates);
    // Here you would typically update the book stock in your state management
    setIsUpdateStockOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">Monitor and manage stock levels across all branches</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Package className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{getLowStockBooks().length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branches.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels by Branch</CardTitle>
          <CardDescription>
            View and update inventory levels for each book across all branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>ISBN</TableHead>
                {branches.map((branch) => (
                  <TableHead key={branch.id}>{branch.name}</TableHead>
                ))}
                <TableHead>Total Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => {
                const totalStock = getTotalStock(book);
                return (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-10 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{book.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                    {branches.map((branch) => (
                      <TableCell key={branch.id}>
                        <Badge variant={book.stock[branch.id] > 0 ? 'default' : 'destructive'}>
                          {book.stock[branch.id] || 0}
                        </Badge>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span className="font-medium">{totalStock}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={totalStock > 10 ? 'default' : totalStock > 0 ? 'secondary' : 'destructive'}>
                        {totalStock > 10 ? 'In Stock' : totalStock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStock(book)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Update Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Stock Dialog */}
      <Dialog open={isUpdateStockOpen} onOpenChange={setIsUpdateStockOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Stock Levels</DialogTitle>
            <DialogDescription>
              Update inventory levels for "{selectedBook?.title}" across all branches
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {branches.map((branch) => (
              <div key={branch.id} className="space-y-2">
                <Label htmlFor={`stock-${branch.id}`}>{branch.name}</Label>
                <Input
                  id={`stock-${branch.id}`}
                  type="number"
                  min="0"
                  value={stockUpdates[branch.id] || 0}
                  onChange={(e) => handleStockChange(branch.id, e.target.value)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStockOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStockUpdates}>
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
