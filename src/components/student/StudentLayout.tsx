
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShoppingCart, Search, User } from 'lucide-react';

export const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              BookStore
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link to="/catalog" className="text-foreground hover:text-primary">
                Catalog
              </Link>
              <Link to="/search" className="text-foreground hover:text-primary">
                Search
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
