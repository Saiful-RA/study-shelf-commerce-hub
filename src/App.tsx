
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { StudentLayout } from "@/components/student/StudentLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Homepage } from "@/pages/student/Homepage";
import { BookCatalog } from "@/pages/student/BookCatalog";
import { Search } from "@/pages/student/Search";
import { ShoppingCart } from "@/pages/student/ShoppingCart";
import { StudentLogin } from "@/pages/student/StudentLogin";
import { StudentRegistration } from "@/pages/student/StudentRegistration";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { BookManagement } from "@/pages/admin/BookManagement";
import { InventoryManagement } from "@/pages/admin/InventoryManagement";
import { OrderManagement } from "@/pages/admin/OrderManagement";
import { BranchManagement } from "@/pages/admin/BranchManagement";
import { StudentLogs } from "@/pages/admin/StudentLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Student Routes */}
            <Route path="/" element={<StudentLayout />}>
              <Route index element={<Homepage />} />
              <Route path="catalog" element={<BookCatalog />} />
              <Route path="book/:id" element={<div>Book Details (Coming Soon)</div>} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="checkout" element={<div>Checkout (Coming Soon)</div>} />
              <Route path="search" element={<Search />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/register" element={<StudentRegistration />} />
            <Route path="/forgot-password" element={<div>Forgot Password (Coming Soon)</div>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="books" element={<BookManagement />} />
              <Route path="inventory" element={<InventoryManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="branches" element={<BranchManagement />} />
              <Route path="students" element={<StudentLogs />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
