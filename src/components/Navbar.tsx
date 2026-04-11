import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen]   = useState(false);
  const { count } = useCart();

  const navItems = [
    { id: 'home',     label: 'Главная' },
    { id: 'catalog',  label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}

      <nav className="fixed top-0 left-0 right-0 z-40"
        style={{ background: 'rgba(10,10,10,0.93)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(139,0,0,0.25)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
              <span className="text-3xl font-gothic animate-flicker" style={{ color: '#c0392b', lineHeight: 1 }}>☩</span>
              <span className="font-gothic text-2xl" style={{ color: '#e8e0d0', letterSpacing: '0.12em' }}>DARKWARE</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => onNavigate(item.id)}
                  className="relative px-5 py-2 text-xs font-body font-medium uppercase transition-all duration-200"
                  style={{ color: currentPage === item.id ? '#c0392b' : 'rgba(235,235,235,0.5)', letterSpacing: '0.12em' }}>
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#c0392b' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden md:block">
                {searchOpen ? (
                  <div className="flex items-center gap-2 animate-scale-in">
                    <input autoFocus type="text" value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Поиск украшений..."
                      className="w-44 px-3 py-1.5 text-sm outline-none rounded"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,0,0,0.4)', color: '#ebebeb' }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { onNavigate('catalog'); setSearchOpen(false); }
                        if (e.key === 'Escape') setSearchOpen(false);
                      }} />
                    <button onClick={() => setSearchOpen(false)} style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <Icon name="X" size={15} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="p-2 transition-colors"
                    style={{ color: 'rgba(235,235,235,0.4)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.4)')}>
                    <Icon name="Search" size={17} />
                  </button>
                )}
              </div>

              {/* Cart button */}
              <button onClick={() => setCartOpen(true)}
                className="relative p-2 transition-colors"
                style={{ color: count > 0 ? '#c0392b' : 'rgba(235,235,235,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                onMouseLeave={e => (e.currentTarget.style.color = count > 0 ? '#c0392b' : 'rgba(235,235,235,0.4)')}>
                <Icon name="ShoppingBag" size={17} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-white flex items-center justify-center font-bold"
                    style={{ background: '#8b0000', fontSize: '9px' }}>
                    {count}
                  </span>
                )}
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"
                style={{ color: 'rgba(235,235,235,0.5)' }}>
                <Icon name={menuOpen ? 'X' : 'Menu'} size={19} />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 px-6 animate-fade-up"
            style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(139,0,0,0.2)' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-xs uppercase tracking-widest font-body font-medium transition-colors"
                style={{ color: currentPage === item.id ? '#c0392b' : 'rgba(235,235,235,0.5)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
