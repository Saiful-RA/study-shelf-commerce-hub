
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const categories = ['Academic', 'Admission', 'Model Test', 'Reference', 'Literature'];

export const BookFilters: React.FC<BookFiltersProps> = ({
  searchTerm,
  categoryFilter,
  onSearchChange,
  onCategoryChange
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Input
          placeholder="Search books by title or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={categoryFilter} onValueChange={onCategoryChange}>
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
  );
};
