
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { mockBooks } from '@/data/mockData';

export const Homepage: React.FC = () => {
  const featuredBooks = mockBooks.filter(book => book.featured);
  const categories = ['Academic', 'Admission', 'Model Test'];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Educational <span className="text-primary">Book Store</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find the best educational books for your academic journey. From textbooks to test preparations.
        </p>
        <Link to="/catalog">
          <Button size="lg" className="px-8 py-3">
            Browse Books
          </Button>
        </Link>
      </section>

      {/* Featured Books */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Books</h2>
          <Link to="/catalog">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2">Featured</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">${book.price}</span>
                  <Link to={`/book/${book.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Book Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category} className="text-center p-8 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="text-muted-foreground">
                  Explore our collection of {category.toLowerCase()} books
                </p>
                <Link to={`/catalog?category=${category}`}>
                  <Button variant="outline">Browse {category}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
