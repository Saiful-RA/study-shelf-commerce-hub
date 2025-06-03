
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockBooks } from '@/data/mockData';
import { Search as SearchIcon, ShoppingCart } from 'lucide-react';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState(mockBooks);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    
    if (query) {
      const filtered = mockBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockBooks);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchTerm ? { q: searchTerm } : {});
  };

  const addToCart = (bookId: string) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find((item: any) => item.bookId === bookId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ bookId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Search Books</h1>
        
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for books, authors, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="space-y-4">
        {searchParams.get('q') && (
          <p className="text-muted-foreground">
            {results.length > 0 
              ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${searchParams.get('q')}"`
              : `No results found for "${searchParams.get('q')}"`
            }
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {book.featured && (
                  <Badge className="absolute top-2 right-2">Featured</Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-sm">{book.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">{book.category}</Badge>
                  {book.class && (
                    <Badge variant="outline" className="text-xs">Class {book.class}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">${book.price}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/book/${book.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    onClick={() => addToCart(book.id)}
                    className="px-3"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {results.length === 0 && searchParams.get('q') && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Try searching with different keywords.</p>
            <Link to="/catalog">
              <Button variant="outline" className="mt-4">Browse All Books</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
