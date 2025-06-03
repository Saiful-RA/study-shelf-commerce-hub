
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book } from '@/types';
import { Pencil, Trash2, Package } from 'lucide-react';

interface BookTableProps {
  books: Book[];
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

export const BookTable: React.FC<BookTableProps> = ({ books, onEditBook, onDeleteBook }) => {
  const getTotalStock = (book: Book) => {
    return Object.values(book.stock).reduce((sum, stock) => sum + stock, 0);
  };

  return (
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
        {books.map((book) => {
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
                    onClick={() => onEditBook(book)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteBook(book.id)}
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
  );
};
