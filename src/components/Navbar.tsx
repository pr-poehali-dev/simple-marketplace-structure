import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(7,7,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
              <span className="relative z-10 text-white font-display font-bold text-sm">М</span>
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight">
              МАРКЕТ
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  color: currentPage === item.id ? '#f72585' : 'rgba(255,255,255,0.7)'
                }}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #f72585, #4361ee)' }} />
                )}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-scale-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск товаров..."
                    autoFocus
                    className="w-48 px-3 py-1.5 text-sm text-white placeholder-white/40 rounded-full outline-none"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        onNavigate('catalog');
                        setSearchOpen(false);
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white transition-colors">
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full transition-all duration-200 text-white/60 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <Icon name="Search" size={18} />
                </button>
              )}
            </div>

            {/* Cart */}
            <button className="relative p-2 rounded-full transition-all duration-200 text-white/60 hover:text-white"
              style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Icon name="ShoppingBag" size={18} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                style={{ background: '#f72585', fontSize: '10px' }}>3</span>
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-4 px-4 border-t animate-fade-up"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(7,7,15,0.98)' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 text-sm font-medium rounded-xl mb-1 transition-all"
              style={{
                color: currentPage === item.id ? '#f72585' : 'rgba(255,255,255,0.7)',
                background: currentPage === item.id ? 'rgba(247,37,133,0.1)' : 'transparent'
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-3 px-4">
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full px-4 py-2.5 text-sm text-white placeholder-white/40 rounded-xl outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
