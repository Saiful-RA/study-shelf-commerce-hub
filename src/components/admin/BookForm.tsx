
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Book } from '@/types';
import { mockBranches } from '@/data/mockData';
import { Upload } from 'lucide-react';

interface BookFormProps {
  book: {
    title: string;
    author: string;
    isbn: string;
    price: string | number;
    description: string;
    category: string;
    coverImage: string;
    stock: Record<string, number>;
  };
  onBookChange: (book: any) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEdit?: boolean;
}

const categories = ['Academic', 'Admission', 'Model Test', 'Reference', 'Literature'];

export const BookForm: React.FC<BookFormProps> = ({ 
  book, 
  onBookChange, 
  onImageUpload, 
  isEdit = false 
}) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={book.title}
            onChange={(e) => onBookChange({ ...book, title: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={book.author}
            onChange={(e) => onBookChange({ ...book, author: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            value={book.isbn}
            onChange={(e) => onBookChange({ ...book, isbn: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={book.price}
            onChange={(e) => onBookChange({ 
              ...book, 
              price: isEdit ? parseFloat(e.target.value) : e.target.value 
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={book.category} 
            onValueChange={(value) => onBookChange({ ...book, category: value })}
          >
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
          value={book.description}
          onChange={(e) => onBookChange({ ...book, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
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
            value={book.coverImage}
            onChange={(e) => onBookChange({ ...book, coverImage: e.target.value })}
          />
          {book.coverImage && (
            <div className="flex justify-center">
              <img
                src={book.coverImage}
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
                value={book.stock[branch.id] || 0}
                onChange={(e) => onBookChange({
                  ...book,
                  stock: { ...book.stock, [branch.id]: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
