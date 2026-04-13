import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':     return <HomePage onNavigate={setCurrentPage} />;
      case 'catalog':  return <CatalogPage />;
      case 'contacts': return <ContactsPage />;
      case 'profile':  return <ProfilePage onNavigate={setCurrentPage} />;
      default:         return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
            <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
            {renderPage()}
          </div>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}