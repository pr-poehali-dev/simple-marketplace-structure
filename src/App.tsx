import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'catalog': return <CatalogPage />;
      case 'contacts': return <ContactsPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div style={{ minHeight: '100vh', background: '#07070f' }}>
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        {renderPage()}
      </div>
    </TooltipProvider>
  );
}
