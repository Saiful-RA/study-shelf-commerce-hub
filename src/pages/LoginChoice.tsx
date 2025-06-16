
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, User, Shield } from 'lucide-react';

export const LoginChoice: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">EduBooks</span>
        </Link>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">Choose Login Type</CardTitle>
          <CardDescription>
            Select your account type to continue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button asChild className="w-full h-16 text-lg" variant="outline">
            <Link to="/student/login" className="flex flex-col items-center space-y-2">
              <User className="h-8 w-8" />
              <span>Student Login</span>
            </Link>
          </Button>

          <Button asChild className="w-full h-16 text-lg" variant="outline">
            <Link to="/admin/login" className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8" />
              <span>Admin Login</span>
            </Link>
          </Button>

          <div className="text-center text-sm mt-6">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
